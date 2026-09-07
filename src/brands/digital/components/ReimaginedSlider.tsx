import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EASE } from '../lib/motion'

interface ReimaginedSliderProps {
  /** The finished, full-colour work. The "before" is this same image, drained of colour. */
  image: string
  alt: string
  beforeLabel?: string
  afterLabel?: string
}

/**
 * The value proposition, performed: drag from grey and generic to a vivid
 * Rothian reimagining.
 *
 * Accessibility: the control is a real `<input type="range">` stretched over the
 * frame, so dragging, tapping and arrow-key operation all work natively and the
 * position is announced to assistive tech. The visible divider and handle are
 * decorative reflections of its value.
 */
export function ReimaginedSlider({
  image,
  alt,
  beforeLabel = 'Before',
  afterLabel = 'Reimagined',
}: ReimaginedSliderProps) {
  const [pos, setPos] = useState(62)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-15% 0px' })
  const reduced = useReducedMotion()
  const [hasInteracted, setHasInteracted] = useState(false)

  // A single unprompted sweep on first view teaches the affordance.
  useEffect(() => {
    if (!inView || reduced || hasInteracted) return
    let raf = 0
    const from = 62
    const to = 34
    const duration = 1500
    const startedAt = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setPos(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    const delay = window.setTimeout(() => {
      raf = requestAnimationFrame(step)
    }, 550)
    return () => {
      window.clearTimeout(delay)
      cancelAnimationFrame(raf)
    }
  }, [inView, reduced, hasInteracted])

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group/slider relative select-none overflow-hidden rounded-3xl bg-ink-900 shadow-2xl shadow-ink-950/30"
    >
      {/* AFTER — the finished, full-colour work */}
      <img
        src={image}
        alt={alt}
        className="block aspect-[7/4] w-full object-cover"
        loading="lazy"
      />

      {/* BEFORE — the same frame, drained of colour and life */}
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <img
          src={image}
          alt=""
          className="block aspect-[7/4] w-full object-cover grayscale contrast-[0.72] brightness-[0.82]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink-950/25" />
      </div>

      {/* Divider + handle (decorative — the range input is the real control) */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.55)]"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-festival-gradient text-white shadow-xl ring-4 ring-white/30 transition-transform duration-300 group-hover/slider:scale-110">
          <MoveHorizontal className="size-6" />
        </span>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-ink-950/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm sm:left-6 sm:top-6">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-festival-gradient px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg sm:right-6 sm:top-6">
        {afterLabel}
      </span>

      {/* The actual control */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={pos}
        onChange={(e) => {
          setHasInteracted(true)
          setPos(Number(e.target.value))
        }}
        aria-label={`Reveal the reimagined version of ${alt}. Currently ${Math.round(pos)}% original.`}
        className="absolute inset-0 z-30 size-full cursor-ew-resize appearance-none bg-transparent focus-brand [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-14 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-[--h] [&::-webkit-slider-thumb]:w-14 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        style={{ ['--h' as string]: '100%' }}
      />
    </motion.div>
  )
}
