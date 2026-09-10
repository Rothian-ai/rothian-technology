import { CheckCircle2, Mail, MessageCircle, Phone, ShieldAlert } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SOCIAL_ICON_MAP } from '../components/ui/SocialIcons'
import { CONTACT, SOCIALS } from '../lib/nav'
import { usePageMeta } from '../lib/seo'

const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const
type Urgency = (typeof URGENCY_LEVELS)[number]

type Status = 'idle' | 'sending' | 'sent'

/** Shape returned by /api/contact. `fields` maps a field name to its error. */
interface ContactResponse {
  ok?: boolean
  error?: string
  fields?: Record<string, string>
}

export default function Contact() {
  usePageMeta(
    'Contact Us | Rothian Cyber — Your Partner in Cybersecurity Excellence',
    'Get in touch for expert cybersecurity solutions. Rapid response available for active incidents.',
  )

  const [params] = useSearchParams()
  const initialUrgency = ((): Urgency => {
    const u = params.get('urgency')?.toLowerCase()
    const match = URGENCY_LEVELS.find((l) => l.toLowerCase() === u)
    return match ?? 'Medium'
  })()

  const [urgency, setUrgency] = useState<Urgency>(initialUrgency)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const submitted = status === 'sent'
  const sending = status === 'sending'

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    // Read the form before awaiting — currentTarget is null once the handler
    // yields.
    const form = Object.fromEntries(new FormData(e.currentTarget))

    setStatus('sending')
    setError(null)
    setFieldErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // This form asks for a split name and calls the body "description";
          // the shared endpoint expects `name` and `message`.
          name: [form.firstName, form.lastName].filter(Boolean).join(' '),
          message: form.description,
          brand: 'cyber',
        }),
      })
      const body = (await res.json().catch(() => ({}))) as ContactResponse

      // Require the explicit ok flag: if /api/contact were ever swallowed by
      // the SPA rewrite we would get a 200 full of HTML, and showing "sent"
      // for an enquiry that was never delivered is the worst failure here.
      if (!res.ok || body.ok !== true) {
        setFieldErrors(body.fields ?? {})
        setError(body.error ?? 'Something went wrong. Please try again.')
        setStatus('idle')
        return
      }

      setStatus('sent')
    } catch {
      setError(`We could not reach the server. Please try again, or email us at ${CONTACT.email}.`)
      setStatus('idle')
    }
  }

  const inputClasses =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/35 backdrop-blur-sm transition-colors focus:border-brand-violet focus:outline-none'

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Your partner in cybersecurity excellence"
        highlight={['excellence']}
        description="Reach out to our team and we'll get back to you shortly. Friendly when you reach out — hardened when it matters."
        compact
      />

      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Contact rail */}
          <div>
            <Reveal className="rounded-3xl border border-brand-alert/25 bg-brand-alert/[0.07] p-7">
              <p className="flex items-center gap-2 font-display font-bold text-brand-alert">
                <ShieldAlert className="size-5" aria-hidden />
                Under attack right now?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Don't panic. Set the urgency to <strong className="text-white">Critical</strong>{' '}
                and submit — or call us directly. Our rapid-response team is on standby.
              </p>
              <a
                href={CONTACT.phoneHref}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-alert px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.04]"
              >
                <Phone className="size-4" aria-hidden />
                {CONTACT.phone}
              </a>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-col gap-5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 text-white/80 transition-colors hover:text-brand-cyan"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan">
                  <Mail className="size-5" aria-hidden />
                </span>
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-white/80 transition-colors hover:text-brand-cyan"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan">
                  <MessageCircle className="size-5" aria-hidden />
                </span>
                Chat on WhatsApp
              </a>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <p className="eyebrow mb-4 text-white/40">Follow Us</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ label, href }) => {
                  const Icon = SOCIAL_ICON_MAP[label as keyof typeof SOCIAL_ICON_MAP]
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-transparent hover:bg-brand-gradient hover:text-white"
                    >
                      <Icon className="size-4.5" aria-hidden />
                    </a>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            {submitted ? (
              <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-brand-gradient text-white">
                  <CheckCircle2 className="size-8" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-white">
                  Message received
                </h2>
                <p className="mt-3 max-w-md text-white/60">
                  {urgency === 'Critical'
                    ? 'Our rapid-response team has been alerted and will contact you as a priority.'
                    : "Thanks for reaching out — we'll get back to you shortly."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-white/70">
                      First name *
                    </label>
                    <input id="first-name" name="firstName" required autoComplete="given-name" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-white/70">
                      Last name *
                    </label>
                    <input id="last-name" name="lastName" required autoComplete="family-name" className={inputClasses} />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className={inputClasses}
                  />
                  {fieldErrors.email && (
                    <p className="mt-2 text-sm text-brand-alert">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white/70">
                    Subject
                  </label>
                  <input id="subject" name="subject" className={inputClasses} placeholder="e.g. Security assessment for our SaaS platform" />
                </div>

                <div className="mt-5">
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/70">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    className={`${inputClasses} resize-y`}
                    placeholder="Tell us about your environment, your concerns, or the incident you're facing…"
                    aria-invalid={Boolean(fieldErrors.message)}
                  />
                  {fieldErrors.message && (
                    <p className="mt-2 text-sm text-brand-alert">{fieldErrors.message}</p>
                  )}
                </div>

                <fieldset className="mt-6">
                  <legend className="mb-3 block text-sm font-medium text-white/70">
                    Urgency level
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {URGENCY_LEVELS.map((level) => {
                      const active = urgency === level
                      const critical = level === 'Critical'
                      return (
                        <label
                          key={level}
                          className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                            active
                              ? critical
                                ? 'border-transparent bg-brand-alert text-white'
                                : 'border-transparent bg-brand-gradient text-white'
                              : 'border-white/20 text-white/60 hover:border-white/45 hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level}
                            checked={active}
                            onChange={() => setUrgency(level)}
                            className="sr-only"
                          />
                          {level}
                        </label>
                      )
                    })}
                  </div>
                  {urgency === 'Critical' && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-brand-alert">
                      <ShieldAlert className="size-4 shrink-0" aria-hidden />
                      Critical submissions are routed to our rapid-response team.
                    </p>
                  )}
                </fieldset>

                <label className="mt-6 flex items-start gap-3 text-sm text-white/60">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 size-4 shrink-0 accent-[#8b5cf6]"
                  />
                  I consent to Rothian Cyber storing my details to respond to this enquiry. *
                </label>

                {/* Honeypot — off-screen and untabbable. A bot that fills
                    this in gets a cheerful 200 and nothing is sent. */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-6 rounded-2xl border border-brand-alert/40 bg-brand-alert/10 px-5 py-3.5 text-sm text-white"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-8 w-full rounded-full bg-brand-gradient px-8 py-4 font-display font-medium text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_-6px_rgba(45,212,238,0.55)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
