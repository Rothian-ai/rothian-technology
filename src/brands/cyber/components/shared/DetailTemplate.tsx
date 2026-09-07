import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Metaphor } from '../../data/services'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { CtaBand } from './CtaBand'
import { NatureCallout } from './NatureCallout'
import { PageHero } from './PageHero'

export interface DetailData {
  eyebrow: string
  title: string
  intro: string
  heroImage: string
  heroMetaphor?: Metaphor
  valueProps: { title: string; body: string }[]
  features: { metaphor: Metaphor; items: string[] }
  benefits: { metaphor: Metaphor; items: string[] }
  ctaLabel?: string
}

/**
 * Shared detail-page template for services and solutions: cinematic hero,
 * value props, features and benefits each paired with their "Secure by
 * Nature" metaphor, then a closing CTA.
 */
export function DetailTemplate({ data, children }: { data: DetailData; children?: ReactNode }) {
  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.intro}
        image={data.heroImage}
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          {data.ctaLabel ?? 'Get a Quote'}
        </Button>
        <Button to="/cyber/services" size="lg" variant="outline">
          All Services
        </Button>
      </PageHero>

      {/* Hero metaphor + value props */}
      <section className="bg-abyss-950 py-24 sm:py-32">
        <div className="container-site">
          {data.heroMetaphor && (
            <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
              <NatureCallout metaphor={data.heroMetaphor} />
              <SectionHeading
                eyebrow="How We Engage"
                title="On your terms, at your pace"
                highlight={['your']}
                description="Three commitments underpin every engagement — flexibility in how we work, simplicity in what you manage, and freedom from lock-in."
              />
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {data.valueProps.map((prop, i) => (
              <Reveal
                key={prop.title}
                delay={i * 0.1}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="font-display text-sm font-semibold tracking-widest text-brand-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{prop.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{prop.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-abyss-900 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Features" title="What's inside" highlight={['inside']} />
            <NatureCallout metaphor={data.features.metaphor} className="mt-10" />
          </div>
          <Reveal delay={0.15}>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {data.features.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-white/10 py-5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="leading-snug text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-abyss-950 py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal delay={0.15} className="order-2 lg:order-1">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {data.benefits.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-white/10 py-5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-brand-cyan/50 text-brand-cyan">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="leading-snug text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Benefits" title="What you gain" highlight={['gain']} />
            <NatureCallout metaphor={data.benefits.metaphor} className="mt-10" />
          </div>
        </div>
      </section>

      {children}

      <CtaBand />
    </>
  )
}
