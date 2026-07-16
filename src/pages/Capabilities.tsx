import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CAPABILITIES } from '../data/capabilities'
import { usePageMeta } from '../lib/seo'

export default function Capabilities() {
  usePageMeta(
    'Capabilities | Rothian — Application, Cloud, Cyber, Data, Digital',
    'Five deep capability practices behind every Rothian engagement: Application, Cloud, Cyber, Data and Digital.',
  )

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Deep specialisms, applied together"
        highlight={['together']}
        description="We deliver services and solutions by applying our Application, Cloud, Cyber, Data and Digital capabilities — five practices, one team."
      >
        <Button to="/contact" size="lg" withArrow>
          Talk to a Specialist
        </Button>
      </PageHero>

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site flex flex-col gap-16 sm:gap-20">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className="eyebrow mb-5 text-brand-crimson">
                  {'// '}Capability {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="heading-section text-3xl text-ink-900 sm:text-4xl lg:text-5xl">
                  {cap.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-900/65">{cap.intro}</p>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${cap.title} technologies`}>
                  {cap.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-ink-900/55"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/capabilities/${cap.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 font-display font-semibold text-brand-crimson"
                >
                  Explore {cap.title}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>

              {/* Item panel */}
              <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 p-8 shadow-2xl shadow-ink-950/20 sm:p-10">
                <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
                <cap.accentIcon
                  className="absolute -right-8 -top-8 size-44 text-white/[0.04]"
                  aria-hidden
                />
                <ul className="relative grid gap-2.5 sm:grid-cols-2">
                  {cap.items.slice(0, 6).map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                    >
                      <item.icon className="size-4 shrink-0 text-brand-coral" aria-hidden />
                      <span className="text-sm font-medium text-white/80">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-cool py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Where they land"
            title="Capabilities power services"
            description="Every capability is applied through our five lifecycle services — strategy through operations."
            align="center"
            className="mb-10"
          />
          <Reveal className="text-center">
            <Button to="/services" withArrow>
              See the Services
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
