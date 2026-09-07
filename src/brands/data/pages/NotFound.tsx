import { PageTransition } from '@data/components/layout/PageTransition';
import { Button } from '@data/components/ui/Button';
import { SplitText } from '@data/components/ui/SplitText';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { DataField } from '@data/components/ui/DataField';

export default function NotFound() {

  return (
    <PageTransition>
      <section className="relative grid min-h-svh place-items-center overflow-hidden pt-[var(--nav-h)]">
        <DataField className="pointer-events-none absolute inset-0 size-full opacity-40" />
        <div className="bloom left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-25" aria-hidden />

        <div className="container-site relative py-24 text-center">
          <Eyebrow className="justify-center">Error 404</Eyebrow>
          <SplitText
            as="h1"
            immediate
            delay={0.15}
            lines={['Signal lost.']}
            className="mt-7 text-display"
          />
          <p className="mx-auto mt-8 max-w-md text-lead text-paper/55">
            This node isn’t on the map. Let’s route you back to something useful.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/data" size="lg" arrow>
              Back to home
            </Button>
            <Button href="/data/services" size="lg" variant="outline">
              Browse services
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
