import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SplitText } from '../components/ui/SplitText'
import { EXPERTS } from '../data/experts'
import { usePageMeta } from '../lib/seo'

export default function Experts() {
  usePageMeta(
    'Our Experts | Rothian Cyber — Guardians of Digital Fortresses',
    'Security consultants, vCISOs, strategy experts, L2/L3 specialists and SOC analysts — each with a counterpart in the natural world.',
  )

  return (
    <>
      <PageHero
        eyebrow="Our Experts"
        title="Guardians of digital fortresses"
        highlight={['fortresses']}
        description="Rothian Cyber experts fortify your digital realm with cutting-edge solutions, ensuring resilient security for a cyber-ready future. Each role has a counterpart in nature — because the best defenses were invented long before computers."
        image="/cyber/images/analyst-silhouette.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Work With Our Experts
        </Button>
      </PageHero>

      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site flex flex-col gap-20 sm:gap-28">
          {EXPERTS.map((expert, i) => (
            <article
              key={expert.role}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Metaphor panel */}
              <Reveal
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 40 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-abyss-800 p-10 sm:p-14"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-violet/20 blur-3xl"
                />
                <p className="eyebrow text-brand-cyan">Secure by Nature</p>
                <p className="heading-display mt-6 text-5xl text-white sm:text-6xl">
                  {expert.metaphor}
                </p>
                <p className="mt-6 max-w-md leading-relaxed text-white/60">{expert.metaphorWhy}</p>
              </Reveal>

              {/* Role description */}
              <div>
                <Reveal as="p" className="font-display text-sm font-semibold tracking-widest text-white/35">
                  {String(i + 1).padStart(2, '0')}
                </Reveal>
                <SplitText
                  text={expert.role}
                  as="h2"
                  className="heading-section mt-4 text-3xl text-white sm:text-4xl"
                />
                <Reveal as="p" delay={0.15} className="mt-6 max-w-xl leading-relaxed text-white/60">
                  {expert.description}
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Put our guardians to work"
        body="From fractional CISOs to 24/7 SOC analysts — assemble the security team your business needs, without the overhead."
      />
    </>
  )
}
