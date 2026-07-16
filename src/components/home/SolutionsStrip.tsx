import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SOLUTIONS } from '../../data/solutions'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

/** Packaged solutions — dark strip of four productised offerings. */
export function SolutionsStrip() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[44rem] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(107,125,255,0.5), transparent 70%)',
        }}
      />
      <div className="container-site relative">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solutions"
            title="Productised, priced and ready to run"
            highlight={['ready']}
            description="When the problem is well understood, you shouldn't pay for discovery twice. Four packaged solutions with a fixed rhythm and a clear scope."
            dark
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button to="/solutions" variant="ghost" withArrow className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white">
              All Solutions
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SOLUTIONS.map((solution, i) => (
            <Reveal key={solution.slug} delay={i * 0.08}>
              <Link
                to={`/solutions#${solution.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-ink-800/80 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-coral/40 hover:bg-ink-800"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-brand-coral">
                    <solution.icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-white/30">
                    S/{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-brand-coral">
                  {solution.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-white/60">{solution.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
