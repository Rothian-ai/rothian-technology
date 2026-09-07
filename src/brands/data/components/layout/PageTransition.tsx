import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@data/lib/motion';

/**
 * Route-level wrapper. Kept to a short opacity/lift rather than a full-screen
 * curtain: the page below is interactive immediately and nothing shifts layout.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
