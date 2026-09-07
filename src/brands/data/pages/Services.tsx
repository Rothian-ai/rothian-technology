import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { ServicesShowcase } from '@data/components/sections/ServicesShowcase';
import { GlobalCta } from '@data/components/sections/GlobalCta';

export default function Services() {

  return (
    <PageTransition>
      <PageHero
        eyebrow="Services"
        titleLines={['The Data Matrix:', 'Your Digital Core']}
        lead="Our framework breaks the modern enterprise into interconnected data domains, each powered by engineering excellence, governance, and intelligence. We help you build a digital foundation that is scalable, secure, and future-ready."
        crumbs={[{ label: 'Home', href: '/data' }, { label: 'Services' }]}
        media="/data/images/site/bg-effect-02.webp"
        mediaPosition="bottom"
      />

      <ServicesShowcase
        showAll
        eyebrow="Nine disciplines"
        headingLines={['End-to-end, from', 'strategy to production']}
        body="Every engagement draws on the disciplines below — together or on their own, sequenced around what your business needs first."
      />

      <GlobalCta />
    </PageTransition>
  );
}
