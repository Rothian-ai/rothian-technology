import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE, viewport } from '@data/lib/motion';
import { cn } from '@data/lib/cn';
import { usePrefersReducedMotion } from '@data/lib/hooks';

interface SplitTextProps {
  /** Each entry becomes one masked line; nodes allow per-word accents. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  /** Play immediately instead of waiting for the viewport (for heroes). */
  immediate?: boolean;
}

/**
 * Editorial line reveal: every line sits in its own overflow-hidden box and
 * slides up from beneath it. Falls back to a plain fade when the user has
 * asked for reduced motion.
 */
export function SplitText({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'div',
  immediate = false,
}: SplitTextProps) {
  const reduced = usePrefersReducedMotion();

  // Reduced motion renders the lines outright: text must never depend on an
  // animation — or on an IntersectionObserver firing — in order to be readable.
  if (reduced) {
    return (
      <Tag className={cn(className)}>
        {lines.map((line, i) => (
          <span key={i} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const animationProps = immediate
    ? { initial: 'hidden' as const, animate: 'show' as const }
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport };

  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn('block', lineClassName)}
            {...animationProps}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 1, ease: EASE, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
