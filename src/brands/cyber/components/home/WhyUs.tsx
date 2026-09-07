import { Handshake, Leaf, ShieldCheck, Sprout } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const PROOFS = [
  {
    icon: ShieldCheck,
    title: 'We mean it',
    body: 'Everyone says it, but we mean it. No unnecessary misconceptions, no deception — we build trust by setting expectations and delivering on them.',
  },
  {
    icon: Sprout,
    title: 'Agility over scale',
    body: 'We revitalize outdated methodologies — replacing scale with agility, and raw resources with the capability to drive growth and sustainable security.',
  },
  {
    icon: Handshake,
    title: 'No lock-in, ever',
    body: 'Insource, cosource or outsource — keep your existing security investments and your freedom to choose. We put values ahead of commercial outcomes.',
  },
]

/**
 * "Why Choose Us" — the pufferfish brand statement with the firm's
 * philosophy, over the pufferfish photography from the brand library.
 */
export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-abyss-950 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Friendly when you reach out. Hardened when it matters."
            highlight={['Hardened']}
            description="Like the pufferfish, we're approachable until a threat appears. We understand how challenging the cyber landscape is to navigate — choose us as your cyber partner and let us safeguard your business."
          />
          <div className="mt-12 flex flex-col gap-8">
            {PROOFS.map((proof, i) => (
              <Reveal key={proof.title} delay={0.15 + i * 0.08} className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-cyan">
                  <proof.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{proof.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{proof.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

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
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-15 blur-2xl"
          />
          <img
            src="/cyber/images/pufferfish.jpg"
            alt="A porcupinefish drifting over a reef — the Secure by Nature brand world"
            loading="lazy"
            className="relative w-full rounded-3xl object-cover shadow-2xl shadow-black/40"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-b-3xl bg-gradient-to-t from-abyss-950/90 to-transparent p-7">
            <Leaf className="size-4 shrink-0 text-brand-cyan" aria-hidden />
            <p className="text-sm text-white/75">
              Nature perfected defense over millions of years. We take notes.
            </p>
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
