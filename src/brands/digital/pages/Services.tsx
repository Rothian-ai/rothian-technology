import { Bot, Link2, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePageMeta } from '../lib/seo'
import { JourneyTimeline } from '../components/JourneyTimeline'
import { PageHero } from '../components/PageHero'
import { JOURNEY } from '../data/journey'
import { breadcrumbs, ORGANIZATION, serviceSchema, useJsonLd } from '../lib/schema'

const AI_PILLARS = [
  {
    icon: Search,
    title: 'Found by people and machines',
    body: 'SEO gets you ranked. AEO and GEO get you cited inside ChatGPT, Perplexity, Gemini, AI Overviews and Copilot. When roughly two-thirds of searches end without a click, being the answer matters as much as the ranking.',
  },
  {
    icon: Link2,
    title: 'Machine-readable by default',
    body: 'Structured data, schema and llms.txt so agentic browsers and AI assistants can read, understand and transact with your site — not just render it.',
  },
  {
    icon: Bot,
    title: 'Agents that actually sell',
    body: 'Chat, WhatsApp and voice agents wired into your funnel, so a conversation can become a conversion without a human waiting on the other end.',
  },
]

export default function Services() {
  usePageMeta(
    'Services | Rothian Digital — strategy, brand, growth and AI visibility',
    'Four stages, one growth engine: Start with Strategy, Build Your Brand, Grow Your Audience, Optimize & Scale. AI-native services across the UK and UAE.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Services', path: '/digital/services' },
    ]),
    ...JOURNEY.flatMap((stage) =>
      stage.services.map((s) => serviceSchema(s.name, s.description)),
    ),
  ])

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Four stages. One growth engine."
        highlight={['engine.']}
        intro="Start with Strategy, Build Your Brand, Grow Your Audience, Optimize & Scale. We help at every stage — building not just assets, but a machine for brand growth."
      >
        <Link
          to="/digital/contact"
          className="inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform hover:scale-[1.03] focus-brand"
        >
          Book a discovery call
        </Link>
        <Link
          to="/digital/work"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 font-display font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 focus-brand"
        >
          See the proof
        </Link>
      </PageHero>

      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="container-site">
          <JourneyTimeline />
        </div>
      </section>

      {/* AI visibility — the modernized headline service */}
      <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(34,211,238,0.5), rgba(124,58,237,0.4) 55%, transparent 78%)',
          }}
        />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Why now"
            title="Search changed. Most agencies haven't."
            highlight={["haven't."]}
            description="Your next customer may never see a list of links. We build for the era where an AI answers on your behalf — and we make sure it answers with you."
            dark
            className="mb-16 max-w-3xl"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {AI_PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 0.1}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-festival-gradient text-white">
                  <pillar.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{pillar.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 rounded-3xl border border-festival-yellow/25 bg-festival-yellow/5 p-8">
            <p className="flex items-start gap-3 text-white/75">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-festival-yellow" aria-hidden />
              <span>
                <strong className="font-semibold text-white">This site is the proof.</strong> It ships
                structured data, clean semantics and an llms.txt so both people and AI engines can
                read it. We build yours the same way.
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
