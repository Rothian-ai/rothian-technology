import { CheckCircle2 } from 'lucide-react'
import { ENGAGEMENT_MODELS } from '../../data/faqs'
import { STATS } from '../../data/clients'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const PRINCIPLES = [
  'Agility over scale',
  'Capability over resources',
  'Outcomes over timesheets',
  'Fresh ideas over conventional methodologies',
]

/** Positioning statement, animated stats and the three engagement models. */
export function WhoWeAre() {
  return (
    <section className="bg-paper-cool py-24 sm:py-32">
      <div className="container-site">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Big-consultancy capability. None of the drag."
              highlight={['capability.']}
              description="Tired of conventional methodologies used by large consulting firms? Rothian applies Digital, Data, Technology and Cyber capabilities through a senior, human-scale team — so decisions get made in days, not steering committees."
            />
            <Reveal delay={0.2} className="mt-9">
              <ul className="grid gap-3.5">
                {PRINCIPLES.map((principle) => (
                  <li key={principle} className="flex items-center gap-3 text-ink-900/75">
                    <CheckCircle2 className="size-5 shrink-0 text-brand-red" aria-hidden />
                    <span className="font-medium">{principle}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <CountUp
                      to={stat.to}
                      suffix={'suffix' in stat ? stat.suffix : ''}
                      prefix={'prefix' in stat ? stat.prefix : ''}
                      className="text-gradient"
                    />
                  </p>
                  <p className="mt-2 text-sm text-ink-900/60">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Engagement models — a key conversion lever from the live site */}
          <div className="flex flex-col gap-5">
            <Reveal as="p" className="eyebrow text-brand-crimson">
              {'// '}Ways of working
            </Reveal>
            {ENGAGEMENT_MODELS.map((model, i) => (
              <Reveal key={model.title} delay={0.12 + i * 0.1}>
                <article className="group rounded-3xl border border-ink-900/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                      <model.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink-900">{model.title}</h3>
                      <p className="mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-900/45">
                        {model.bestFor}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-900/60">{model.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
