import { capabilityMarquee } from '@data/data/site';
import { Marquee } from '@data/components/ui/Marquee';

/**
 * The keyword ribbon from the live homepage, run as two counter-scrolling
 * lanes so the band has internal rhythm instead of one flat crawl.
 */
export function CapabilityRibbon() {
  return (
    <section className="relative overflow-hidden border-y border-ink-700 bg-ink-900 py-14 lg:py-20">
      <h2 className="sr-only">Capabilities</h2>

      <Marquee
        items={capabilityMarquee}
        duration={52}
        className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold tracking-tight text-paper/85"
      />
      <Marquee
        items={[...capabilityMarquee].reverse()}
        duration={64}
        reverse
        className="mt-6 font-mono text-[clamp(0.8rem,1.2vw,1rem)] uppercase tracking-[0.2em] text-brand-green/55"
      />
    </section>
  );
}
