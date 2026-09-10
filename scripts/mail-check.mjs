/**
 * Check the contact-form mail transport without deploying.
 *
 *   node --env-file=.env.local scripts/mail-check.mjs
 *   node --env-file=.env.local scripts/mail-check.mjs --send you@example.com
 *
 * Without --send it only opens the connection and authenticates, which is
 * enough to tell a wrong API key from a wrong host or a blocked port. With
 * --send it delivers a real message, which is the only way to prove the
 * From: domain is verified and DMARC-aligned — authentication succeeding says
 * nothing about whether the mail will actually be accepted.
 */
import nodemailer from 'nodemailer'

const args = process.argv.slice(2)
const sendIndex = args.indexOf('--send')
const recipient = sendIndex === -1 ? null : args[sendIndex + 1]

if (sendIndex !== -1 && !recipient) {
  console.error('--send needs an address: --send you@example.com')
  process.exit(1)
}

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_FROM_NAME,
  SMTP_TENANT_ID,
  SMTP_CLIENT_ID,
  SMTP_CLIENT_SECRET,
} = process.env

const usesOAuth = Boolean(SMTP_TENANT_ID && SMTP_CLIENT_ID && SMTP_CLIENT_SECRET)

if (usesOAuth) {
  console.error(
    'SMTP_TENANT_ID / SMTP_CLIENT_ID / SMTP_CLIENT_SECRET are set, so the app would\n' +
      'use the Microsoft 365 OAuth2 path and ignore SMTP_USER / SMTP_PASS entirely.\n' +
      'Clear those three to test a username/password provider such as Resend.',
  )
  process.exit(1)
}

const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM })
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missing.length) {
  console.error(`Missing: ${missing.join(', ')}`)
  process.exit(1)
}

const port = Number(SMTP_PORT ?? 587)
const secure = SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465

console.log(`host    ${SMTP_HOST}:${port} (${secure ? 'implicit TLS' : 'STARTTLS'})`)
console.log(`user    ${SMTP_USER}`)
console.log(`from    ${SMTP_FROM}`)

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  requireTLS: !secure,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
})

try {
  await transporter.verify()
  console.log('\n✓ connected and authenticated')
} catch (err) {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
}

if (!recipient) {
  console.log('\nRe-run with --send you@example.com to deliver a real test message.')
  process.exit(0)
}

try {
  const info = await transporter.sendMail({
    from: { name: SMTP_FROM_NAME ?? 'Rothian', address: SMTP_FROM },
    to: recipient,
    subject: 'Rothian contact form — transport test',
    text: 'If you are reading this, the contact form transport is working.',
  })
  console.log(`✓ sent to ${recipient} (id ${info.messageId})`)
  console.log('\nCheck spam as well as the inbox — quarantine is what a DMARC')
  console.log('misalignment looks like, and it is not reported as an error here.')
} catch (err) {
  console.error(`✗ send failed: ${err.message}`)
  process.exit(1)
}
