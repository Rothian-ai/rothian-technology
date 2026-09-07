import { Compass, Hammer, PenTool, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePageMeta } from '../lib/seo'
import { PageHero } from '../components/PageHero'
import { AI_PRINCIPLES } from '../data/showcase'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

const METHOD_DETAIL = [
  {
    icon: Compass,
    step: 'Discover',
    body: 'We learn your business, your market and your customer before we recommend anything. Research, interviews, competitive and category analysis — plus AI-accelerated market signal so we cover more ground in less time.',
  },
  {
    icon: Target,
    step: 'Define',
    body: 'We turn what we found into a decision: the positioning, the audience, the message, the measure of success. Nothing gets designed against a moving target.',
  },
  {
    icon: PenTool,
    step: 'Design',
    body: 'Art direction first, then production. We lock the look, then use generative tooling to explore widely and produce at volume — while a human decides what is good enough to ship.',
  },
  {
    icon: Hammer,
    step: 'Develop',
    body: 'Build, launch, measure, iterate. Websites, apps, campaigns and content — engineered fast, made machine-readable, and improved on real data.',
  },
]

/**
 * NOTE FOR THE TEAM: the stack below is described by capability rather than by
 * vendor on purpose. Replace with your actual, contracted toolset before launch —
 * naming specific tools is a stronger trust signal, but only if it is accurate.
 */
const STACK = [
  { layer: 'Insight & research', detail: 'LLM-assisted market, audience and competitor analysis' },
  { layer: 'Image & design', detail: 'Generative image tooling under human art direction' },
  { layer: 'Video & motion', detail: 'Image-to-video generation, upscaling and grading' },
  { layer: 'Copy & content', detail: 'AI drafting with human editing and brand-voice control' },
  { layer: 'Campaigns', detail: 'Platform-native AI bidding, creative testing and agentic ads' },
  { layer: 'Visibility', detail: 'Schema, structured content and AEO/GEO tooling' },
]

export default function About() {
  usePageMeta(
    'About | Rothian Digital — how we use AI, honestly',
    'Discover, Define, Design, Develop. The team, the method and a straight account of how we work with AI — including where humans stay firmly in the loop.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'About', path: '/digital/about' },
    ]),
  ])

  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="AI-native, human-led"
        highlight={['human-led']}
        intro="We are the first AI-native digital marketing agency working across the UK and UAE — leading industry professionals plus state-of-the-art tooling, pointed at one thing: reimagining your business."
      />

      {/* Positioning */}
      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Our position" title="Big-agency craft, without the drag" dark />
          <div className="flex flex-col gap-6">
            <Reveal as="p" className="font-display text-xl leading-relaxed text-white/85 sm:text-2xl">
              Everyone says they're different. We mean it: no upfront costs, no bs, and no long
              discovery phase billed by the hour before you see anything.
            </Reveal>
            <Reveal as="p" delay={0.1} className="leading-relaxed text-white/60">
              We treat your business as our own and give it the makeover it deserves for the digital
              world. Our creative expertise takes off from where others left — and because AI does the
              heavy lifting on production, more of your budget goes into thinking and less into
              grinding.
            </Reveal>
            <Reveal as="p" delay={0.15} className="leading-relaxed text-white/60">
              We seamlessly integrate web, mobile, brand and digital marketing under one roof, so
              nothing falls between agencies. One team, one journey, one accountable partner.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-ink-900 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our method"
            title="Discover. Define. Design. Develop."
            description="The same four moves behind every engagement, whether it's a brand, a website or a campaign."
            dark
            className="mb-16 max-w-3xl"
          />
          <ol className="grid gap-5 lg:grid-cols-4">
            {METHOD_DETAIL.map((m, i) => (
              <Reveal
                as="li"
                key={m.step}
                delay={i * 0.08}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-festival-gradient text-white">
                  <m.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-white">{m.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{m.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* AI stack transparency */}
      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="How we use AI"
            title="Our stack, in the open"
            highlight={['open']}
            description="“AI-native” is easy to claim, so here is what it actually means in our workflow — and where a person is always accountable."
            dark
            className="mb-16 max-w-3xl"
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Reveal>
              <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                {STACK.map((s) => (
                  <li key={s.layer} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="w-44 shrink-0 font-display text-sm font-bold text-white">
                      {s.layer}
                    </span>
                    <span className="text-sm text-white/55">{s.detail}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="font-display text-lg font-bold text-white">What we promise</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {AI_PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-festival-gradient"
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/digital/showcase"
                className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-white underline decoration-festival-orange decoration-2 underline-offset-8 transition-colors hover:text-festival-yellow focus-brand"
              >
                See the work it produces
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
