import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EASE } from '../lib/motion'
import { usePageMeta } from '../lib/seo'
import { ACCENT, getStage } from '../data/journey'
import { getWork, WORK } from '../data/work'
import { breadcrumbs, caseStudySchema, ORGANIZATION, useJsonLd } from '../lib/schema'

export default function WorkDetail() {
  const { slug } = useParams()
  const item = getWork(slug ?? '')

  usePageMeta(
    item ? `${item.client} — ${item.headline.value} ${item.headline.label} | Rothian Digital` : 'Case study',
    item?.summary,
  )
  useJsonLd(
    item
      ? [
          ORGANIZATION,
          caseStudySchema(item),
          breadcrumbs([
            { name: 'Home', path: '/digital' },
            { name: 'Work', path: '/digital/work' },
            { name: item.client, path: `/digital/work/${item.slug}` },
          ]),
        ]
      : null,
  )

  if (!item) return <Navigate to="/digital/work" replace />

  const stage = getStage(item.stage)
  const accent = stage ? ACCENT[stage.accent] : ACCENT.orange
  const index = WORK.indexOf(item)
  const next = WORK[(index + 1) % WORK.length]

  return (
    <>
      {/* Hero — the metric leads */}
      <section className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-40">
        <div className="absolute inset-0 opacity-25" aria-hidden>
          <img src={item.image} alt="" className="size-full object-cover blur-2xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/70" aria-hidden />

        <div className="container-site relative">
          <Link
            to="/digital/work"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white focus-brand"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All work
          </Link>

          <p className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-white/45">
            <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
            {item.discipline}
            <span className="text-white/20">·</span>
            {item.industry}
            {stage && (
              <>
                <span className="text-white/20">·</span>
                <span className={accent.text}>{stage.title}</span>
              </>
            )}
          </p>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow mb-3 text-white/45">{item.client}</p>
              <h1 className="heading-display max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">
                {item.title}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-sm"
            >
              <p className="text-festival-gradient font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
                {item.headline.value}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-white">
                {item.headline.label}
              </p>
              {item.headline.context && (
                <p className="mt-1 text-sm text-white/50">{item.headline.context}</p>
              )}
              {item.illustrative && (
                <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
                  Illustrative example, not a published client result.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="bg-ink-950">
        <div className="container-site">
          <Reveal
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[34rem] w-full rounded-3xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Challenge → Approach → Impact */}
      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="container-site flex flex-col gap-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <SectionHeading eyebrow="01" title="The challenge" dark />
            <Reveal
              as="p"
              className="font-display text-xl leading-relaxed text-white/80 sm:text-2xl"
            >
              {item.challenge}
            </Reveal>
          </div>

          <div className="divider-fade text-white" />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <SectionHeading eyebrow="02" title="The approach" dark />
            <ul className="flex flex-col gap-4">
              {item.approach.map((point, i) => (
                <Reveal
                  as="li"
                  key={point}
                  delay={i * 0.06}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-festival-gradient">
                    <Check className="size-3.5 text-white" aria-hidden />
                  </span>
                  <span className="leading-relaxed text-white/70">{point}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="divider-fade text-white" />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <SectionHeading eyebrow="03" title="The impact" dark />
            <div>
              <Reveal as="p" className="font-display text-xl leading-relaxed text-white/80 sm:text-2xl">
                {item.impact}
              </Reveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.metrics.map((metric, i) => (
                  <Reveal
                    key={metric.label}
                    delay={i * 0.06}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <p className="text-festival-gradient font-display text-3xl font-extrabold tracking-tight">
                      {metric.value}
                    </p>
                    <p className="mt-1.5 font-display text-sm font-semibold text-white">
                      {metric.label}
                    </p>
                    {metric.context && (
                      <p className="mt-1 text-xs text-white/45">{metric.context}</p>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-white/10 bg-ink-950 py-14">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <Link
            to="/digital/contact"
            className="inline-flex items-center gap-2 rounded-full bg-festival-gradient px-7 py-3.5 font-display text-sm font-semibold text-white transition-transform hover:scale-[1.03] focus-brand"
          >
            Get results like these
          </Link>
          <Link
            to={`/digital/work/${next.slug}`}
            className="group inline-flex items-center gap-3 text-right font-display font-semibold text-white transition-colors hover:text-festival-yellow focus-brand"
          >
            <span>
              <span className="block text-xs font-normal uppercase tracking-widest text-white/35">
                Next case study
              </span>
              {next.client}
            </span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
