import { AnimatePresence, motion } from 'framer-motion'
import { CalendarClock, CheckCircle2, Mail } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { CAPABILITIES } from '../data/capabilities'
import { SERVICES } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { EASE } from '../lib/motion'
import { CONTACT } from '../lib/nav'
import { usePageMeta } from '../lib/seo'

const INTEREST_GROUPS = [
  { label: 'Services', options: SERVICES.map((s) => ({ value: s.slug, label: s.title })) },
  { label: 'Capabilities', options: CAPABILITIES.map((c) => ({ value: c.slug, label: c.title })) },
  { label: 'Solutions', options: SOLUTIONS.map((s) => ({ value: s.slug, label: s.title })) },
  { label: 'Other', options: [{ value: 'other', label: 'Something else' }] },
]

const ALL_OPTIONS = INTEREST_GROUPS.flatMap((g) => g.options)

const inputClasses =
  'w-full rounded-2xl border border-ink-900/15 bg-white px-5 py-3.5 text-ink-900 placeholder:text-ink-900/35 transition-colors focus:border-brand-red focus:outline-none'

export default function Contact() {
  usePageMeta(
    "Let's Get Started | Rothian",
    "Tell us about your requirement — or book a consultation directly in our calendar. We'll get back to you shortly.",
  )
  const [params] = useSearchParams()
  const preselected = params.get('interest') ?? params.get('service') ?? ''

  const [interest, setInterest] = useState(
    ALL_OPTIONS.some((o) => o.value === preselected) ? preselected : '',
  )
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Frontend only — connect to the CRM / form endpoint in production.
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Let's Get Started"
        title="Tell us where you want to go"
        highlight={['go']}
        description="Share your requirement below, or skip the form and book a consultation straight into our calendar. Either way, you'll talk to a practitioner — not a salesperson."
        compact
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Contact rails */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-3xl border border-ink-900/10 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <CalendarClock className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="eyebrow block text-ink-900/40">Fastest route</span>
                  <span className="mt-1 block font-display font-semibold text-ink-900 transition-colors group-hover:text-brand-crimson">
                    Book a consultation slot
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-5 rounded-3xl border border-ink-900/10 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="eyebrow block text-ink-900/40">Email us</span>
                  <span className="mt-1 block font-display font-semibold text-ink-900 transition-colors group-hover:text-brand-crimson">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.2} className="mt-4 rounded-3xl bg-ink-950 p-8 text-white">
              <p className="eyebrow text-brand-ice">RFPs, investment & partnerships</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Have an RFP requirement or an investment opportunity? Share it with us at{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-white underline decoration-brand-coral underline-offset-4"
                >
                  {CONTACT.email}
                </a>
                . For career enquiries, head to{' '}
                <a
                  href="https://people.rothian.com/careers"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white underline decoration-brand-coral underline-offset-4"
                >
                  our careers portal
                </a>
                .
              </p>
              <p className="mt-6 border-t border-white/10 pt-5 font-mono text-xs text-white/40">
                Company No. {CONTACT.companyNo} · VAT Reg. {CONTACT.vatNo}
              </p>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-ink-900/10 bg-white p-8 shadow-xl shadow-ink-900/5 sm:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex min-h-96 flex-col items-center justify-center text-center"
                  >
                    <span className="mb-6 grid size-16 place-items-center rounded-full bg-brand-gradient text-white">
                      <CheckCircle2 className="size-8" aria-hidden />
                    </span>
                    <h2 className="heading-section text-3xl text-ink-900">Message received</h2>
                    <p className="mt-4 max-w-sm text-ink-900/60">
                      Thanks for reaching out — a practitioner will get back to you shortly. Want to
                      move faster?{' '}
                      <a
                        href={CONTACT.booking}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand-crimson underline underline-offset-4"
                      >
                        Book a slot now
                      </a>
                      .
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="eyebrow mb-2 block text-ink-900/50">
                          Name *
                        </label>
                        <input id="name" name="name" required placeholder="Your name" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="company" className="eyebrow mb-2 block text-ink-900/50">
                          Company
                        </label>
                        <input id="company" name="company" placeholder="Company name" className={inputClasses} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="eyebrow mb-2 block text-ink-900/50">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="eyebrow mb-2 block text-ink-900/50">
                          Phone
                        </label>
                        <input id="phone" name="phone" type="tel" placeholder="+44 ..." className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="interest" className="eyebrow mb-2 block text-ink-900/50">
                        What do you need? *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className={`${inputClasses} appearance-none ${interest ? '' : 'text-ink-900/35'}`}
                      >
                        <option value="" disabled>
                          Select a service, capability or solution
                        </option>
                        {INTEREST_GROUPS.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="eyebrow mb-2 block text-ink-900/50">
                        Your requirement *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What are you trying to achieve? Rough timescales and constraints all help."
                        className={`${inputClasses} resize-y`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="group/btn mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 py-4 font-display font-medium text-white shadow-[0_8px_30px_-8px_rgba(180,30,48,0.55)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_-6px_rgba(224,49,64,0.6)] active:scale-[0.98]"
                    >
                      Send Enquiry
                    </button>
                    <p className="text-center text-xs text-ink-900/40">
                      We'll only use these details to respond to your enquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
