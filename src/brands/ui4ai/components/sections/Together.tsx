import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@ui4ai/components/motion/primitives";
import { useSceneNeutral } from "@ui4ai/components/scene/SceneProvider";
import { EcosystemMap } from "./EcosystemMap";
import { EASE } from "@ui4ai/lib/utils";

/**
 * What the four share. The case for an ecosystem rather than four tools:
 * one foundation, one standard of evidence, four specialisations.
 */

const SHARED = [
  {
    title: "Grounded, not guessed",
    body: "Each agent is wired to the sources its own domain is judged by — registries, brand rules, product constraints, employee records.",
  },
  {
    title: "The work is shown",
    body: "Every recommendation carries its reasoning. The decision stays with the person who has to defend it.",
  },
  {
    title: "Built for a workflow",
    body: "Not a chat window bolted onto a process. Each agent carries the sequence its work actually follows.",
  },
  {
    title: "One design language",
    body: "Four specialists, one standard of clarity — so moving between them costs nothing.",
  },
];

export function Together() {
  const ref = useSceneNeutral<HTMLDivElement>();

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={ref} className="container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="u4-eyebrow mb-6">03 — Together</p>
            </Reveal>
            <h2 className="font-display text-display-lg text-paper">
              <WordReveal text="Specialists, not silos." />
            </h2>
            <Reveal delay={0.15}>
              <p className="lede mt-7 max-w-[44ch]">
                Each agent runs its own domain end to end. What they hold in common is the
                foundation underneath — and it is what makes them read as one ecosystem rather than
                four purchases.
              </p>
            </Reveal>

            {/* the four as one connected system — the picture of the argument
                this section is making, rather than another list of names */}
            <Reveal delay={0.2}>
              <EcosystemMap className="mt-10 w-full max-w-[380px]" />
            </Reveal>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-white/[0.05] sm:grid-cols-2">
              {SHARED.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                  className="bg-obsidian-900 p-6 sm:p-7"
                >
                  <span className="font-mono text-[10px] tabular-nums text-white/24">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[22px] leading-tight text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/48">{item.body}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
