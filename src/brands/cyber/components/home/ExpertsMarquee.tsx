import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EXPERTS } from '../../data/experts'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Expert personas drifting past in a marquee — a taste of the Our Experts page. */
export function ExpertsMarquee() {
  return (
    <section className="overflow-hidden bg-abyss-950 py-24 sm:py-32">
      <div className="container-site mb-14 flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Our Experts"
          title="Guardians of digital fortresses"
          highlight={['fortresses']}
          description="Consultants, vCISOs, strategists, specialists and analysts — each with a counterpart in the natural world."
        />
        <Reveal delay={0.2}>
          <Link
            to="/cyber/about/experts"
            className="group inline-flex items-center gap-2 font-display font-semibold text-white transition-colors hover:text-brand-cyan"
          >
            Meet the experts
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <Reveal variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>
        <Marquee>
          {EXPERTS.map((expert) => (
            <Link
              key={expert.role}
              to="/cyber/about/experts"
              className="group mx-3 flex w-80 shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand-violet/50"
            >
              <p className="eyebrow text-brand-cyan">{expert.metaphor}</p>
              <h3 className="mt-3 font-display text-xl font-bold text-white">{expert.role}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                {expert.metaphorWhy}
              </p>
            </Link>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
