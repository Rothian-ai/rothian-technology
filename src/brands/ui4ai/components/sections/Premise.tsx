import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@ui4ai/components/motion/primitives";
import { useSceneNeutral } from "@ui4ai/components/scene/SceneProvider";
import { EASE } from "@ui4ai/lib/utils";

/**
 * The argument the whole page rests on: specialisation beats generality once a
 * problem has its own structure.
 */

const CONTRASTS = [
  {
    generic: "A general assistant",
    specialist: "A specialist",
    generic_detail: "Answers the question you asked.",
    specialist_detail: "Knows which question matters.",
  },
  {
    generic: "Broad knowledge",
    specialist: "Grounded knowledge",
    generic_detail: "Trained on everything, accountable to nothing.",
    specialist_detail: "Wired to the sources its domain is judged by.",
  },
  {
    generic: "A conversation",
    specialist: "A working method",
    generic_detail: "Starts fresh each time you open it.",
    specialist_detail: "Carries the process the work actually needs.",
  },
];

export function Premise() {
  const ref = useSceneNeutral<HTMLDivElement>();

  return (
    <section className="relative py-28 sm:py-36">
      <div ref={ref} className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="u4-eyebrow mb-6">01 — The premise</p>
            </Reveal>
            <h2 className="font-display text-display-lg text-paper">
              <WordReveal text="Intelligence, specialized." />
            </h2>
            <Reveal delay={0.15}>
              <p className="lede mt-7 max-w-[46ch]">
                The future of AI isn&rsquo;t one assistant trying to do everything. It&rsquo;s
                specialized intelligence designed around the way specific problems actually work.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/44">
                A property decision and a hiring decision are not the same shape. One is priced in
                yield curves and payment schedules; the other in judgement, evidence and
                consequence. An agent built for both is built well for neither.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-white/[0.045]">
              {CONTRASTS.map((row, i) => (
                <motion.div
                  key={row.generic}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                  className="grid grid-cols-1 gap-px bg-white/[0.045] sm:grid-cols-2"
                >
                  <div className="bg-obsidian-900 p-5 sm:p-6">
                    <p className="font-mono text-2xs uppercase tracking-mono text-white/26">
                      {row.generic}
                    </p>
                    <p className="mt-2.5 text-[14px] leading-snug text-white/38">
                      {row.generic_detail}
                    </p>
                  </div>
                  <div className="relative bg-obsidian-800 p-5 sm:p-6">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-px"
                      style={{ background: "rgb(var(--agent-primary) / 0.5)" }}
                    />
                    <p className="eyebrow-agent">{row.specialist}</p>
                    <p className="mt-2.5 text-[14px] leading-snug text-paper">
                      {row.specialist_detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
