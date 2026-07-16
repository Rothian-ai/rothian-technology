import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { EASE } from '../../lib/motion'
import { SplitText } from '../ui/SplitText'

interface PageHeroProps {
  eyebrow?: string
  title: string
  highlight?: string[]
  description?: string
  children?: ReactNode
  /** Compact heroes for utility pages. */
  compact?: boolean
}

/**
 * Inner-page hero: navy-ink backdrop with a blueprint grid, drifting
 * power-red / electric-blue glows and the family's masked split-text title.
 */
export function PageHero({ eyebrow, title, highlight, description, children, compact }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden bg-ink-950 ${
        compact ? 'min-h-[56svh]' : 'min-h-[72svh]'
      }`}
    >
      <motion.div style={reduced ? undefined : { y: bgY }} className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_35%,transparent_100%)]" />
        <div
          className="absolute -left-32 top-0 h-[30rem] w-[42rem] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(224,49,64,0.5), transparent 70%)',
          }}
        />
        <div
          className="absolute -right-40 bottom-0 h-[26rem] w-[40rem] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(107,125,255,0.45), transparent 70%)',
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950" aria-hidden />

      <div className="container-site relative z-10 pb-16 pt-44 sm:pb-20">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="eyebrow mb-6 text-brand-ice"
          >
            {'// '}
            {eyebrow}
          </motion.p>
        )}
        <SplitText
          text={title}
          highlight={highlight}
          as="h1"
          className="heading-display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
