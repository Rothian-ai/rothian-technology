import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CAPABILITIES } from '../data/capabilities'
import { usePageMeta } from '../lib/seo'

export default function Capabilities() {
  usePageMeta(
    'Capabilities | Rothian Cyber — Access Control, Security Testing & More',
    'Explore our cybersecurity capabilities: access control, rights management, security testing, SAST, DAST and OWASP-aligned assessments.',
  )

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Deep capability, across the whole estate"
        highlight={['capability,']}
        description="From access control to source-code analysis — the technical depth behind every Rothian Cyber engagement."
        image="/cyber/images/capabilities-bg.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Discuss Your Needs
        </Button>
      </PageHero>

      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="What We're Built On"
            title="Nine disciplines, one defense"
            highlight={['one']}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={(i % 3) * 0.08}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-brand-cyan/40"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan transition-colors group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent">
                  <cap.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{cap.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Put these capabilities to work"
        body="Tell us about your environment and we'll map the right capabilities to your risks — with a clear plan and no lock-in."
      />
    </>
  )
}
