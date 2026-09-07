import { motion } from "framer-motion";
import Image from '@ui4ai/components/ui/Image'
import { useState } from "react";
import { Reveal, WordReveal } from "@ui4ai/components/motion/primitives";
import { AgentWordmark } from "@ui4ai/components/chrome/AgentWordmark";
import { useSceneNeutral } from "@ui4ai/components/scene/SceneProvider";
import { AGENTS } from "@ui4ai/lib/agents";
import { EASE } from "@ui4ai/lib/utils";

/**
 * The last decision the page asks for: four large doors, each opening onto that
 * agent's own site.
 */
export function FinalSelection() {
  const ref = useSceneNeutral<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="choose" className="relative scroll-mt-[var(--nav-h)] py-24 sm:py-32">
      <div ref={ref} className="container">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <p className="u4-eyebrow mb-6">05 — Choose</p>
          </Reveal>
          <h2 className="font-display text-display-xl text-paper">
            <WordReveal text="Find your specialist." />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede mt-7 max-w-[50ch]">
              Each agent has its own home, its own product and its own depth. This page was only
              the introduction.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {AGENTS.map((agent, i) => {
            const on = hover === agent.id;
            return (
              <motion.a
                key={agent.id}
                href={agent.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHover(agent.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(agent.id)}
                onBlur={() => setHover(null)}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.85, ease: EASE, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border transition-all duration-600"
                style={{
                  borderColor: on ? `${agent.color.primary}77` : "rgba(255,255,255,0.08)",
                  background: on
                    ? `linear-gradient(135deg, ${agent.color.primary}22, rgba(255,255,255,0.02) 60%)`
                    : "rgba(255,255,255,0.022)",
                  boxShadow: on ? `0 40px 100px -60px ${agent.color.primary}` : "none",
                }}
              >
                {/* portrait, revealed on approach — kept to a narrow edge so it
                    never competes with what the agent actually does */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-0 w-[32%] transition-opacity duration-700 sm:w-[34%]"
                  style={{ opacity: on ? 0.34 : 0.12 }}
                >
                  <Image
                    src={agent.portrait}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top"
                    quality={68}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, #08080C 14%, rgba(8,8,12,0.7) 55%, rgba(8,8,12,0.22))",
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-color"
                    style={{ background: agent.color.primary, opacity: 0.55 }}
                  />
                </div>

                <div className="relative p-7 sm:p-9">
                  <span
                    className="font-mono text-2xs uppercase tracking-mono transition-colors duration-500"
                    style={{ color: on ? agent.color.glow : "rgba(255,255,255,0.34)" }}
                  >
                    {agent.domain} intelligence
                  </span>

                  {/* the product's own mark — this card is the doorway to that
                      site, so it should look like that site */}
                  <AgentWordmark agent={agent} height={40} className="mt-4 sm:!h-[46px]" />

                  {/* what it actually does, before anything else */}
                  <p className="mt-3 max-w-[22ch] text-[15px] leading-snug text-paper/82 sm:max-w-[26ch] lg:max-w-[32ch]">
                    {agent.does}
                  </p>

                  <ul className="mt-4 flex max-w-[22ch] flex-wrap gap-1.5 sm:max-w-[26ch] lg:max-w-[32ch]">
                    {agent.shortCaps.map((cap) => (
                      <li
                        key={cap}
                        className="rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors duration-500"
                        style={{
                          borderColor: on ? `${agent.color.primary}66` : "rgba(255,255,255,0.1)",
                          color: on ? agent.color.glow : "rgba(255,255,255,0.44)",
                        }}
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-medium text-paper">
                    Explore {agent.name}
                    <motion.span
                      aria-hidden
                      animate={{ x: on ? 5 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{ color: agent.color.glow }}
                    >
                      →
                    </motion.span>
                  </span>

                  <span className="mt-2 block font-mono text-2xs tracking-[0.14em] text-white/24">
                    {agent.href.replace("https://", "")}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: agent.color.primary }}
                />
              </motion.a>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-14 text-center font-display text-display-md text-white/38">
            Different problems deserve
            <br className="hidden sm:block" />{" "}
            <span className="text-paper">specialized intelligence.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
