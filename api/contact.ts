import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer, { type Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

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

/* ══════════════════════════════════════════════════════════════════════════
   SMTP transport — deliberately inlined, do not extract to a separate file
   ──────────────────────────────────────────────────────────────────────────
   This lived in api/_lib/mailer.ts and broke production: Vercel does not
   deploy `_`-prefixed files under api/ as routes, and @vercel/node v12 runs
   these as ESM without bundling, so the module was simply absent at runtime.
   Every relative specifier — bare, .js and .ts — failed with
   ERR_MODULE_NOT_FOUND, and because the failure happens at module load the
   handler could not report it: /api/contact returned
   FUNCTION_INVOCATION_FAILED for every request instead.

   Keeping the function a single file with no relative imports makes it
   independent of how the platform chooses to build it.
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * SMTP transport. Host, port and credentials all come from the environment, so
 * the provider is a matter of configuration rather than code.
 *
 * Two auth paths, picked from the environment:
 *
 * - **Username and password**. This covers Resend (username is the literal
 *   `resend`, password is an API key) and any other ordinary SMTP provider.
 *   Set SMTP_USER / SMTP_PASS.
 * - **OAuth2 client credentials**, for Microsoft 365. Microsoft has retired
 *   Basic authentication for Client Submission in Exchange Online, so a modern
 *   M365 tenant needs an Entra app with the `SMTP.SendAsApp` application
 *   permission. Set SMTP_TENANT_ID / SMTP_CLIENT_ID / SMTP_CLIENT_SECRET.
 *
 * Note the precedence: OAuth2 wins whenever all three Entra values are present,
 * and SMTP_USER / SMTP_PASS are then ignored. Leave them unset for any other
 * provider.
 *
 * Whichever is used, the `From:` domain must be verified with that provider and
 * must align for DMARC — rothian.com publishes `p=quarantine`, so an unaligned
 * `From:` gets quarantined rather than bounced, which is the worst kind of
 * failure to debug.
 */

const TOKEN_SCOPE = 'https://outlook.office365.com/.default'

/** Refresh a little early so a token never expires mid-send. */
const TOKEN_SKEW_MS = 60_000

interface CachedToken {
  value: string
  expiresAt: number
}

let cachedToken: CachedToken | null = null
let cachedTransport: { key: string; transporter: Transporter<SMTPTransport.SentMessageInfo> } | null =
  null

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

/** True when the tenant is configured for the OAuth2 client-credentials flow. */
function usesOAuth(): boolean {
  return Boolean(process.env.SMTP_TENANT_ID && process.env.SMTP_CLIENT_ID && process.env.SMTP_CLIENT_SECRET)
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + TOKEN_SKEW_MS) {
    return cachedToken.value
  }

  const tenant = required('SMTP_TENANT_ID')
  const body = new URLSearchParams({
    client_id: required('SMTP_CLIENT_ID'),
    client_secret: required('SMTP_CLIENT_SECRET'),
    scope: TOKEN_SCOPE,
    grant_type: 'client_credentials',
  })

  const res = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!res.ok) {
    // Entra returns the useful detail in the body; keep it server-side only.
    throw new Error(`Entra token request failed (${res.status}): ${await res.text()}`)
  }

  const json = (await res.json()) as { access_token?: string; expires_in?: number }
  if (!json.access_token) throw new Error('Entra token response contained no access_token')

  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  }
  return cachedToken.value
}

/**
 * Build (or reuse) the SMTP transport. Creating a transporter does not open a
 * connection, but reusing it across warm invocations keeps DNS and TLS session
 * state around, so we cache it against whatever credential it was built with.
 */
async function getTransporter(): Promise<Transporter<SMTPTransport.SentMessageInfo>> {
  const host = process.env.SMTP_HOST ?? 'smtp.office365.com'
  const port = Number(process.env.SMTP_PORT ?? 587)

  // 587 is STARTTLS: connect in the clear, then upgrade. Only 465 is implicit TLS.
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465

  // Office 365 mandates STARTTLS on 587. Overridable so a local mail catcher
  // (Mailpit and friends, plain SMTP on 1025) can be used in development.
  const requireTLS = process.env.SMTP_REQUIRE_TLS
    ? process.env.SMTP_REQUIRE_TLS === 'true'
    : !secure

  const user = usesOAuth() ? required('SMTP_FROM') : required('SMTP_USER')
  const auth: SMTPTransport.Options['auth'] = usesOAuth()
    ? { type: 'OAuth2', user, accessToken: await getAccessToken() }
    : { user, pass: required('SMTP_PASS') }

  // The access token is part of the key so a refreshed token rebuilds the transport.
  const key = `${host}:${port}:${secure}:${requireTLS}:${user}:${'accessToken' in auth ? auth.accessToken : 'basic'}`
  if (cachedTransport?.key === key) return cachedTransport.transporter

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
    requireTLS,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  cachedTransport = { key, transporter }
  return transporter
}

/**
 * Strip CR/LF before any value reaches a header. Without this, a display name
 * or subject taken from the form could inject extra headers (an extra `Bcc:`,
 * a second body) into the outgoing message.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
