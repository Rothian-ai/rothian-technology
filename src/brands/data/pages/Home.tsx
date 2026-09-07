import { PageTransition } from '@data/components/layout/PageTransition';
import { Hero } from '@data/components/sections/Hero';
import { ServicesShowcase } from '@data/components/sections/ServicesShowcase';
import { AboutIntro } from '@data/components/sections/AboutIntro';
import { CapabilityRibbon } from '@data/components/sections/CapabilityRibbon';
import { JournalTeaser } from '@data/components/sections/JournalTeaser';
import { GlobalCta } from '@data/components/sections/GlobalCta';

export default function Home() {

  return (
    <PageTransition>
      <Hero />
      <ServicesShowcase limit={3} />
      <AboutIntro />
      <CapabilityRibbon />
      <JournalTeaser limit={3} />
      <GlobalCta />
    </PageTransition>
  );
}
