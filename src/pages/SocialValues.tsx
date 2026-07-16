import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SplitText } from '../components/ui/SplitText'
import { SOCIAL_VALUES } from '../data/values'
import { usePageMeta } from '../lib/seo'

export default function SocialValues() {
  usePageMeta(
    'Social Values | Rothian',
    'Rothian puts values ahead of commercial outcomes — integrating with communities, investing in staff and caring for the environment.',
  )

  return (
    <>
      <PageHero
        eyebrow="Social Values"
        title="Values ahead of commercial"
        highlight={['Values']}
        description="How we behave matters more than what we invoice. These are the commitments we hold ourselves to on every engagement — even when they cost us."
        compact
      />

      {/* Values */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we commit to"
            title="Four commitments, no small print"
            highlight={['Four', 'commitments,']}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {SOCIAL_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={(i % 2) * 0.1}>
                <article className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-9 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-navy/10">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="grid size-13 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-crimson/25">
                      <value.icon className="size-6" aria-hidden />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-ink-900/25">
                      V/{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">{value.title}</h2>
                  <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-crimson">
                    {value.statement}
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-900/65">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto band */}
      <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_30%,transparent_100%)]" aria-hidden />
        <div className="container-site relative text-center">
          <SplitText
            text="Earn respect through honesty and integrity — even when it means a poorer commercial outcome."
            highlight={['honesty', 'integrity']}
            as="h2"
            className="heading-section mx-auto max-w-4xl text-3xl text-white sm:text-5xl"
          />
          <Reveal as="p" delay={0.3} className="mx-auto mt-8 max-w-xl text-white/60">
            That line comes straight from how we run the company — not from a brand workshop.
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Work with a partner that keeps its word"
        body="If our values sound like yours, we should talk — about your project, your community, or both."
      />
    </>
  )
}
