import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../lib/motion'
import { SplitText } from './ui/SplitText'
import { ColourBurstCanvas } from './ColourBurstCanvas'

interface PageHeroProps {
  eyebrow: string
  title: string
  highlight?: string[]
  intro?: string
  children?: ReactNode
}

/** Inner-page hero — a calmer colour field than the home hero, same family. */
export function PageHero({ eyebrow, title, highlight, intro, children }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink-950 pb-16 pt-40 sm:pb-20">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <ColourBurstCanvas density={0.45} interactive={false} />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40"
        aria-hidden
      />

      <div className="container-site relative">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-6 text-festival-yellow"
        >
          {eyebrow}
        </motion.p>
        <SplitText
          text={title}
          highlight={highlight}
          as="h1"
          className="heading-display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl"
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
