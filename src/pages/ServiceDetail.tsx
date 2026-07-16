import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CAPABILITY_MAP } from '../data/capabilities'
import { SERVICES, SERVICE_MAP } from '../data/services'
import { usePageMeta } from '../lib/seo'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = slug ? SERVICE_MAP.get(slug) : undefined

  usePageMeta(
    service ? `${service.title} Services | Rothian` : 'Services | Rothian',
    service?.tagline,
  )

  if (!service) return <Navigate to="/services" replace />

  const index = SERVICES.findIndex((s) => s.slug === service.slug)
  const prev = SERVICES[(index + SERVICES.length - 1) % SERVICES.length]
  const next = SERVICES[(index + 1) % SERVICES.length]
  const related = service.relatedCapabilities
    .map((c) => CAPABILITY_MAP.get(c))
    .filter((c) => c !== undefined)

  return (
    <>
      <PageHero
        eyebrow={`Services · Phase ${service.phase}`}
        title={service.title}
        description={service.intro}
        compact
      >
        <Button to={`/contact?interest=${service.slug}`} size="lg" withArrow>
          Discuss {service.title}
        </Button>
      </PageHero>

      {/* Sub-services */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="What's included"
            title={`${service.title}, service by service`}
            description={service.outcome}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub, i) => (
              <Reveal key={sub.slug} delay={(i % 3) * 0.08}>
                <Link
                  to={`/services/${sub.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-crimson/25">
                      <sub.icon className="size-5" aria-hidden />
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-900/35 transition-colors group-hover:text-brand-crimson">
                      <Play className="size-3" aria-hidden /> Video
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-crimson">
                    {sub.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/60">{sub.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-crimson">
                    Explore service
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related capabilities */}
      {related.length > 0 && (
        <section className="bg-ink-950 py-20 sm:py-24">
          <div className="container-site">
            <Reveal as="p" className="eyebrow mb-8 text-brand-ice">
              {'// '}Capabilities we apply in this phase
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((cap, i) => (
                <Reveal key={cap.slug} delay={i * 0.08}>
                  <Link
                    to={`/capabilities/${cap.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-coral/40 hover:bg-white/10"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-brand-coral">
                      <cap.accentIcon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display font-bold text-white">{cap.title}</span>
                      <span className="mt-0.5 block text-xs text-white/50">{cap.stack.slice(0, 3).join(' · ')}</span>
                    </span>
                    <ArrowRight className="ml-auto size-4 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-brand-coral" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Phase navigation */}
      <nav className="border-y border-ink-900/10 bg-paper" aria-label="Service phases">
        <div className="container-site grid sm:grid-cols-2">
          <Link
            to={`/services/${prev.slug}`}
            className="group flex items-center gap-4 border-b border-ink-900/10 py-8 pr-6 transition-colors hover:text-brand-crimson sm:border-b-0 sm:border-r"
          >
            <ArrowLeft className="size-5 text-ink-900/30 transition-all group-hover:-translate-x-1 group-hover:text-brand-crimson" aria-hidden />
            <span>
              <span className="eyebrow block text-ink-900/40">Phase {prev.phase}</span>
              <span className="mt-1 block font-display text-lg font-bold">{prev.title}</span>
            </span>
          </Link>
          <Link
            to={`/services/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-8 pl-6 text-right transition-colors hover:text-brand-crimson"
          >
            <span>
              <span className="eyebrow block text-ink-900/40">Phase {next.phase}</span>
              <span className="mt-1 block font-display text-lg font-bold">{next.title}</span>
            </span>
            <ArrowRight className="size-5 text-ink-900/30 transition-all group-hover:translate-x-1 group-hover:text-brand-crimson" aria-hidden />
          </Link>
        </div>
      </nav>

      <CtaBand
        title={`Ready to talk ${service.title.toLowerCase()}?`}
        buttonLabel="Get a Proposal"
        to={`/contact?interest=${service.slug}`}
      />
    </>
  )
}
