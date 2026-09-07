import { Navigate, useParams } from 'react-router-dom'
import { DetailTemplate } from '../components/shared/DetailTemplate'
import { ServiceCard } from '../components/shared/ServiceCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getSolution } from '../data/solutions'
import { SERVICES } from '../data/services'
import { usePageMeta } from '../lib/seo'

export default function SolutionDetail() {
  const { slug } = useParams()
  const solution = getSolution(slug ?? '')

  usePageMeta(
    solution ? `${solution.title} | Rothian Cyber` : 'Solutions | Rothian Cyber',
    solution?.tagline,
  )

  if (!solution) return <Navigate to="/cyber/solutions" replace />

  const related = SERVICES.slice(0, 3)

  return (
    <DetailTemplate
      data={{
        eyebrow: 'Solutions',
        title: solution.title,
        intro: solution.intro,
        heroImage: solution.heroImage,
        heroMetaphor: solution.heroMetaphor,
        valueProps: solution.valueProps,
        features: solution.features,
        benefits: solution.benefits,
        ctaLabel: 'Talk to Us',
      }}
    >
      <section className="bg-abyss-900 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore More"
            title="Services that pair well"
            highlight={['pair']}
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
