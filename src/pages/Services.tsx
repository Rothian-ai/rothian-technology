import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SERVICES } from '../data/services'
import { usePageMeta } from '../lib/seo'

export default function Services() {
  usePageMeta(
    'Services | Rothian — Strategy, Design, Development, Delivery, Operations',
    'One delivery lifecycle, five services: end-to-end strategy, user-centred design, full-stack development, agile delivery and 24/7 operations.',
  )

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The full lifecycle, under one roof"
        highlight={['lifecycle,']}
        description="Strategy, Design, Development, Delivery and Operations — five services that run as one continuous lifecycle, so nothing gets lost in a handoff."
      >
        <Button to="/contact" size="lg" withArrow>
          Discuss Your Requirement
        </Button>
      </PageHero>

      {/* Lifecycle rail */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it fits together"
            title="Design. Develop. Deliver. Operate."
            highlight={['Operate.']}
            description="Each phase feeds the next. Join us for one phase or hand us the whole lifecycle — the interfaces are already built."
            className="mb-16"
          />

          <ol className="relative flex flex-col gap-6">
            {/* Connecting spine on large screens */}
            <span
              aria-hidden
              className="absolute bottom-8 left-[2.35rem] top-8 hidden w-px bg-gradient-to-b from-brand-coral/60 via-brand-crimson/40 to-brand-navy/30 lg:block"
            />
            {SERVICES.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={i * 0.06}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative grid gap-6 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10 sm:p-10 lg:grid-cols-[auto_1.1fr_1.4fr_auto] lg:items-center lg:gap-10"
                >
                  <span className="relative grid size-[4.7rem] shrink-0 place-items-center rounded-2xl bg-ink-950 font-mono text-xl font-semibold text-brand-coral shadow-lg shadow-ink-950/20 transition-transform duration-500 group-hover:scale-105">
                    {service.phase}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink-900 transition-colors group-hover:text-brand-crimson sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-900/45">
                      {service.outcome}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-900/60 lg:text-base">
                    {service.tagline}
                  </p>
                  <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-crimson">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Not sure which phase you need?"
        body="Most engagements start with a conversation, not a statement of work. Tell us where it hurts and we'll tell you honestly where to start."
      />
    </>
  )
}
