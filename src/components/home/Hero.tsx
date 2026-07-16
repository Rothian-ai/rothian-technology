import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CalendarClock } from 'lucide-react'
import { useRef } from 'react'
import { EASE } from '../../lib/motion'
import { CONTACT, SOCIALS } from '../../lib/nav'
import { Button } from '../ui/Button'
import { SOCIAL_ICON_MAP } from '../ui/SocialIcons'

const TITLE_LINES: { words: string[]; gradient?: number[] }[] = [
  { words: ['Fresh', 'ideas.'] },
  { words: ['Agile', 'solutions.'] },
  { words: ['Powering', 'business.'], gradient: [0] },
]

const LIFECYCLE = ['Design', 'Develop', 'Deliver', 'Operate']

/** Slow the hero loop into the ambient-background sweet spot — present, but not distracting. */
const HERO_PLAYBACK_RATE = 0.7

/**
 * Cinematic fullscreen hero — the power-red mesh video with a slow scroll-zoom
 * (the family pattern from Rothian Digital & Cyber), layered scrims, the
 * rebrand logo animation, line-by-line masked title and scroll parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden bg-ink-950">
      {/* Background video — undulating red mesh, slow-zoom on scroll */}
      <motion.div style={reduced ? undefined : { scale: videoScale }} className="absolute inset-0" aria-hidden>
        {reduced ? (
          <img src="/images/hero-poster.jpg" alt="" className="size-full object-cover" />
        ) : (
          <video
            ref={(el) => {
              if (el) el.playbackRate = HERO_PLAYBACK_RATE
            }}
            className="size-full object-cover"
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </motion.div>
      {/* Layered scrims for legibility and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/50 to-ink-950" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/25 to-transparent" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 45% 45%, transparent 30%, rgba(5,6,14,0.8) 100%)',
        }}
      />

      {/* Rebrand logo animation — ambient, top right.
          `mix-blend-mode: screen` drops the video's black background: browsers that
          don't support WebM alpha (e.g. Safari) render it as opaque black, and screen
          blend knocks black out against the dark hero — so only the logo shows. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute right-[6%] top-24 hidden w-56 mix-blend-screen xl:block"
        aria-hidden
      >
        <video
          src="/videos/rothian-logo-animation.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full mix-blend-screen"
        />
      </motion.div>

      {/* Vertical social rail */}
      <motion.ul
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
      >
        {SOCIALS.map(({ label, href }) => {
          const Icon = SOCIAL_ICON_MAP[label as keyof typeof SOCIAL_ICON_MAP]
          return (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="block text-white/50 transition-all duration-300 hover:scale-110 hover:text-brand-coral"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            </li>
          )
        })}
      </motion.ul>

      {/* Content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity }}
        className="container-site relative z-10 pb-32 pt-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="eyebrow mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/85 backdrop-blur-sm"
        >
          <span className="size-2 rounded-full bg-brand-red animate-pulse-dot" aria-hidden />
          The alternative to big consulting
        </motion.p>

        <h1 className="heading-display max-w-5xl text-[2.9rem] text-white sm:text-7xl lg:text-[5.6rem]">
          {TITLE_LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.45 + li * 0.14, duration: 0.95, ease: EASE }}
                className="inline-block will-change-transform"
              >
                {line.words.map((word, wi) => (
                  <span key={wi} className={line.gradient?.includes(wi) ? 'text-gradient' : ''}>
                    {word}
                    {wi < line.words.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
          className="mt-7 max-w-xl text-lg text-white/70"
        >
          Rothian is the technology consultancy that chooses agility over scale and capability over
          resources — strategy, design, development, delivery and operations under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button to="/contact" size="lg" withArrow>
            Start a Project
          </Button>
          <Button
            href={CONTACT.booking}
            target="_blank"
            rel="noreferrer"
            size="lg"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
            variant="ghost"
          >
            <CalendarClock className="size-4" aria-hidden />
            Book a Consultation
          </Button>
        </motion.div>
      </motion.div>

      {/* Lifecycle ticker along the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1, ease: EASE }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink-950/60 backdrop-blur-sm"
      >
        <div className="container-site flex items-center justify-between gap-4 py-4">
          <ol className="flex flex-wrap items-center gap-x-6 gap-y-1 sm:gap-x-10">
            {LIFECYCLE.map((phase, i) => (
              <li key={phase} className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                <span className="text-brand-coral">0{i + 1}</span>
                {phase}
              </li>
            ))}
          </ol>
          <div className="hidden h-12 w-7 items-start justify-center rounded-full border border-white/25 p-1.5 md:flex" aria-hidden>
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="size-2 rounded-full bg-brand-gradient"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
