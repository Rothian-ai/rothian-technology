import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/** Animated statistic that counts up when scrolled into view. */
export function CountUp({ to, suffix = '', prefix = '', duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduced) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, prefix, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
