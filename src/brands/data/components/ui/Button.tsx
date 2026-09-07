import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@data/lib/cn';
import { usePrefersReducedMotion } from '@data/lib/hooks';

type Variant = 'gradient' | 'outline' | 'ghost' | 'light';
type Size = 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Show the trailing arrow that kicks on hover. */
  arrow?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

/** Router link that can carry motion values directly, so the anchor itself is
 *  the interactive element — no empty overlay link for screen readers to find. */
const MotionLink = motion.create(Link);

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-medium ' +
  'transition-all duration-300 will-change-transform disabled:opacity-50 disabled:pointer-events-none';

/** Matches the variant set used across Rothian Cyber / Digital / Technology. */
const variants: Record<Variant, string> = {
  gradient:
    'bg-brand-gradient text-ink-950 shadow-[0_8px_30px_-8px_rgba(67,212,91,0.5)] ' +
    'hover:shadow-[0_12px_40px_-6px_rgba(126,232,151,0.5)]',
  outline: 'border border-white/25 text-paper hover:border-brand-green hover:text-brand-green',
  ghost: 'text-paper/70 hover:text-brand-green',
  light: 'bg-paper text-ink-950 hover:bg-brand-mint',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
};

/**
 * The site's single call-to-action primitive. On pointer devices it drifts a
 * few pixels toward the cursor — a small magnetic pull that makes the CTAs
 * feel physical without moving enough to break Fitts's-law targeting.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'gradient',
  size = 'md',
  className,
  arrow = false,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.4 });
  const tx = useTransform(x, (v) => (reduced ? 0 : v));
  const ty = useTransform(y, (v) => (reduced ? 0 : v));

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="relative z-10 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );

  const motionProps = {
    style: { x: tx, y: ty },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: classes,
    ...rest,
  };

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
          {...motionProps}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <MotionLink to={href} ref={ref as React.Ref<HTMLAnchorElement>} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
