import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { EASE } from '../lib/motion'
import { ACCENT, JOURNEY, type JourneyStage } from '../data/journey'

function StageRow({ stage, index }: { stage: JourneyStage; index: number }) {
  const accent = ACCENT[stage.accent]
  const aiCount = stage.services.filter((s) => s.ai).length

  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
      id={`stage-${stage.id}`}
      className="relative flex scroll-mt-32 gap-6 pb-12 last:pb-0 sm:gap-10"
    >
      {/* Node */}
      <div className="relative z-10 shrink-0">
        <span
          className={`grid size-12 place-items-center rounded-full bg-ink-950 font-display text-sm font-extrabold ring-2 sm:size-16 sm:text-base ${accent.ring} ${accent.text}`}
        >
          {stage.index}
        </span>
      </div>

      {/* Card */}
      <div className="group min-w-0 flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 sm:p-8">
        <p className={`eyebrow ${accent.text}`}>{stage.discipline}</p>
        <h3 className="heading-section mt-3 text-2xl text-white sm:text-3xl lg:text-4xl">
          {stage.title}
        </h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{stage.promise}</p>

        <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/40">
          <span>{stage.services.length} services</span>
          {aiCount > 0 && (
            <>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1 text-festival-yellow">
                <Sparkles className="size-3" aria-hidden />
                {aiCount} AI-native
              </span>
            </>
          )}
        </p>

        <ul className="mt-7 grid gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-2">
          {stage.services.map((service) => (
            <li key={service.name} className="flex items-start gap-3">
              <span
                className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${
                  service.ai ? 'bg-festival-gradient' : 'bg-white/10'
                }`}
              >
                <Check
                  className={`size-3 ${service.ai ? 'text-white' : 'text-white/50'}`}
                  aria-hidden
                />
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-white">
                  {service.name}
                  {service.ai && (
                    <span
                      className="rounded-full bg-festival-gradient px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white"
                      title="AI-native service"
                    >
                      AI
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

/**
 * The four-stage journey as a vertical timeline.
 *
 * Chosen over scroll-driven storytelling because it carries the same sequential
 * narrative while mapping 1:1 onto a standard Elementor timeline widget (or plain
 * containers plus a CSS spine) — no custom scroll tracking required.
 */
export function JourneyTimeline() {
  return (
    <div className="relative">
      {/* Spine */}
      <span
        aria-hidden
        className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-festival-yellow via-festival-rose to-festival-violet opacity-45 sm:left-8"
      />

      <ol className="relative flex flex-col">
        {JOURNEY.map((stage, i) => (
          <StageRow key={stage.id} stage={stage} index={i} />
        ))}
      </ol>

      {/* Terminal node — closes the spine and pays off the narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mt-12 flex items-center gap-6 sm:gap-10"
      >
        <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-festival-gradient text-white sm:size-16">
          <Check className="size-5 sm:size-6" aria-hidden />
        </span>
        <p className="font-display text-xl font-bold text-white sm:text-2xl">
          A growth engine, running.
        </p>
      </motion.div>
    </div>
  )
}
