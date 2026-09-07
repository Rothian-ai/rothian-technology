import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { ServicesShowcase } from '@data/components/sections/ServicesShowcase';
import { FeatureGrid } from '@data/components/sections/FeatureGrid';
import { ParallaxImage } from '@data/components/ui/ParallaxImage';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { SplitText } from '@data/components/ui/SplitText';
import { Reveal, RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { about, coreValues, mission, positioning } from '@data/data/about';
import { pad } from '@data/lib/format';

export default function About() {

  return (
    <PageTransition>
      <PageHero
        eyebrow={about.eyebrow}
        titleLines={['The New Wave of', 'Data Engineering']}
        lead={about.body[0]}
        crumbs={[{ label: 'Home', href: '/data' }, { label: 'About Us' }]}
        media="/data/images/site/page-title.webp"
      />

      {/* Positioning pillars — set as a numbered editorial row, not cards */}
      <section className="pb-8 lg:pb-16" aria-label="What defines us">
        <div className="container-site">
          <Reveal>
            <p className="max-w-3xl text-lead text-paper/60">{about.body[1]}</p>
          </Reveal>

          <RevealGroup gap={0.09} className="mt-16 grid gap-10 border-t border-ink-700 pt-10 md:grid-cols-3 lg:mt-24">
            {positioning.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                    {pad(i + 1)}
                  </span>
                  <h2 className="text-h3">{p.title}</h2>
                  <p className="text-paper/50">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mission — image right, statement left */}
      <section className="py-28 lg:py-40" aria-label="Our mission">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{mission.eyebrow}</Eyebrow>
            </Reveal>
            <SplitText as="h2" lines={[mission.heading]} className="mt-7 text-h2" />
            <Reveal delay={0.12}>
              <p className="mt-8 text-lead text-paper/60">{mission.body}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ParallaxImage
              src={mission.image}
              alt="Our mission"
              className="aspect-4/3 rounded-2xl border border-ink-700"
              width={1456}
              height={1092}
            />
          </div>
        </div>
      </section>

      <FeatureGrid
        features={coreValues.items}
        eyebrow={coreValues.eyebrow}
        heading={coreValues.heading}
        body={coreValues.body}
        media={coreValues.image}
      />

      <ServicesShowcase
        limit={3}
        eyebrow="What we build"
        headingLines={['Our Services']}
        body="End-to-end data solutions designed for the modern cloud-native world"
      />

      <GlobalCta />
    </PageTransition>
  );
}
