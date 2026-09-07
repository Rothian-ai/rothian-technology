import { ArrowRight, Fingerprint, Radar, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThreatStats } from '../components/home/ThreatStats'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { PILLARS } from '../data/services'
import { usePageMeta } from '../lib/seo'

const ZERO_TRUST = [
  {
    icon: Fingerprint,
    title: 'Verify everything',
    body: 'Meticulous verification of every user and device accessing your network, regardless of location — the Zero-Trust Framework in action.',
  },
  {
    icon: Radar,
    title: 'Watch everywhere',
    body: 'Around-the-clock monitoring across hybrid and remote work environments — today’s dynamic, decentralized workplaces demand it.',
  },
  {
    icon: ShieldCheck,
    title: 'Protect everyone',
    body: 'A robust defense that wraps your data and applications, mitigating information-stealing malware whatever industry you work in.',
  },
]

const PILLAR_ICON_LABEL: Record<string, string> = {
  discover: 'Assess your posture',
  adapt: '24/7 managed protection',
  evolve: 'Minimize time to resolve',
}

export default function WhatWeDo() {
  usePageMeta(
    'What We Do | Rothian Cyber — Comprehensive Cybersecurity',
    'We safeguard organizations from cyber threats around the clock, with a Zero-Trust framework built for hybrid and remote work.',
  )

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="We safeguard organizations around the clock"
        highlight={['safeguard']}
        description="Comprehensive security for organizations operating in hybrid and remote work setups. By implementing the Zero-Trust Framework, every user and device is verified — establishing a robust defense in today's dynamic, decentralized work environments."
        image="/cyber/images/robot-vault.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Get Started
        </Button>
      </PageHero>

      {/* Zero-trust triptych */}
      <section className="bg-abyss-950 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Zero-Trust Framework"
            title="Trust nothing. Verify everything."
            highlight={['Verify']}
            className="mb-16"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {ZERO_TRUST.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.1}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ThreatStats />

      {/* Ecosystem */}
      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Ecosystem"
            title="One ecosystem, three movements"
            highlight={['ecosystem,']}
            description="Rothian Cyber's services are organized into three key movements. Discover comprehends your current posture. Adapt protects with our 24/7 managed detection and response. Evolve empowers your defenses to keep reducing time to resolve."
            className="mb-16"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 0.12} className="h-full">
                <Link
                  to={`/cyber/services/${pillar.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-abyss-800 p-9 transition-colors hover:border-brand-violet/50"
                >
                  <p className="eyebrow text-brand-cyan">{PILLAR_ICON_LABEL[pillar.slug]}</p>
                  <h3 className="mt-5 heading-section text-3xl text-white">{pillar.name}</h3>
                  <p className="mt-2 font-display font-semibold text-white/80">{pillar.outcome}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
                    {pillar.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-white/85 transition-colors group-hover:text-brand-cyan">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
