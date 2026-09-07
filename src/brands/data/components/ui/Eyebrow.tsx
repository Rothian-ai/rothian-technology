import { cn } from '@data/lib/cn';

/**
 * Small mono label. This is the brand's "data voice" — Roboto Mono is one of
 * the four faces already configured on the live site.
 */
export function Eyebrow({
  children,
  className,
  tone = 'signal',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'signal' | 'muted';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-label uppercase tracking-[0.22em]',
        tone === 'signal' ? 'text-brand-green' : 'text-mist',
        className,
      )}
    >
      {children}
    </span>
  );
}
