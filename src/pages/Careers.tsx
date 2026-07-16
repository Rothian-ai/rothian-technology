import { ArrowUpRight, Inbox } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CULTURE_PILLARS } from '../data/values'
import { CONTACT } from '../lib/nav'
import { usePageMeta } from '../lib/seo'

export default function Careers() {
  usePageMeta(
    'Careers | Rothian — Bored of boring?',
    "Bored of boring? We are too. Join a tight-knit team doing real work with real impact — where ideas beat hierarchy.",
  )

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Bored of boring? We are too."
        highlight={['boring?']}
        description="Let's build cool stuff together. We're a tight-knit team working with global clients — no bench, no busywork, no filler."
      >
        <Button
          href="https://people.rothian.com/careers"
          target="_blank"
          rel="noreferrer"
          size="lg"
          withArrow
        >
          View Open Roles
        </Button>
      </PageHero>

      {/* Culture pillars */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why work with us"
            title="Small team. Serious work."
            highlight={['Serious']}
            className="mb-16"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {CULTURE_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <article className="group h-full rounded-3xl border border-ink-900/10 bg-white p-9 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10">
                  <span className="font-mono text-sm font-semibold tracking-widest text-brand-coral">
                    0{i + 1}
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold text-ink-900">{pillar.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink-900/65">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring status */}
      <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_30%,transparent_100%)]" aria-hidden />
        <div className="container-site relative">
          <Reveal className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm sm:p-14">
            <span className="mx-auto mb-7 grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/5 text-brand-coral">
              <Inbox className="size-6" aria-hidden />
            </span>
            <h2 className="heading-section text-3xl text-white sm:text-4xl">We are hiring — in waves</h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/65">
              No open positions right now — but the right person at the wrong time is still the
              right person. Introduce yourself and we'll keep you on the radar.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="https://people.rothian.com/careers"
                target="_blank"
                rel="noreferrer"
                withArrow
              >
                Careers Portal
              </Button>
              <Button
                href={`mailto:${CONTACT.email}?subject=Introduction%20—%20future%20roles`}
                variant="ghost"
                className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
              >
                Say Hello
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
