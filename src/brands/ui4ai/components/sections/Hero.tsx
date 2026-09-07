import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ConvergenceField } from "@ui4ai/components/fields/ConvergenceField";
import { Magnetic } from "@ui4ai/components/motion/primitives";
import { useSceneNeutral } from "@ui4ai/components/scene/SceneProvider";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { AGENTS } from "@ui4ai/lib/agents";
import { EASE } from "@ui4ai/lib/utils";

const LINE_ONE = ["Meet", "the", "minds"];
const LINE_TWO = ["behind", "your", "next", "move."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const neutralRef = useSceneNeutral<HTMLDivElement>();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      <motion.div
        aria-hidden
        style={reduced ? undefined : { scale: fieldScale }}
        className="absolute inset-0 -z-10"
      >
        <ConvergenceField className="opacity-[0.85]" />
        <div className="absolute inset-0 vignette" />
      </motion.div>

      <div ref={neutralRef} className="container relative">
        <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="u4-eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span>Rothian</span>
            <span className="text-white/16">/</span>
            <span>AI Agent Ecosystem</span>
            <span className="text-white/16">/</span>
            <span className="text-white/28">Four specialists in service</span>
          </motion.p>

          <h1 className="max-w-[17ch] font-display text-display-2xl font-normal text-paper">
            <span className="sr-only">Meet the minds behind your next move.</span>
            <span aria-hidden className="block">
              {[LINE_ONE, LINE_TWO].map((line, li) => (
                <span key={li} className="flex flex-wrap gap-x-[0.24em]">
                  {line.map((word, wi) => (
                    <span key={`${word}-${wi}`} className="line-mask">
                      <motion.span
                        className="inline-block will-change-transform"
                        initial={reduced ? undefined : { y: "112%" }}
                        animate={reduced ? undefined : { y: "0%" }}
                        transition={{
                          duration: 1.15,
                          ease: EASE,
                          delay: 0.22 + (li * LINE_ONE.length + wi) * 0.075,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.85 }}
            className="lede mt-8 max-w-[54ch]"
          >
            Four specialists. One intelligence ecosystem. Each designed around the way a specific
            kind of work actually behaves — so complex problems become clearer decisions, faster
            execution and better outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href="#agents" className="group btn btn-agent">
                Meet the four
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </Magnetic>
            <a href="#diagnostic" className="group btn btn-ghost">
              Which one do I need?
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* the four, introduced without shouting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.3 }}
        className="container relative mt-16 sm:mt-20"
      >
        <div className="hairline-t grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {AGENTS.map((agent, i) => (
            <motion.a
              key={agent.id}
              href={`#agent-${agent.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.4 + i * 0.09 }}
              className="group relative flex flex-col gap-2 py-5 pr-4 transition-colors sm:py-6"
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:scale-150"
                  style={{
                    background: agent.color.primary,
                    boxShadow: `0 0 12px ${agent.color.primary}88`,
                  }}
                />
                <span className="font-mono text-2xs uppercase tracking-mono text-white/34">
                  {agent.domain}
                </span>
              </span>
              <span className="font-display text-[26px] leading-none text-paper sm:text-[30px]">
                {agent.name}
              </span>
              {/* what it does, not what it evokes — this is the visitor's first
                  read of the four, so it has to be concrete */}
              <span className="max-w-[30ch] text-[13px] leading-snug text-white/52">
                {agent.does}
              </span>
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: agent.color.primary }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
