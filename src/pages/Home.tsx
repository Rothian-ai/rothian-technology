import { CapabilitiesGrid } from '../components/home/CapabilitiesGrid'
import { ClientsMarquee } from '../components/home/ClientsMarquee'
import { FaqSection } from '../components/home/FaqSection'
import { Hero } from '../components/home/Hero'
import { LifecycleShowcase } from '../components/home/LifecycleShowcase'
import { SolutionsStrip } from '../components/home/SolutionsStrip'
import { WhoWeAre } from '../components/home/WhoWeAre'
import { CtaBand } from '../components/shared/CtaBand'
import { NetworkSection } from '../components/shared/NetworkSection'
import { usePageMeta } from '../lib/seo'

export default function Home() {
  usePageMeta(
    'Rothian | Empowering Business — Technology Consultancy',
    'Fresh ideas and agile solutions. Rothian delivers strategy, design, development, delivery and operations through Application, Cloud, Cyber, Data and Digital capabilities.',
  )

  return (
    <>
      <Hero />
      <ClientsMarquee />
      <LifecycleShowcase />
      <CapabilitiesGrid />
      <WhoWeAre />
      <SolutionsStrip />
      <NetworkSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
