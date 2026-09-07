import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, stagger, viewport } from '@data/lib/motion';
import { usePrefersReducedMotion } from '@data/lib/hooks';
import { cn } from '@data/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to hold before the reveal starts. */
  delay?: number;
  as?: ElementType;
  variants?: Variants;
}

/**
 * Single element that fades and lifts into place once scrolled into view.
 *
 * Under prefers-reduced-motion the element renders plainly with no hidden
 * initial state — the content must never depend on an animation (or on an
 * IntersectionObserver firing) in order to be visible.
 */
export function Reveal({ children, className, delay = 0, as, variants = fadeUp }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Comp = (as ?? 'div') as ElementType;

  if (reduced) return <Comp className={className}>{children}</Comp>;

  const M = motion[(as ?? 'div') as 'div'];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: ElementType;
}

/** Wrap a list to release its <RevealItem> children in sequence. */
export function RevealGroup({ children, className, gap = 0.08, delay = 0, as }: RevealGroupProps) {
  const reduced = usePrefersReducedMotion();
  const Comp = (as ?? 'div') as ElementType;

  if (reduced) return <Comp className={className}>{children}</Comp>;

  const M = motion[(as ?? 'div') as 'div'];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(gap, delay)}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
}) {
  const reduced = usePrefersReducedMotion();
  const Comp = (as ?? 'div') as ElementType;

  if (reduced) return <Comp className={cn(className)}>{children}</Comp>;

  const M = motion[(as ?? 'div') as 'div'];
  return (
    <M className={cn(className)} variants={variants}>
      {children}
    </M>
  );
}
