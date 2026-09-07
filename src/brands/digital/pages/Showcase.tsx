import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePageMeta } from '../lib/seo'
import { ShowcaseGallery } from '../components/ShowcaseGallery'
import { PageHero } from '../components/PageHero'
import { AI_PRINCIPLES, AI_PROCESS } from '../data/showcase'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

export default function Showcase() {
  usePageMeta(
    'Creative Showcase | Rothian Digital — generative work with taste',
    'Generative AI design and motion, with the brief behind every asset. Human art direction, AI velocity — and an honest account of how we work with AI.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Creative Showcase', path: '/digital/showcase' },
    ]),
  ])

  return (
    <>
      <PageHero
        eyebrow="Creative showcase"
        title="Generative work that still has taste"
        highlight={['taste']}
        intro="Anyone can generate an image. The difference is knowing which one deserves to represent your brand. Every piece here shows the brief that started it and the human call that finished it."
      />

      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-site">
          {/*
            Filters are off while every piece sits in its own discipline — a filter
            chip that returns a single card reads as broken. Re-enable with
            `showFilters` once there are several assets per category.
          */}
          <ShowcaseGallery showFilters={false} />
        </div>
      </section>

      {/* How we work with AI */}
      <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl animate-drift"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.5), rgba(238,135,34,0.4) 55%, transparent 75%)',
          }}
        />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="How we work with AI"
            title="The machine generates. We decide."
            highlight={['decide.']}
            description="Half the web is now AI slop. The reason ours isn't is that generation is the cheapest part of our process — judgement is the expensive part, and we don't skip it."
            dark
            className="mb-16 max-w-3xl"
          />

          <ol className="grid gap-5 lg:grid-cols-4">
            {AI_PROCESS.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 0.08}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <span className="eyebrow text-festival-yellow">{step.step}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2} className="mt-12 rounded-3xl border border-white/10 bg-ink-950/60 p-8 sm:p-10">
            <h3 className="mb-6 flex items-center gap-3 font-display text-lg font-bold text-white">
              <ShieldCheck className="size-5 text-festival-cyan" aria-hidden />
              Our commitments
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {AI_PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-festival-gradient" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 text-center">
            <Link
              to="/digital/contact"
              className="inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform hover:scale-[1.03] focus-brand"
            >
              Brief us on something
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
