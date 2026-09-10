import type { VercelRequest, VercelResponse } from '@vercel/node'
import { escapeHtml, getTransporter, headerSafe } from './_lib/mailer.ts'

/**
 * Enquiries from every /contact form on rothian.com — the main Technology
 * site and the /digital, /cyber and /data sections all post here.
 *
 * The visitor's address goes in `Reply-To`, never in `From`: rothian.com
 * publishes `DMARC p=quarantine` with an SPF record that only authorises
 * Microsoft 365 and PromoRepublic, so a `From:` of `visitor@gmail.com` sent
 * through our own SMTP would fail alignment and land in quarantine.
 */

/**
 * Which part of the group the enquiry came from. The client sends this, so it
 * is validated against the map rather than trusted — an unknown or absent
 * value falls back to Technology.
 *
 * `CONTACT_TO_<BRAND>` routes a brand's enquiries to its own mailbox; without
 * it everything lands in the shared CONTACT_TO, so adding a brand inbox later
 * is config, not code.
 */
const BRANDS = {
  technology: { label: 'Rothian', envKey: 'CONTACT_TO_TECHNOLOGY' },
  digital: { label: 'Rothian Digital', envKey: 'CONTACT_TO_DIGITAL' },
  cyber: { label: 'Rothian Cyber', envKey: 'CONTACT_TO_CYBER' },
  data: { label: 'Rothian Data', envKey: 'CONTACT_TO_DATA' },
} as const

type BrandKey = keyof typeof BRANDS

function resolveBrand(value: unknown): BrandKey {
  return typeof value === 'string' && value in BRANDS ? (value as BrandKey) : 'technology'
}

/** Field caps — generous for a human, ungenerous for a spam script. */
const LIMITS = { name: 120, company: 160, email: 254, when: 60, message: 5000 } as const

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 3

/**
 * Best-effort throttle. Serverless instances do not share memory, so this
 * blunts a single noisy client rather than a distributed flood — put Cloudflare
 * rate limiting in front of /api/contact for anything stronger.
 */
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Keep the map from growing unbounded on a long-lived warm instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return recent.length > MAX_PER_WINDOW
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return raw?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/** Deliberately permissive — the real check is whether the reply bounces. */
function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {}

  // Honeypot: hidden from real users, irresistible to naive bots. Answer 200 so
  // the bot records a success and moves on.
  if (str(body.website, 200)) return res.status(200).json({ ok: true })

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' })
  }

  const name = str(body.name, LIMITS.name)
  const company = str(body.company, LIMITS.company)
  const email = str(body.email, LIMITS.email)
  const when = str(body.when, LIMITS.when)
  const message = str(body.message, LIMITS.message)

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please tell us your name.'
  if (!email) errors.email = 'Please give us an email address.'
  else if (!validEmail(email)) errors.email = 'That email address does not look right.'
  if (!message) errors.message = 'Let us know what you want to talk about.'

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please check the form.', fields: errors })
  }

  const brand = resolveBrand(body.brand)
  const { label: brandLabel, envKey } = BRANDS[brand]

  const from = process.env.SMTP_FROM
  const to = process.env[envKey] ?? process.env.CONTACT_TO ?? from
  if (!from || !to) {
    console.error('Mail is not configured: SMTP_FROM (and optionally CONTACT_TO) must be set.')
    return res.status(500).json({ error: 'Sorry — we could not send that. Please email us directly.' })
  }

  const fromName = process.env.SMTP_FROM_NAME ?? brandLabel
  const rows: [string, string][] = [
    ['Name', name],
    ['Company', company || '—'],
    ['Email', email],
    ['Best time to talk', when || '—'],
    ['Enquiry for', brandLabel],
  ]

  try {
    const transporter = await getTransporter()

    await transporter.sendMail({
      from: { name: headerSafe(fromName), address: from },
      to,
      ...(process.env.CONTACT_BCC ? { bcc: process.env.CONTACT_BCC } : {}),
      replyTo: { name: headerSafe(name), address: email },
      subject: headerSafe(
        `[${brandLabel}] Discovery call request — ${name}${company ? ` (${company})` : ''}`,
      ),
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        '',
        'What they want to talk about:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#111;line-height:1.6">
          <h2 style="margin:0 0 16px">Discovery call request — ${escapeHtml(brandLabel)}</h2>
          <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
              )
              .join('')}
          </table>
          <p style="margin:0 0 6px;color:#666">What they want to talk about</p>
          <div style="white-space:pre-wrap;border-left:3px solid #f26722;padding-left:14px">${escapeHtml(message)}</div>
        </div>
      `,
    })

    // Acknowledgement to the enquirer. Opt-in: an auto-reply that fails is
    // worse than no auto-reply, and the enquiry itself is already delivered.
    if (process.env.CONTACT_AUTOREPLY === 'true') {
      try {
        await transporter.sendMail({
          from: { name: headerSafe(fromName), address: from },
          to: { name: headerSafe(name), address: email },
          subject: `We have got your request — ${brandLabel}`,
          text: `Hi ${name},\n\nThanks for getting in touch. We will confirm a time that suits you — usually within the same working day.\n\nWhat you sent us:\n${message}\n\n— ${brandLabel}`,
        })
      } catch (err) {
        console.error('Auto-reply failed (enquiry was delivered):', err)
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    // SMTP errors can carry credentials and internal hostnames — log, never return.
    console.error('Contact form send failed:', err)
    return res.status(502).json({ error: 'Sorry — we could not send that. Please email us directly.' })
  }
}

function safeParse(value: string): Record<string, unknown> | null {
  try {
    return JSON.parse(value) as Record<string, unknown>
  } catch {
    return null
  }
}
