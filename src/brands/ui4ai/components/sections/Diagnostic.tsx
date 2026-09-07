import { motion } from "framer-motion";
import Image from '@ui4ai/components/ui/Image'
import { useState } from "react";
import { AgentField } from "@ui4ai/components/fields/AgentField";
import { Magnetic, Reveal, WordReveal } from "@ui4ai/components/motion/primitives";
import { useScene, useSceneWhenCentred } from "@ui4ai/components/scene/SceneProvider";
import { AGENTS, type AgentId } from "@ui4ai/lib/agents";
import { EASE } from "@ui4ai/lib/utils";

/**
 * "Which agent do I need?"
 *
 * The visitor states a problem; the matching specialist resolves in place. The
 * whole environment follows the answer, so the moment reads as being handed a
 * specialist rather than being shown a card.
 */
export function Diagnostic() {
  const [answer, setAnswer] = useState<AgentId | null>(null);
  const { select, setActive } = useScene();
  const ref = useSceneWhenCentred<HTMLElement>(answer);
  const agent = answer ? AGENTS.find((a) => a.id === answer)! : null;

  const choose = (id: AgentId) => {
    setAnswer(id);
    select(id);
  };

  const reset = () => {
    setAnswer(null);
    setActive(null);
  };

  return (
    <section
      id="diagnostic"
      ref={ref}
      className="relative scroll-mt-[var(--nav-h)] overflow-hidden py-24 sm:py-32"
    >
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <p className="u4-eyebrow mb-6">04 — Find your specialist</p>
          </Reveal>
          <h2 className="font-display text-display-lg text-paper">
            <WordReveal text="What are you trying to solve?" />
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* the four problems */}
          <div className="grid gap-2.5" role="group" aria-label="Choose the problem closest to yours">
            {AGENTS.map((a, i) => {
              const on = answer === a.id;
              return (
                <motion.button
                  key={a.id}
                  type="button"
                  onClick={() => choose(a.id)}
                  aria-pressed={on}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 sm:p-6"
                  style={{
                    borderColor: on ? `${a.color.primary}88` : "rgba(255,255,255,0.08)",
                    background: on
                      ? `linear-gradient(110deg, ${a.color.primary}1f, transparent 70%)`
                      : "rgba(255,255,255,0.025)",
                  }}
                >
                  <span className="flex items-start gap-4">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full transition-all duration-500"
                      style={{
                        background: on ? a.color.primary : "rgba(255,255,255,0.2)",
                        boxShadow: on ? `0 0 16px ${a.color.primary}` : "none",
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[21px] leading-snug text-paper sm:text-[24px]">
                        {a.problem}
                      </span>
                      <span className="mt-1.5 block text-[13.5px] leading-relaxed text-white/44">
                        {a.problemDetail}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-2xs uppercase tracking-mono transition-all duration-500"
                      style={{
                        color: on ? a.color.glow : "rgba(255,255,255,0.2)",
                        transform: on ? "translateX(0)" : "translateX(-6px)",
                        opacity: on ? 1 : 0.5,
                      }}
                    >
                      {on ? a.name : "→"}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* the answer */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-hairline lg:min-h-full">
            {/* keyed on the answer, so a new choice remounts and animates in */}
            {!agent ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full min-h-[380px] flex-col items-center justify-center gap-5 p-10 text-center"
                >
                  <div className="flex gap-2.5" aria-hidden>
                    {AGENTS.map((a, i) => (
                      <motion.span
                        key={a.id}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: a.color.primary }}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                  <p className="max-w-[26ch] font-display text-display-sm text-white/34">
                    Choose the problem closest to yours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative flex h-full min-h-[380px] flex-col"
                >
                  <div aria-hidden className="absolute inset-0">
                    <AgentField
                      mode={agent.id}
                      rgb={agent.color.rgb.join(" ")}
                      accentRgb={agent.color.accentRgb.join(" ")}
                      intensity={0.5}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(160deg, ${agent.color.primary}26, transparent 68%)`,
                      }}
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col p-7 sm:p-9">
                    <p
                      className="font-mono text-2xs uppercase tracking-mono"
                      style={{ color: agent.color.glow }}
                    >
                      You need
                    </p>

                    <div className="mt-5 flex items-center gap-5">
                      <span
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border sm:h-20 sm:w-20"
                        style={{ borderColor: `${agent.color.primary}88` }}
                      >
                        <Image
                          src={agent.portrait}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                          quality={70}
                        />
                      </span>
                      <span>
                        <span className="block font-display text-[42px] leading-none text-paper sm:text-[54px]">
                          {agent.name}
                        </span>
                        <span
                          className="mt-1.5 block font-mono text-2xs uppercase tracking-mono"
                          style={{ color: agent.color.accent }}
                        >
                          {agent.role}
                        </span>
                      </span>
                    </div>

                    {/* the plain-language answer first, detail second */}
                    <p className="mt-6 max-w-[38ch] font-display text-[22px] leading-snug text-paper sm:text-[25px]">
                      {agent.does}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {agent.shortCaps.map((c, i) => (
                        <motion.li
                          key={c}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.08 }}
                          className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                          style={{
                            borderColor: `${agent.color.primary}55`,
                            background: `${agent.color.primary}14`,
                            color: agent.color.glow,
                          }}
                        >
                          {c}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                      <Magnetic>
                        <a
                          href={agent.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group btn text-white"
                          style={{
                            background: `linear-gradient(100deg, ${agent.color.primary}, ${agent.color.accent})`,
                            boxShadow: `0 18px 48px -22px ${agent.color.primary}`,
                          }}
                        >
                          Explore {agent.name}
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                          </span>
                        </a>
                      </Magnetic>
                      <button
                        type="button"
                        onClick={reset}
                        className="group btn btn-ghost !px-5 !py-2.5 !text-[13px]"
                      >
                        Start again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
