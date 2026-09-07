import type { Feature } from '@data/types';
import { SectionHeading } from '@data/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { ParallaxImage } from '@data/components/ui/ParallaxImage';
import { pad } from '@data/lib/format';
import { cn } from '@data/lib/cn';

/**
 * Key-features band. Cards carry a phosphor top-edge that lights on hover —
 * a hairline accent rather than a filled panel, keeping the canvas dark.
 */
export function FeatureGrid({
  features,
  eyebrow,
  heading,
  body,
  columns = 3,
  media,
}: {
  features: Feature[];
  eyebrow?: string;
  heading: string;
  body?: string;
  columns?: 2 | 3;
  /** Optional artwork shown alongside the heading. */
  media?: string;
}) {
  return (
    <section
      className="bg-data-grid relative overflow-hidden border-t border-ink-700 bg-ink-900 py-28 lg:py-40"
      aria-label={heading}
    >
      <div className="bloom right-0 top-0 size-[28rem] opacity-20" aria-hidden />

      <div className="container-site relative">
        {media ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <ParallaxImage
                src={media}
                alt=""
                className="aspect-4/3 rounded-2xl border border-ink-700"
                width={1456}
                height={1092}
              />
            </div>
            <div className="lg:col-span-7">
              <SectionHeading eyebrow={eyebrow} headingLines={[heading]} body={body} />
            </div>
          </div>
        ) : (
          <SectionHeading eyebrow={eyebrow} headingLines={[heading]} body={body} />
        )}

        <RevealGroup
          gap={0.09}
          className={cn(
            'mt-16 grid gap-6 lg:mt-24',
            columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2',
          )}
        >
          {features.map((f, i) => (
            <RevealItem key={f.title} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-800/60 p-8 transition-colors duration-700 hover:border-brand-green/35 lg:p-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-green to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-green/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <span className="font-mono text-label uppercase tracking-[0.22em] text-mist transition-colors duration-500 group-hover:text-brand-green">
                  {pad(i + 1)}
                </span>

                <h3 className="mt-6 text-h3">{f.title}</h3>
                <p className="mt-4 leading-relaxed text-paper/50">{f.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
