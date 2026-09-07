import { Navigate, useParams } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { NatureCallout } from '../components/shared/NatureCallout'
import { PageHero } from '../components/shared/PageHero'
import { ServiceCard } from '../components/shared/ServiceCard'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getPillar, servicesByPillar, type PillarSlug } from '../data/services'
import { usePageMeta } from '../lib/seo'

const PILLAR_IMAGES: Record<PillarSlug, string> = {
  discover: '/cyber/images/services/penetration-testing.jpg',
  adapt: '/cyber/images/services/soc.jpg',
  evolve: '/cyber/images/services/red-blue-team.jpg',
}

export default function PillarPage() {
  const { pillar: pillarSlug } = useParams()
  const pillar = getPillar(pillarSlug ?? '')

  usePageMeta(
    pillar
      ? `${pillar.name} | Rothian Cyber Services`
      : 'Services | Rothian Cyber',
    pillar?.description,
  )

  if (!pillar) return <Navigate to="/cyber/services" replace />

  const services = servicesByPillar(pillar.slug)

  return (
    <>
      <PageHero
        eyebrow={`Services — ${pillar.outcome}`}
        title={pillar.name}
        description={pillar.description}
        image={PILLAR_IMAGES[pillar.slug]}
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Get a Quote
        </Button>
        <Button to="/cyber/services" size="lg" variant="outline">
          All Services
        </Button>
      </PageHero>

      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-14 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <SectionHeading
              eyebrow="What's Included"
              title={pillar.tagline}
            />
            <NatureCallout metaphor={pillar.metaphor} />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
