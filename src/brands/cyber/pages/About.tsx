import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TEAMS, VALUES } from '../data/experts'
import { usePageMeta } from '../lib/seo'

export default function About() {
  usePageMeta(
    'About Us | Rothian Cyber — Redefining Cybersecurity',
    'We redefine cybersecurity with expert data architecture, DevSecOps and advanced threat detection. Your data’s confidentiality, integrity and availability are our top priorities.',
  )

  return (
    <>
      <PageHero
        eyebrow="About Rothian Cyber"
        title="Redefining cybersecurity, naturally"
        highlight={['naturally']}
        description="We redefine cybersecurity with expert data architecture, DevSecOps and advanced threat detection. Your data's confidentiality, integrity and availability are our top priorities — partner with us for a resilient, tailored cybersecurity strategy."
        image="/cyber/images/chameleon.jpg"
      >
        <Button to="/cyber/contact" size="lg" withArrow>
          Partner With Us
        </Button>
        <Button to="/cyber/about/experts" size="lg" variant="outline">
          Meet Our Experts
        </Button>
      </PageHero>

      {/* Pufferfish brand statement */}
      <section className="relative overflow-hidden bg-abyss-950 py-24 sm:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 40 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="relative order-2 lg:order-1"
          >
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-15 blur-2xl"
            />
            <img
              src="/cyber/images/hero-poster.jpg"
              alt="The Secure by Nature brand world"
              loading="lazy"
              className="relative w-full rounded-3xl object-cover shadow-2xl shadow-black/40"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Secure by Nature"
              title="Pufferfish: friendly when you reach out. Hardened when it matters."
              highlight={['Pufferfish:']}
              description="Nature perfected defense over millions of years — camouflage, armor, early warning, coordinated response. Our whole practice is built on the same instincts: approachable partners who harden instantly when a threat appears."
            />
            <Reveal delay={0.25} className="mt-8">
              <p className="max-w-xl leading-relaxed text-white/60">
                Put simply, we build trust by setting expectations and delivering upon those
                expectations. We do away with unnecessary misconceptions and deception — everyone
                says it, but we mean it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-abyss-900 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Underpinning everything we do: our values"
            highlight={['values']}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 0.1}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="font-display text-sm font-semibold tracking-widest text-brand-cyan">
                  #{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Red / Blue / Purple teams */}
      <section className="bg-abyss-950 py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Our Teams"
              title="Safeguarding your digital future"
              highlight={['future']}
              description="Offense, defense and everything between — our subject-matter expert teams cover the full spectrum of cyber resilience."
            />
            <Reveal delay={0.2}>
              <Link
                to="/cyber/about/experts"
                className="group inline-flex items-center gap-2 font-display font-semibold text-white transition-colors hover:text-brand-cyan"
              >
                Our experts
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TEAMS.map((team, i) => (
              <Reveal key={team.name} delay={i * 0.12} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-abyss-800">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={team.image}
                      alt={team.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss-800 to-transparent" aria-hidden />
                    <h3 className="absolute bottom-5 left-7 font-display text-2xl font-bold text-white">
                      {team.name}
                    </h3>
                  </div>
                  <p className="flex-1 p-7 text-sm leading-relaxed text-white/55">
                    {team.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Choose us as your cyber partner"
        body="Allow us to safeguard your business — resilient, tailored cybersecurity built on honesty and integrity."
      />
    </>
  )
}
