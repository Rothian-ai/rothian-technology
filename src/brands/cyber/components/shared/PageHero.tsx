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
  /** Override the default cyber-landscape backdrop. */
  image?: string
  /** Compact heroes for utility pages. */
  compact?: boolean
}

/**
 * Inner-page hero: dark cyber backdrop with a slow parallax drift,
 * abyss scrim, and masked split-text title — the Rothian family pattern.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
  image = '/cyber/images/capabilities-bg.jpg',
  compact,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden bg-abyss-950 ${
        compact ? 'min-h-[56svh]' : 'min-h-[72svh]'
      }`}
    >
      <motion.div
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0"
        aria-hidden
      >
        <img src={image} alt="" className="size-full object-cover" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/85 via-abyss-950/55 to-abyss-950" aria-hidden />

      <div className="container-site relative z-10 pb-16 pt-44 sm:pb-20">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="eyebrow mb-6 text-brand-cyan"
          >
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
