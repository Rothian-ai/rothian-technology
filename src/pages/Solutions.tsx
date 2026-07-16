import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SOLUTIONS } from '../data/solutions'
import { usePageMeta } from '../lib/seo'

export default function Solutions() {
  usePageMeta(
    'Solutions | Rothian — SOC, CISO as a Service, App Factory, Digital Marketing',
    'Packaged Rothian solutions: 24/7 Security Operations Center, CISO as a Service, App Factory sprints and digital marketing.',
  )

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Packaged outcomes, not open-ended projects"
        highlight={['outcomes,']}
        description="Four productised solutions with a fixed rhythm and a clear scope — for the problems that don't need six weeks of discovery to name."
      >
        <Button to="/contact" size="lg" withArrow>
          Scope a Solution
        </Button>
      </PageHero>

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site flex flex-col gap-16 sm:gap-20">
          {SOLUTIONS.map((solution, i) => (
            <Reveal
              as="article"
              key={solution.slug}
              id={solution.slug}
              className={`grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className="eyebrow mb-5 text-brand-crimson">
                  {'// '}Solution {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="heading-section text-3xl text-ink-900 sm:text-4xl lg:text-5xl">
                  {solution.title}
                </h2>
                <p className="mt-4 font-display text-lg font-semibold text-ink-900/80">
                  {solution.tagline}
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-900/65">{solution.body}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button to={`/contact?interest=${solution.slug}`} withArrow>
                    Get Started
                  </Button>
                  {solution.href && (
                    <Button href={solution.href} target="_blank" rel="noreferrer" variant="outline">
                      Specialist site
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 p-8 shadow-2xl shadow-ink-950/20 sm:p-10">
                <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
                <solution.icon className="absolute -right-8 -top-8 size-44 text-white/[0.04]" aria-hidden />
                <ul className="relative grid gap-3">
                  {solution.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="size-4.5 shrink-0 text-brand-coral" aria-hidden />
                      <span className="font-medium text-white/85">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-cool py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Something more bespoke?"
            title="If it doesn't fit a package, we build it"
            description="Our five lifecycle services cover everything from strategy workshops to 24/7 operations."
            align="center"
            className="mb-10"
          />
          <Reveal className="text-center">
            <Button to="/services" withArrow>
              Explore the Services
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
