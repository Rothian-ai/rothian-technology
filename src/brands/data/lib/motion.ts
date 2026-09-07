import type { Transition, Variants } from 'framer-motion';

/** Long, weighted easing — the spine of the whole motion language. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = { duration: 0.9, ease: EASE };

/** Viewport config shared by every scroll reveal, so timing feels uniform. */
export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition },
};


/** Parent that releases children one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});



