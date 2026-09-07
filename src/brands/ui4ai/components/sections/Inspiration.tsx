import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@ui4ai/components/motion/primitives";
import { useSceneNeutral } from "@ui4ai/components/scene/SceneProvider";
import { AGENTS } from "@ui4ai/lib/agents";
import { EASE } from "@ui4ai/lib/utils";

/**
 * The philosophical backbone.
 *
 * These are stated influences, presented as such: four ways of approaching a
 * hard problem, each associated with a person who is known for it. No invented
 * quotations, no likenesses, no implication of endorsement — the agents are
 * original identities that inherit a method, not a face.
 */

const VERBS: Record<string, string> = {
  amelia: "navigates decisions.",
  albert: "builds.",
  isaac: "amplifies.",
  marie: "understands people.",
};

export function Inspiration() {
  const ref = useSceneNeutral<HTMLDivElement>();

  return (
    <section
      id="inspiration"
      className="relative scroll-mt-[var(--nav-h)] overflow-hidden border-y border-hairline py-24 sm:py-32"
    >
      {/* archival texture, kept quiet */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.13] mask-fade-y"
        style={{
          backgroundImage: "url(/images/backgrounds/equation-field.svg)",
          backgroundSize: "620px",
        }}
      />

      <div ref={ref} className="container relative">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="u4-eyebrow mb-6">02 — Inspiration</p>
          </Reveal>
          <h2 className="font-display text-display-lg text-paper">
            <WordReveal text="Four ways of approaching" />
            <br />
            <span className="text-white/40">
              <WordReveal text="something difficult." delay={0.1} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="lede mt-7 max-w-[54ch]">
              Each agent is named for a mind associated with one of them. The reference is to a way
              of working — not a person to imitate, and not an endorsement.
            </p>
          </Reveal>
        </div>

        {/* the four principles */}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent, i) => (
            <motion.article
              key={agent.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 }}
              className="group relative flex flex-col overflow-hidden bg-obsidian-900 p-6 transition-colors duration-500 hover:bg-obsidian-800 sm:p-7"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: agent.color.primary }}
              />

              {/* an original plate in the idiom of the figure's field */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-contain bg-bottom bg-no-repeat opacity-[0.16] transition-opacity duration-700 group-hover:opacity-[0.3]"
                style={{ backgroundImage: `url(${agent.inspiration.plate})` }}
              />

              <p className="relative font-mono text-2xs uppercase tracking-mono text-white/28">
                {agent.inspiration.lived}
              </p>
              <h3 className="relative mt-3 font-display text-[26px] leading-tight text-paper">
                {agent.inspiration.figure}
              </h3>
              <p
                className="relative mt-4 flex-1 font-display text-[19px] italic leading-snug"
                style={{ color: agent.color.glow }}
              >
                {agent.inspiration.principle}
              </p>
              <div className="relative mt-auto border-t border-hairline pt-5">
                <p className="font-mono text-2xs uppercase tracking-mono text-white/26">
                  Informs
                </p>
                <p className="mt-1.5 font-display text-[22px] text-paper">
                  {agent.name}{" "}
                  <span className="text-white/40">{VERBS[agent.id]}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
