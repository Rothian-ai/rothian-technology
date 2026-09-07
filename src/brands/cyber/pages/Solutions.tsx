import { ArrowRight, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SOLUTIONS } from '../data/solutions'
import { usePageMeta } from '../lib/seo'

export default function Solutions() {
  usePageMeta(
    'Cybersecurity Solutions | Rothian Cyber',
    'State-of-the-art cybersecurity solutions crafted to secure your digital infrastructure — SOC as a Service, CISO services and partner solutions.',
  )

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions that neutralize the threat"
        highlight={['neutralize']}
        description="As businesses embrace the cloud, collaboration grows — and so does risk from unmanaged devices. Our solutions actively envelop your data and applications, neutralizing information-stealing malware across all industries."
        image="/cyber/images/robot-vault.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Talk to Us
        </Button>
      </PageHero>

      {/* SOC + CISO flagship solutions */}
      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Flagship Solutions"
            title="Security leadership and operations, as a service"
            highlight={['service']}
            className="mb-16"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {SOLUTIONS.map((solution, i) => (
              <Reveal key={solution.slug} delay={i * 0.12} className="h-full">
                <Link
                  to={`/cyber/solutions/${solution.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-abyss-800 transition-colors hover:border-brand-violet/50"
                >
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <img
                      src={solution.cardImage}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss-800 via-abyss-800/20 to-transparent" aria-hidden />
                  </div>
                  <div className="flex flex-1 flex-col p-9">
                    <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-brand-cyan">
                      {solution.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-white/55">{solution.tagline}</p>
                    <span className="mt-7 inline-flex items-center gap-2 font-display text-sm font-semibold text-white/85">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Partner solutions */}
          <Reveal delay={0.2} className="mt-6">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-9 sm:flex-row sm:items-center">
              <div className="flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan">
                  <Handshake className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Partner Solutions</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-white/55">
                    Collaborate with us for cutting-edge cybersecurity. Our partners benefit from
                    innovative designs ensuring secure data — with a focus on confidentiality,
                    integrity and availability.
                  </p>
                </div>
              </div>
              <Button to="/cyber/contact?topic=partnership" withArrow className="shrink-0">
                Become a Partner
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
