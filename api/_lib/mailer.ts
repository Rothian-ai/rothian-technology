import nodemailer, { type Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

/**
 * Microsoft 365 SMTP transport.
 *
 * Two auth paths, picked from the environment:
 *
 * - **OAuth2 client credentials** (preferred). Microsoft has retired Basic
 *   authentication for Client Submission in Exchange Online, so a modern M365
 *   tenant needs an Entra app with the `SMTP.SendAsApp` application permission.
 *   Set SMTP_TENANT_ID / SMTP_CLIENT_ID / SMTP_CLIENT_SECRET.
 * - **Basic auth**, for tenants that still have SMTP AUTH enabled with an app
 *   password. Set SMTP_USER / SMTP_PASS.
 *
 * Either way the `From:` address must be a mailbox on rothian.com that the
 * authenticated principal is allowed to send as — the domain publishes
 * `DMARC p=quarantine`, so an unaligned `From:` gets quarantined rather than
 * bounced, which is the worst kind of failure to debug.
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
export function usesOAuth(): boolean {
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
export async function getTransporter(): Promise<Transporter<SMTPTransport.SentMessageInfo>> {
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
export function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
