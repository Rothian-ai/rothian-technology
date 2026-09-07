import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { ServiceCard } from '../components/shared/ServiceCard'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { NatureCallout } from '../components/shared/NatureCallout'
import { PILLARS, servicesByPillar } from '../data/services'
import { usePageMeta } from '../lib/seo'

export default function Services() {
  usePageMeta(
    'Cybersecurity Services | Rothian Cyber — Discover, Adapt, Evolve',
    'CISOaaS, DevSecOps, penetration testing, SOC, managed security and more — cutting-edge cybersecurity services tailored to safeguard your digital infrastructure.',
  )

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Cybersecurity that moves like nature"
        highlight={['nature']}
        description="A comprehensive suite of services designed to fortify your organization against evolving cyber threats — organized into three movements: Discover, Adapt, Evolve."
        image="/cyber/images/holo-terminal.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Get a Quote
        </Button>
      </PageHero>

      {PILLARS.map((pillar, pi) => {
        const services = servicesByPillar(pillar.slug)
        return (
          <section
            key={pillar.slug}
            className={`py-24 sm:py-28 ${pi % 2 ? 'bg-abyss-900 bg-cyber-grid' : 'bg-abyss-950'}`}
          >
            <div className="container-site">
              <div className="mb-14 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
                <SectionHeading
                  eyebrow={`0${pi + 1} — ${pillar.outcome}`}
                  title={pillar.name}
                  description={pillar.description}
                />
                <NatureCallout metaphor={pillar.metaphor} />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <ServiceCard key={service.slug} service={service} delay={i * 0.08} />
                ))}
              </div>
              <Reveal delay={0.2} className="mt-10">
                <Button to={`/cyber/services/${pillar.slug}`} variant="outline" withArrow>
                  Explore {pillar.name}
                </Button>
              </Reveal>
            </div>
          </section>
        )
      })}

      <CtaBand />
    </>
  )
}
