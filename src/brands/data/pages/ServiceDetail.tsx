import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { ProcessTimeline } from '@data/components/sections/ProcessTimeline';
import { FeatureGrid } from '@data/components/sections/FeatureGrid';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { ParallaxImage } from '@data/components/ui/ParallaxImage';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { SplitText } from '@data/components/ui/SplitText';
import { Reveal, RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { getService, serviceCopy, services } from '@data/data/services';
import { pad } from '@data/lib/format';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);


  if (!service) return <Navigate to="/data/services" replace />;

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Service ${pad(index + 1)} / ${pad(services.length)}`}
        titleLines={[service.title]}
        crumbs={[
          { label: 'Home', href: '/data' },
          { label: 'Services', href: '/data/services' },
          { label: service.title },
        ]}
        media={service.image}
      />

      {/* What we do — statement set against the service artwork */}
      <section className="py-8 lg:py-16" aria-label="What we do">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <ParallaxImage
              src={service.image}
              alt={service.title}
              className="aspect-4/5 rounded-2xl border border-ink-700"
              width={1200}
              height={1500}
              priority
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal>
              <Eyebrow>{serviceCopy.whatWeDoEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              lines={['Tailored Data', 'Solutions for', 'Your Business']}
              className="mt-7 text-h2"
            />
            <Reveal delay={0.12}>
              <p className="mt-8 text-lead text-paper/60">{service.statement}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rule my-10" />
            </Reveal>

            <RevealGroup gap={0.07} className="flex flex-col gap-4">
              {service.features.map((f) => (
                <RevealItem key={f.title}>
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-brand-green" />
                    <span className="text-paper/80">{f.title}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <ProcessTimeline steps={service.process} />

      <FeatureGrid
        features={service.features}
        eyebrow={serviceCopy.featuresEyebrow}
        heading={serviceCopy.featuresHeading}
        body={serviceCopy.featuresBody}
      />

      {/* Next service — keeps the browse loop open */}
      <section className="py-20 lg:py-28" aria-label="Next service">
        <div className="container-site">
          <Link
            to={`/data/services/${next.slug}`}
            className="group flex flex-col gap-6 border-t border-ink-700 pt-10 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="font-mono text-label uppercase tracking-[0.22em] text-mist">
                Next discipline
              </span>
              <h2 className="mt-4 text-h2 transition-colors duration-500 group-hover:text-brand-green">
                {next.title}
              </h2>
            </div>
            <ArrowUpRight
              className="size-10 shrink-0 text-mist transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-brand-green"
              aria-hidden
            />
          </Link>
        </div>
      </section>

      <GlobalCta />
    </PageTransition>
  );
}
