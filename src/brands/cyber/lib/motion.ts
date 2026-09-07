import type { Transition, Variants } from 'framer-motion'

/** Signature easing for the whole site — a long expo-out. */
export const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE },
  },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Per-word rise used by SplitText. */
export const wordRise: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.75, ease: EASE },
  },
}

export const VIEWPORT = { once: true, margin: '-12% 0px' } as const
