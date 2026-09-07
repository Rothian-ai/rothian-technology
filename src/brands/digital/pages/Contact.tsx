import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EASE } from '../lib/motion'
import { CONTACT } from '../lib/nav'
import { usePageMeta } from '../lib/seo'
import { BriefBuilder } from '../components/BriefBuilder'
import { PageHero } from '../components/PageHero'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

const field =
  'w-full rounded-2xl border bg-ink-950/60 px-5 py-3.5 text-white placeholder:text-white/30 transition-colors focus:border-festival-orange focus:outline-none'

/** Base and invalid states differ only in border colour — never set both. */
const fieldClass = (invalid?: boolean) =>
  `${field} ${invalid ? 'border-festival-orange/70' : 'border-white/15'}`

type Status = 'idle' | 'sending' | 'sent'

/** Shape returned by /api/contact. `fields` maps a field name to its error. */
interface ContactResponse {
  ok?: boolean
  error?: string
  fields?: Record<string, string>
}

/** Reassurance: the main reason an owner-manager hesitates is fear of a sales trap. */
const CALL_STEPS = [
  {
    title: 'You talk, we listen',
    body: 'Ten minutes on your business, your market and what is actually not working. No deck, no discovery invoice.',
  },
  {
    title: 'We tell you what we would do',
    body: 'A straight opinion on the smallest thing that would move your numbers — even if that is not a service we sell.',
  },
  {
    title: 'You decide, in your own time',
    body: 'If it fits, we scope it. If it does not, you have a free second opinion. No follow-up sequence to escape from.',
  },
]

export default function Contact() {
  usePageMeta(
    'Book a discovery call | Rothian Digital',
    'Twenty minutes, no pitch deck. Tell us where you want to be and we will tell you the smallest thing that gets you there. No upfront costs, no bs.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Book a call', path: '/digital/contact' },
    ]),
  ])

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLDivElement>(null)

  const sent = status === 'sent'
  const sending = status === 'sending'

  const useBrief = (summary: string) => {
    setMessage(summary)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    // Read the form before awaiting — React pools nothing, but currentTarget
    // is null once the handler yields.
    const payload = Object.fromEntries(new FormData(e.currentTarget))

    setStatus('sending')
    setError(null)
    setFieldErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}) as ContactResponse)

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
      setError(
        `We could not reach the server. Please try again, or email us at ${CONTACT.email}.`,
      )
      setStatus('idle')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Book a discovery call"
        title="Twenty minutes. No pitch deck."
        highlight={['Twenty']}
        intro="Tell us where you want to be and we will tell you the smallest thing that gets you there. If we are not the right answer, we will say so on the call."
      />

      {/* Booking */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* What happens */}
          <div className="flex flex-col gap-8">
            <div>
              <SectionHeading eyebrow="What happens on the call" title="No trap, no theatre" dark />
              <ol className="mt-8 flex flex-col gap-4">
                {CALL_STEPS.map((step, i) => (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={i * 0.08}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-festival-gradient font-display text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-display font-bold text-white">{step.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-white/55">
                        {step.body}
                      </span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={0.2} className="flex flex-wrap gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
              <p className="flex items-center gap-2 text-white/70">
                <Clock className="size-4 shrink-0 text-festival-yellow" aria-hidden />
                20 minutes
              </p>
              <p className="flex items-center gap-2 text-white/70">
                <ShieldCheck className="size-4 shrink-0 text-festival-yellow" aria-hidden />
                No upfront costs
              </p>
              <p className="flex items-center gap-2 text-white/70">
                <CalendarDays className="size-4 shrink-0 text-festival-yellow" aria-hidden />
                UK &amp; UAE hours
              </p>
            </Reveal>

            {/* Direct routes */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: Phone, label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: 'Chat now',
                  href: CONTACT.whatsapp,
                  external: true,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25 focus-brand"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-festival-gradient text-white">
                      <c.icon className="size-4" aria-hidden />
                    </span>
                    <span>
                      <span className="eyebrow block text-white/35">{c.label}</span>
                      <span className="mt-1 block break-words text-sm font-medium text-white transition-colors group-hover:text-festival-yellow">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <Reveal delay={0.1}>
            <div
              ref={formRef}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex min-h-96 flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-festival-gradient text-white">
                      <CheckCircle2 className="size-8" aria-hidden />
                    </span>
                    <h2 className="mt-6 font-display text-2xl font-bold text-white">
                      Request received
                    </h2>
                    <p className="mt-3 max-w-sm text-white/60">
                      We will confirm a time that suits you — usually within the same working day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    className="relative flex flex-col gap-5"
                  >
                    <h2 className="heading-section text-2xl text-white sm:text-3xl">
                      Request your call
                    </h2>
                    <p className="-mt-1 text-sm text-white/50">
                      Pick a slot and we will send the invite. Prefer email? This form works just as
                      well.
                    </p>

                    {/* Scheduler slot — swap for the live embed in production */}
                    <div className="rounded-2xl border border-dashed border-white/20 bg-ink-950/50 p-5 text-center">
                      <CalendarDays className="mx-auto size-6 text-white/30" aria-hidden />
                      <p className="mt-3 text-sm font-medium text-white/60">
                        Calendar booking embed
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        Placeholder — connect Cal.com or Calendly here at build time.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-white/80">
                          Full name
                        </label>
                        <input
                          id="c-name"
                          name="name"
                          required
                          placeholder="Your name"
                          aria-invalid={Boolean(fieldErrors.name)}
                          aria-describedby={fieldErrors.name ? 'c-name-error' : undefined}
                          className={fieldClass(Boolean(fieldErrors.name))}
                        />
                        {fieldErrors.name && (
                          <p id="c-name-error" className="mt-1.5 text-xs text-festival-orange">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="c-company" className="mb-2 block text-sm font-medium text-white/80">
                          Company
                        </label>
                        <input
                          id="c-company"
                          name="company"
                          placeholder="Business name"
                          className={fieldClass()}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-white/80">
                          Email
                        </label>
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'c-email-error' : undefined}
                          className={fieldClass(Boolean(fieldErrors.email))}
                        />
                        {fieldErrors.email && (
                          <p id="c-email-error" className="mt-1.5 text-xs text-festival-orange">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="c-when" className="mb-2 block text-sm font-medium text-white/80">
                          Best time to talk
                        </label>
                        <select id="c-when" name="when" className={`${fieldClass()} appearance-none`}>
                          <option>Morning (UK)</option>
                          <option>Afternoon (UK)</option>
                          <option>Morning (UAE)</option>
                          <option>Afternoon (UAE)</option>
                          <option>Anytime — you pick</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-white/80">
                        What do you want to talk about?
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        rows={6}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="A sentence is enough to start."
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? 'c-message-error' : undefined}
                        className={`${fieldClass(Boolean(fieldErrors.message))} resize-y`}
                      />
                      {fieldErrors.message && (
                        <p id="c-message-error" className="mt-1.5 text-xs text-festival-orange">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot — off-screen and untabbable. A bot that fills
                        this in gets a cheerful 200 and nothing is sent. */}
                    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="c-website">Leave this field empty</label>
                      <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="flex items-start gap-2.5 rounded-2xl border border-festival-orange/40 bg-festival-orange/10 px-4 py-3 text-sm text-white/85"
                      >
                        <CircleAlert className="mt-0.5 size-4 shrink-0 text-festival-orange" aria-hidden />
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform duration-300 hover:scale-[1.02] focus-brand disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {sending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
                      {sending ? 'Sending…' : 'Request my call'}
                    </button>

                    <p className="text-xs text-white/35">
                      No upfront costs, and no sales sequence you have to escape from.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lower-commitment path */}
      <section className="border-t border-white/10 bg-ink-900 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Not ready to talk?"
            title="Get three ideas first"
            highlight={['three']}
            description="Answer three questions and we will show you where we would start — no email required."
            dark
            className="mb-12 max-w-2xl"
          />
          <div className="max-w-3xl">
            <BriefBuilder onUseBrief={useBrief} />
          </div>
        </div>
      </section>
    </>
  )
}
