import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import { EASE } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Sticky-stacked lifecycle cards: the five service phases pin below the
 * header while the next slides over — the family's signature scroll deck,
 * retold as Technology's delivery lifecycle.
 */
export function LifecycleShowcase() {
  return (
    <section id="services" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="What We Do"
          title="One lifecycle. Five services. Zero handoffs."
          highlight={['lifecycle.']}
          description="From the first requirements workshop to round-the-clock operations, the same team carries your service through every phase — Design. Develop. Deliver. Operate."
          dark
          className="mb-16 sm:mb-20"
        />

        <div className="flex flex-col gap-8">
          {SERVICES.map((service, i) => (
            <div key={service.slug} className="sticky" style={{ top: `${96 + i * 14}px` }}>
              <motion.article
                initial={{ y: 90 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="group grid overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/40 lg:min-h-[26rem] lg:grid-cols-2"
              >
                {/* Text */}
                <div className="relative flex flex-col justify-between gap-10 p-8 sm:p-12">
                  <div>
                    <div className="mb-8 flex items-center gap-4">
                      <span className="font-mono text-sm font-semibold tracking-widest text-brand-coral">
                        PHASE {service.phase}
                      </span>
                      <span className="h-px flex-1 bg-white/10" aria-hidden />
                    </div>
                    <h3 className="heading-section text-3xl text-white sm:text-4xl lg:text-[2.6rem]">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-md leading-relaxed text-white/60">{service.tagline}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      to={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-2 font-display font-semibold text-white transition-colors hover:text-brand-coral"
                    >
                      Explore {service.title}
                      <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" aria-hidden />
                    </Link>
                    <Link
                      to={`/contact?interest=${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.04]"
                    >
                      Discuss This Phase
                    </Link>
                  </div>
                </div>

                {/* Sub-service panel — engineered look instead of stock imagery */}
                <div className="relative min-h-64 overflow-hidden border-t border-white/10 bg-ink-900 lg:min-h-0 lg:border-l lg:border-t-0">
                  <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[11rem] font-extrabold leading-none tracking-tighter text-white/[0.04] transition-colors duration-700 group-hover:text-brand-coral/[0.07]"
                  >
                    {service.phase}
                  </span>
                  <ul className="relative grid content-center gap-2.5 p-8 sm:p-12 lg:h-full">
                    {service.subServices.slice(0, 5).map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          to={`/services/${sub.slug}`}
                          className="group/chip flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-brand-coral/40 hover:bg-white/[0.08]"
                        >
                          <sub.icon className="size-4 shrink-0 text-brand-coral" aria-hidden />
                          <span className="text-sm font-medium text-white/80 group-hover/chip:text-white">{sub.name}</span>
                          <ArrowRight className="ml-auto size-3.5 text-white/25 transition-all group-hover/chip:translate-x-0.5 group-hover/chip:text-brand-coral" aria-hidden />
                        </Link>
                      </li>
                    ))}
                    {service.subServices.length > 5 && (
                      <li>
                        <Link
                          to={`/services/${service.slug}`}
                          className="block px-4 pt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-brand-coral"
                        >
                          +{service.subServices.length - 5} more services →
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
