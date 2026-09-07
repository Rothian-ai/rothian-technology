import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@data/lib/cn';
import { usePrefersReducedMotion } from '@data/lib/hooks';

/**
 * The brand's matrix-orb cutout, drifting slowly against the scroll. Purely
 * decorative depth — hidden from assistive tech and from small screens, where
 * it would only compete with the content.
 */
export function FloatingOrb({
  className,
  strength = 18,
}: {
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `-${strength}%`]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <div ref={ref} className={cn('pointer-events-none absolute', className)} aria-hidden>
      <motion.img
        src="/data/images/site/home-2.webp"
        alt=""
        width={1024}
        height={1024}
        loading="lazy"
        decoding="async"
        style={reduced ? undefined : { y, rotate }}
        className="size-full opacity-30 mix-blend-screen will-change-transform"
      />
    </div>
  );
}
