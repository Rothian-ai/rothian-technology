import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from '../../lib/motion'
import { SOCIALS } from '../../lib/nav'
import { Button } from '../ui/Button'
import { SOCIAL_ICON_MAP } from '../ui/SocialIcons'

const TITLE_LINES: { words: string[]; gradient?: number[] }[] = [
  { words: ['Secure'] },
  { words: ['by', 'Nature'], gradient: [1] },
]

/**
 * Cinematic fullscreen hero — the brand's bioluminescent jellyfish video,
 * slow-zoom, layered scrim, line-by-line masked title reveal and scroll parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden bg-abyss-950">
      {/* Background video — the deep-sea jellyfish */}
      <motion.div style={reduced ? undefined : { scale: videoScale }} className="absolute inset-0">
        <video
          className="size-full object-cover"
          src="/cyber/videos/hero.mp4"
          poster="/cyber/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </motion.div>
      {/* Layered scrims for legibility and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/80 via-abyss-950/40 to-abyss-950" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 40% 45%, transparent 30%, rgba(4,6,12,0.75) 100%)',
        }}
      />

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
                className="block text-white/50 transition-all duration-300 hover:scale-110 hover:text-brand-cyan"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            </li>
          )
        })}
      </motion.ul>

      {/* Content — left-aligned, letting the jellyfish breathe on the right */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity }}
        className="container-site relative z-10 pb-24 pt-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="eyebrow mb-7 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/85 backdrop-blur-sm"
        >
          Safeguarding Business
        </motion.p>

        <h1 className="heading-display max-w-4xl text-6xl text-white sm:text-8xl lg:text-[7.5rem]">
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
          Cybersecurity inspired by natural defenses. Discover your weak spots, adapt your
          defenses and evolve ahead of every threat — 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button to="/cyber/contact" size="lg" withArrow>
            Book a Security Assessment
          </Button>
          <Button
            href="#pillars"
            size="lg"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50"
            variant="ghost"
          >
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="size-2 rounded-full bg-brand-gradient"
          />
        </div>
      </motion.div>
    </section>
  )
}
