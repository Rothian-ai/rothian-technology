import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PILLARS, servicesByPillar } from '../../data/services'
import { EASE } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'

const PILLAR_IMAGES: Record<string, string> = {
  discover: '/cyber/images/services/penetration-testing.jpg',
  adapt: '/cyber/images/services/soc.jpg',
  evolve: '/cyber/images/services/red-blue-team.jpg',
}

/**
 * Sticky-stacked pillar cards: Discover / Adapt / Evolve pin below the
 * header while the next slides over — the Rothian scroll-storytelling pattern.
 */
export function PillarsShowcase() {
  return (
    <section id="pillars" className="relative bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="What We Do"
          title="Discover. Adapt. Evolve."
          highlight={['Adapt.']}
          description="Our cybersecurity ecosystem in three movements — understand your posture, stop threats in real time, and stay ahead of whatever comes next."
          className="mb-16 sm:mb-20"
        />

        <div className="flex flex-col gap-8">
          {PILLARS.map((pillar, i) => {
            const services = servicesByPillar(pillar.slug)
            return (
              <div key={pillar.slug} className="sticky" style={{ top: `${96 + i * 14}px` }}>
                <motion.article
                  initial={{ y: 90 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="group grid overflow-hidden rounded-3xl border border-white/10 bg-abyss-800 shadow-2xl shadow-black/40 lg:min-h-[26rem] lg:grid-cols-2"
                >
                  {/* Text */}
                  <div className="relative flex flex-col justify-between gap-10 p-8 sm:p-12">
                    <div>
                      <div className="mb-8 flex items-center justify-between">
                        <span className="font-display text-sm font-semibold tracking-widest text-white/35">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-cyan">
                          {pillar.outcome}
                        </span>
                      </div>
                      <h3 className="heading-section text-3xl text-white sm:text-4xl lg:text-[2.6rem]">
                        {pillar.name}
                      </h3>
                      <p className="mt-5 max-w-md leading-relaxed text-white/60">
                        {pillar.description}
                      </p>
                      <ul className="mt-7 flex flex-wrap gap-2">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/cyber/services/${s.pillar}/${s.slug}`}
                              className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-brand-cyan/60 hover:text-brand-cyan"
                            >
                              {s.shortTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <Link
                        to={`/cyber/services/${pillar.slug}`}
                        className="group/link inline-flex items-center gap-2 font-display font-semibold text-white transition-colors hover:text-brand-cyan"
                      >
                        Explore {pillar.name}
                        <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" aria-hidden />
                      </Link>
                      <Link
                        to={`/cyber/contact?pillar=${pillar.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.04]"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative min-h-64 overflow-hidden lg:min-h-0">
                    <img
                      src={PILLAR_IMAGES[pillar.slug]}
                      alt={pillar.name}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-abyss-800/60 via-transparent to-transparent" aria-hidden />
                  </div>
                </motion.article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
