import { ExpertsMarquee } from '../components/home/ExpertsMarquee'
import { FaqSection } from '../components/home/FaqSection'
import { Hero } from '../components/home/Hero'
import { IncidentBand } from '../components/home/IncidentBand'
import { PillarsShowcase } from '../components/home/PillarsShowcase'
import { ThreatStats } from '../components/home/ThreatStats'
import { WhyUs } from '../components/home/WhyUs'
import { CtaBand } from '../components/shared/CtaBand'
import { InsightsSection } from '../components/shared/InsightsSection'
import { usePageMeta } from '../lib/seo'

export default function Home() {
  usePageMeta(
    'Rothian Cyber | Secure by Nature — Cybersecurity Excellence in the UK and UAE',
    'Cybersecurity inspired by natural defenses: penetration testing, SOC, managed security, DevSecOps and CISOaaS. Discover. Adapt. Evolve.',
  )

  return (
    <>
      <Hero />
      <IncidentBand />
      <PillarsShowcase />
      <ThreatStats />
      <WhyUs />
      <ExpertsMarquee />
      <FaqSection />
      <InsightsSection />
      <CtaBand />
    </>
  )
}
