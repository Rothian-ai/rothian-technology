import { globalCta, site } from '@data/data/site';
import { Button } from '@data/components/ui/Button';
import { SplitText } from '@data/components/ui/SplitText';
import { Reveal } from '@data/components/ui/Reveal';
import { DataField } from '@data/components/ui/DataField';
import { FloatingOrb } from '@data/components/ui/FloatingOrb';

/** The site-wide closing call to action, present on every page of the original. */
export function GlobalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-700 py-28 lg:py-40">
      <DataField className="pointer-events-none absolute inset-0 size-full opacity-40" />
      <div className="bloom left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30" aria-hidden />
      <FloatingOrb className="-left-24 top-4 hidden size-72 lg:block" />
      <FloatingOrb className="-right-16 bottom-0 hidden size-56 lg:block" strength={26} />

      <div className="container-site relative text-center">
        <SplitText
          as="h2"
          lines={[globalCta.heading]}
          className="mx-auto max-w-4xl text-h1"
        />

        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-xl text-lead text-paper/60">{globalCta.body}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href={globalCta.action.href} size="lg" arrow>
              {globalCta.action.label}
            </Button>
            <Button href={`mailto:${site.email}`} size="lg" variant="outline">
              {site.email}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
