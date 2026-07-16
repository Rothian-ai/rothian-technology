import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CAPABILITIES } from '../../data/capabilities'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** The five capability practices as an interactive light-section grid. */
export function CapabilitiesGrid() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_100%)]" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Capabilities"
          title="Five practices behind every engagement"
          highlight={['Five', 'practices']}
          description="We deliver services and solutions by applying our Application, Cloud, Cyber, Data and Digital capabilities — deep specialisms, applied together."
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.slug}
              delay={i * 0.08}
              className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
            >
              <Link
                to={`/capabilities/${cap.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-crimson/25">
                    <cap.accentIcon className="size-5" aria-hidden />
                  </span>
                  <ArrowUpRight className="size-5 text-ink-900/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red" aria-hidden />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink-900 transition-colors group-hover:text-brand-crimson">
                  {cap.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/60">{cap.tagline}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${cap.title} technologies`}>
                  {cap.stack.slice(0, i < 2 ? 6 : 4).map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-ink-900/10 bg-paper px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-ink-900/55"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
