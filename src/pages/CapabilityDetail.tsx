import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CAPABILITIES, CAPABILITY_MAP } from '../data/capabilities'
import { usePageMeta } from '../lib/seo'

export default function CapabilityDetail() {
  const { slug } = useParams()
  const capability = slug ? CAPABILITY_MAP.get(slug) : undefined

  usePageMeta(
    capability ? `${capability.title} Capability | Rothian` : 'Capabilities | Rothian',
    capability?.tagline,
  )

  if (!capability) return <Navigate to="/capabilities" replace />

  const index = CAPABILITIES.findIndex((c) => c.slug === capability.slug)
  const prev = CAPABILITIES[(index + CAPABILITIES.length - 1) % CAPABILITIES.length]
  const next = CAPABILITIES[(index + 1) % CAPABILITIES.length]

  return (
    <>
      <PageHero
        eyebrow={`Capabilities · ${String(index + 1).padStart(2, '0')} / 05`}
        title={capability.title}
        description={capability.intro}
        compact
      >
        <Button to={`/contact?interest=${capability.slug}`} size="lg" withArrow>
          Talk {capability.title}
        </Button>
        {capability.network && (
          <Button
            href={capability.network.href}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="ghost"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
          >
            {capability.network.name}
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
        )}
      </PageHero>

      {/* Stack ribbon */}
      <section className="border-b border-ink-900/5 bg-paper py-10">
        <div className="container-site flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-4 text-ink-900/40">Stack</span>
          {capability.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink-900/10 bg-white px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-900/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Capability items */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Inside the practice"
            title={`What ${capability.title.toLowerCase()} covers`}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capability.items.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 0.08}>
                <article className="group h-full rounded-3xl border border-ink-900/10 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10">
                  <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-crimson/25">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink-900">{item.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/60">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist company callout */}
      {capability.network && (
        <section className="bg-ink-950 py-16">
          <div className="container-site">
            <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="eyebrow text-brand-ice">Rothian Group specialist</p>
                <p className="mt-3 max-w-xl text-lg text-white/80">
                  Need this capability at full depth? <strong className="text-white">{capability.network.name}</strong>{' '}
                  is the group company dedicated to it.
                </p>
              </div>
              <Button href={capability.network.href} target="_blank" rel="noreferrer" withArrow>
                Visit {capability.network.name}
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Capability navigation */}
      <nav className="border-y border-ink-900/10 bg-paper" aria-label="Capabilities">
        <div className="container-site grid sm:grid-cols-2">
          <Link
            to={`/capabilities/${prev.slug}`}
            className="group flex items-center gap-4 border-b border-ink-900/10 py-8 pr-6 transition-colors hover:text-brand-crimson sm:border-b-0 sm:border-r"
          >
            <ArrowLeft className="size-5 text-ink-900/30 transition-all group-hover:-translate-x-1 group-hover:text-brand-crimson" aria-hidden />
            <span>
              <span className="eyebrow block text-ink-900/40">Previous</span>
              <span className="mt-1 block font-display text-lg font-bold">{prev.title}</span>
            </span>
          </Link>
          <Link
            to={`/capabilities/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-8 pl-6 text-right transition-colors hover:text-brand-crimson"
          >
            <span>
              <span className="eyebrow block text-ink-900/40">Next</span>
              <span className="mt-1 block font-display text-lg font-bold">{next.title}</span>
            </span>
            <ArrowRight className="size-5 text-ink-900/30 transition-all group-hover:translate-x-1 group-hover:text-brand-crimson" aria-hidden />
          </Link>
        </div>
      </nav>

      <CtaBand
        title={`Put ${capability.title.toLowerCase()} to work`}
        buttonLabel="Get a Proposal"
        to={`/contact?interest=${capability.slug}`}
      />
    </>
  )
}
