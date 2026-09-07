import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline phosphor bar pinned under the header, tracking page progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-brand-green via-brand-green to-brand-green/20"
    />
  );
}
