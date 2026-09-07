import { cn } from '@data/lib/cn';

interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass. Larger = slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * Infinite keyword ribbon. Duplicated once and translated by exactly -50%, so
 * the loop is seamless; runs on the compositor via transform only.
 */
export function Marquee({
  items,
  duration = 42,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={cn('edge-fade-x relative flex overflow-hidden', className)} aria-hidden>
      <div
        className="flex shrink-0 items-center gap-10 pr-10 will-change-transform motion-reduce:animate-none"
        style={{
          animation: `rd-marquee ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className={cn('flex shrink-0 items-center gap-10', itemClassName)}>
            {item}
            <span className="size-1 shrink-0 rounded-full bg-brand-green/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes rd-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }`}</style>
    </div>
  );
}
