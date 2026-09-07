import { Navigate, useParams } from 'react-router-dom'
import { DetailTemplate } from '../components/shared/DetailTemplate'
import { ServiceCard } from '../components/shared/ServiceCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getPillar, getService, SERVICES } from '../data/services'
import { usePageMeta } from '../lib/seo'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug ?? '')

  usePageMeta(
    service ? `${service.title} | Rothian Cyber` : 'Services | Rothian Cyber',
    service?.tagline,
  )

  if (!service) return <Navigate to="/cyber/services" replace />

  const pillar = getPillar(service.pillar)!
  const related = SERVICES.filter((s) => s.slug !== service.slug)
    .sort((a, b) => Number(b.pillar === service.pillar) - Number(a.pillar === service.pillar))
    .slice(0, 3)

  return (
    <DetailTemplate
      data={{
        eyebrow: `${pillar.name} — ${pillar.outcome}`,
        title: service.title,
        intro: service.intro,
        heroImage: service.heroImage,
        heroMetaphor: service.heroMetaphor,
        valueProps: service.valueProps,
        features: service.features,
        benefits: service.benefits,
      }}
    >
      {/* Explore more services */}
      <section className="bg-abyss-900 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore More"
            title="More ways we can help"
            highlight={['help']}
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </DetailTemplate>
  )
}
