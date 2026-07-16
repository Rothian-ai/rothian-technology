import { ArrowLeft, ArrowRight, CheckCircle2, Play } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SUB_SERVICE_MAP } from '../data/services'
import { SUB_SERVICE_DETAILS } from '../data/subservices'
import { usePageMeta } from '../lib/seo'

/** Click-to-play YouTube embed — no third-party iframe until the visitor asks for it. */
function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/40">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 grid place-items-center"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" aria-hidden />
          <span className="relative grid size-20 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_8px_40px_-4px_rgba(224,49,64,0.7)] transition-transform duration-300 group-hover:scale-110">
            <Play className="size-8 translate-x-0.5" fill="currentColor" aria-hidden />
          </span>
          <span className="absolute bottom-6 left-6 right-6 text-left font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            ▸ Watch: {title}
          </span>
        </button>
      )}
    </div>
  )
}

export default function SubServiceDetail() {
  const { slug } = useParams()
  const entry = slug ? SUB_SERVICE_MAP.get(slug) : undefined
  const detail = slug ? SUB_SERVICE_DETAILS[slug] : undefined

  usePageMeta(
    detail ? `${detail.title} | Rothian` : 'Services | Rothian',
    entry?.sub.body,
  )

  if (!entry || !detail) return <Navigate to="/services" replace />

  const { sub, service } = entry
  const siblings = service.subServices
  const index = siblings.findIndex((s) => s.slug === sub.slug)
  const prev = siblings[(index + siblings.length - 1) % siblings.length]
  const next = siblings[(index + 1) % siblings.length]

  return (
    <>
      <PageHero
        eyebrow={`Services · ${service.title} · Phase ${service.phase}`}
        title={detail.title}
        description={detail.intro[0]}
        compact
      >
        <Button to={`/contact?interest=${service.slug}`} size="lg" withArrow>
          Discuss This Service
        </Button>
        <Button
          to={`/services/${service.slug}`}
          size="lg"
          variant="ghost"
          className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
        >
          All {service.title} Services
        </Button>
      </PageHero>

      {/* Explainer video + narrative */}
      <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_30%,transparent_100%)]" aria-hidden />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <VideoEmbed videoId={detail.video} title={detail.title} />
          </Reveal>
          <div>
            <Reveal as="p" className="eyebrow mb-5 text-brand-ice">
              {'// '}In sixty seconds
            </Reveal>
            {detail.intro.map((para, i) => (
              <Reveal
                as="p"
                key={i}
                delay={0.1 + i * 0.1}
                className={`leading-relaxed text-white/70 ${i > 0 ? 'mt-5' : 'text-lg text-white/80'}`}
              >
                {para}
              </Reveal>
            ))}
            <Reveal delay={0.3} className="mt-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/60">
                <sub.icon className="size-4 text-brand-coral" aria-hidden />
                Phase {service.phase} · {service.title}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deliverables checklist */}
      {detail.deliverables.length > 0 && (
        <section className="bg-paper py-24 sm:py-32">
          <div className="container-site">
            <SectionHeading
              eyebrow="What you get"
              title="Deliverables and outcomes"
              description={`Everything a ${detail.title.replace(/ Services$/, '')} engagement puts on the table — the capabilities we bring and the outcomes you keep.`}
              className="mb-14"
            />
            <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
              {detail.deliverables.map((item, i) => (
                <Reveal as="li" key={i} delay={(i % 2) * 0.06} className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
                  <span className="leading-relaxed text-ink-900/75">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Sibling navigation within the phase */}
      <nav className="border-y border-ink-900/10 bg-paper-cool" aria-label={`${service.title} services`}>
        <div className="container-site grid sm:grid-cols-2">
          <Link
            to={`/services/${prev.slug}`}
            className="group flex items-center gap-4 border-b border-ink-900/10 py-8 pr-6 transition-colors hover:text-brand-crimson sm:border-b-0 sm:border-r"
          >
            <ArrowLeft className="size-5 text-ink-900/30 transition-all group-hover:-translate-x-1 group-hover:text-brand-crimson" aria-hidden />
            <span>
              <span className="eyebrow block text-ink-900/40">Previous in {service.title}</span>
              <span className="mt-1 block font-display text-lg font-bold">{prev.name}</span>
            </span>
          </Link>
          <Link
            to={`/services/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-8 pl-6 text-right transition-colors hover:text-brand-crimson"
          >
            <span>
              <span className="eyebrow block text-ink-900/40">Next in {service.title}</span>
              <span className="mt-1 block font-display text-lg font-bold">{next.name}</span>
            </span>
            <ArrowRight className="size-5 text-ink-900/30 transition-all group-hover:translate-x-1 group-hover:text-brand-crimson" aria-hidden />
          </Link>
        </div>
      </nav>

      <CtaBand
        title={`Ready for ${detail.title.replace(/ Services$/, '')}?`}
        buttonLabel="Get a Proposal"
        to={`/contact?interest=${service.slug}`}
      />
    </>
  )
}
