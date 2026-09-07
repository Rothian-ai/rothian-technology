import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'
import { getPillar } from '../../data/services'
import { Reveal } from '../ui/Reveal'

interface ServiceCardProps {
  service: Service
  delay?: number
}

/** Image-topped service card used across the services hub and pillar pages. */
export function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const pillar = getPillar(service.pillar)
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/cyber/services/${service.pillar}/${service.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-abyss-800 transition-colors duration-300 hover:border-brand-violet/50"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={service.cardImage}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss-800 via-abyss-800/20 to-transparent" aria-hidden />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-abyss-950/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-cyan backdrop-blur-sm">
            {pillar?.name}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-brand-cyan">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{service.tagline}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-white/85">
            Learn more
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
