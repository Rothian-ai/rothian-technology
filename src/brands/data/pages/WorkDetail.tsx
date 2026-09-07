import { Navigate, useParams } from 'react-router-dom';
import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { Reveal } from '@data/components/ui/Reveal';
import { Button } from '@data/components/ui/Button';
import { getCaseStudy } from '@data/data/work';
import { site } from '@data/data/site';
import { formatDate } from '@data/lib/format';

export default function WorkDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);


  if (!study) return <Navigate to="/data/portfolio" replace />;

  return (
    <PageTransition>
      <PageHero
        eyebrow="Case study"
        titleLines={study.title.split(' for ').map((part, i, arr) =>
          i < arr.length - 1 ? `${part} for` : part,
        )}
        crumbs={[
          { label: 'Home', href: '/data' },
          { label: 'Portfolio', href: '/data/portfolio' },
          { label: 'Case study' },
        ]}
      />

      <section className="pb-28 lg:pb-40">
        <div className="container-site">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-800">
              <img
                src={study.image}
                alt={study.title}
                width={1456}
                height={816}
                fetchPriority="high"
                decoding="async"
                className="aspect-16/9 w-full object-cover"
              />
            </figure>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            {/* Fact rail */}
            <aside className="lg:col-span-4">
              <dl className="flex flex-col divide-y divide-ink-700 border-y border-ink-700">
                <div className="flex flex-col gap-2 py-5">
                  <dt className="font-mono text-label uppercase tracking-[0.2em] text-mist">
                    Published
                  </dt>
                  <dd>
                    <time dateTime={study.date}>{formatDate(study.date)}</time>
                  </dd>
                </div>
                <div className="flex flex-col gap-2 py-5">
                  <dt className="font-mono text-label uppercase tracking-[0.2em] text-mist">
                    Services
                  </dt>
                  <dd className="flex flex-col gap-1">
                    {study.services.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
                <div className="flex flex-col gap-2 py-5">
                  <dt className="font-mono text-label uppercase tracking-[0.2em] text-mist">
                    Delivered by
                  </dt>
                  <dd>{site.name}</dd>
                </div>
              </dl>
            </aside>

            <div className="lg:col-span-8">
              <Reveal>
                <p className="text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.6] text-paper/80">
                  {study.summary}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-12 rounded-2xl border border-ink-700 bg-ink-800/50 p-8 lg:p-10">
                  <p className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                    Full write-up
                  </p>
                  <p className="mt-5 text-paper/60">
                    A detailed breakdown of the architecture, the delivery timeline and the measured
                    outcome is available on request.
                  </p>
                  <div className="mt-8">
                    <Button href="/data/contact" arrow>
                      Request the detail
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <GlobalCta />
    </PageTransition>
  );
}
