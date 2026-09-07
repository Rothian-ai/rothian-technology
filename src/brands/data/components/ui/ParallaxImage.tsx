import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@data/lib/cn';
import { usePrefersReducedMotion } from '@data/lib/hooks';
import { EASE } from '@data/lib/motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Vertical travel in percent of the element height. */
  strength?: number;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Image inside a clipping frame. The frame wipes open on entry while the image
 * itself drifts against the scroll, which reads as depth rather than movement.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  priority = false,
  width,
  height,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  // No hidden initial state under reduced motion — the frame is simply open.
  const frameMotion = reduced
    ? {}
    : {
        initial: { clipPath: 'inset(0 0 100% 0)' },
        whileInView: { clipPath: 'inset(0 0 0% 0)' },
        viewport: { once: true, margin: '0px 0px -10% 0px' },
        transition: { duration: 1.2, ease: EASE },
      };

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden bg-ink-800', className)}
      {...frameMotion}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={reduced ? undefined : { y }}
        // Oversized so the parallax drift never exposes an edge.
        className={cn(
          'absolute inset-0 size-full scale-[1.18] object-cover will-change-transform',
          imgClassName,
        )}
      />
    </motion.div>
  );
}
