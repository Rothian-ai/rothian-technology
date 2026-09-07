import type { ElementType } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GROUP_NETWORK } from '../../lib/nav'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** The Rothian Group — sibling specialist companies, one recognisable family. */
export function NetworkSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="The Rothian Group"
          title="One group. Four specialist companies."
          highlight={['One', 'group.']}
          description="Rothian Technology is the engineering heart of a wider group. When your programme needs deep specialism — marketing, security, data or apps — the right sister company is already in the room."
          align="center"
          className="mb-16"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GROUP_NETWORK.map((company, i) => {
            // Digital, Cyber and Data are sections of this site; Apps is still
            // a separate property.
            const internal = company.href.startsWith('/')
            const Tag: ElementType = internal ? Link : 'a'
            const linkProps: Record<string, unknown> = internal
              ? { to: company.href }
              : { href: company.href, target: '_blank', rel: 'noreferrer' }

            return (
            <Reveal key={company.name} delay={i * 0.08}>
              <Tag
                {...linkProps}
                className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-navy/10"
              >
                <div className="flex h-10 items-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                    className="max-h-8 w-auto max-w-[9.5rem] object-contain"
                    height={32}
                  />
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-900/60">{company.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-crimson">
                  Visit site
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </Tag>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
