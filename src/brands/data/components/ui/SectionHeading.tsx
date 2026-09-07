import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { cn } from '@data/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Split across lines for the masked reveal; each entry is one line. */
  headingLines: string[];
  body?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
  as?: 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  headingLines,
  body,
  align = 'left',
  className,
  action,
  as = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <div
        className={cn(
          'flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
          centered && 'lg:flex-col lg:items-center',
        )}
      >
        <SplitText
          as={as}
          lines={headingLines}
          className={cn('text-h2 max-w-4xl', centered && 'mx-auto')}
        />
        {action && <Reveal delay={0.15} className="shrink-0">{action}</Reveal>}
      </div>

      {body && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-lead text-paper/60',
              centered && 'mx-auto',
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
