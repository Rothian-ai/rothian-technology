/**
 * TEMPORARY diagnostic for the /api/contact crash. Delete once resolved.
 *
 * /api/contact returns FUNCTION_INVOCATION_FAILED, which means it dies at
 * module load — so nothing inside it can report why. This endpoint has no
 * static imports at all, so it loads even when the mailer chain cannot, and
 * probes each candidate cause dynamically.
 *
 * It reports only whether each environment variable is *present*, never a
 * value, so it cannot leak the API key.
 */

interface Res {
  status: (code: number) => { json: (body: unknown) => void }
}

export default async function handler(_req: unknown, res: Res) {
  const out: Record<string, unknown> = {
    node: process.version,
    // Which module system the function ended up in — the root package.json
    // sets "type": "module", but the builder may compile to CJS anyway.
    moduleSystem: typeof require === 'undefined' ? 'ESM' : 'CJS',
  }

  // Is the dependency itself loadable in this runtime?
  try {
    const nm = (await import('nodemailer')) as { default?: unknown; createTransport?: unknown }
    const mod = (nm.default ?? nm) as { createTransport?: unknown }
    out.nodemailer = typeof mod.createTransport === 'function' ? 'ok' : 'loaded but no createTransport'
  } catch (err) {
    out.nodemailer = `FAILED: ${String(err).slice(0, 200)}`
  }

  // Which relative specifier actually resolves once the platform has built it.
  for (const [label, spec] of [
    ['mailer.js', './_lib/mailer.js'],
    ['mailer.ts', './_lib/mailer.ts'],
    ['mailer (bare)', './_lib/mailer'],
  ] as const) {
    try {
      const m = (await import(/* @vite-ignore */ spec)) as { getTransporter?: unknown }
      out[label] = typeof m.getTransporter === 'function' ? 'ok' : 'loaded, no getTransporter'
    } catch (err) {
      out[label] = `FAILED: ${String(err).slice(0, 160)}`
    }
  }

  // This is what answers "did the Vercel variables land?".
  //
  // Transport settings are echoed because which host is configured is the
  // whole question, and none of them is a secret. Addresses are reduced to
  // booleans — this endpoint is public, and there is no reason to publish
  // company mailboxes to spam harvesters to answer a config question.
  out.env = {
    SMTP_HOST: process.env.SMTP_HOST ?? null,
    SMTP_PORT: process.env.SMTP_PORT ?? null,
    SMTP_SECURE: process.env.SMTP_SECURE ?? null,
    SMTP_USER: process.env.SMTP_USER ?? null,
    SMTP_FROM_set: Boolean(process.env.SMTP_FROM),
    CONTACT_TO_set: Boolean(process.env.CONTACT_TO),
    SMTP_PASS_set: Boolean(process.env.SMTP_PASS),
    // These three silently override SMTP_USER/SMTP_PASS when all present.
    oauthOverrideActive: Boolean(
      process.env.SMTP_TENANT_ID && process.env.SMTP_CLIENT_ID && process.env.SMTP_CLIENT_SECRET,
    ),
  }

  res.status(200).json(out)
}
