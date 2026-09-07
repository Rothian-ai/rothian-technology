import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE } from '../lib/motion'
import { ACCENT, getStage } from '../data/journey'
import type { WorkItem } from '../data/work'

/** Results-first case-study card: the number leads, the story follows. */
export function WorkCard({ item, index = 0 }: { item: WorkItem; index?: number }) {
  const stage = getStage(item.stage)
  const accent = stage ? ACCENT[stage.accent] : ACCENT.orange

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.08 }}
    >
      <Link
        to={`/digital/work/${item.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-white/25 focus-brand"
      >
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
            aria-hidden
          />

          {/* The headline metric — the first thing the eye lands on */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {item.headline.value}
            </p>
            <p className={`mt-1 font-display text-sm font-semibold ${accent.text}`}>
              {item.headline.label}
            </p>
            {item.headline.context && (
              <p className="mt-0.5 text-xs text-white/50">{item.headline.context}</p>
            )}
          </div>

          {item.illustrative && (
            <span className="absolute right-4 top-4 rounded-full bg-ink-950/80 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">
              Illustrative
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
            <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
            {item.discipline}
            <span className="text-white/20">·</span>
            {item.industry}
          </p>
          <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-festival-yellow">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-white/55">
            {item.summary}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            Read the case study
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
