import { motion, useScroll, useTransform } from "framer-motion";
import Image from '@ui4ai/components/ui/Image'
import { useRef } from "react";
import { AgentField } from "@ui4ai/components/fields/AgentField";
import { Magnetic, Reveal } from "@ui4ai/components/motion/primitives";
import { useSceneOwner } from "@ui4ai/components/scene/SceneProvider";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import type { Agent } from "@ui4ai/lib/agents";
import { cn, EASE } from "@ui4ai/lib/utils";

/**
 * One agent, one chapter — a full editorial world rather than a card.
 *
 * The chapter owns the scene while it holds the viewport, which is what pulls
 * the page out of monochrome and into that agent's colour. Its own field runs
 * behind the type, its portrait is pinned beside the reading column, and the
 * embedded demonstration sits at the foot of the chapter.
 */
export function AgentChapter({
  agent,
  index,
  demo,
  flip = false,
}: {
  agent: Agent;
  index: number;
  demo: React.ReactNode;
  flip?: boolean;
}) {
  const ref = useSceneOwner(agent.id);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: inner, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const nameX = useTransform(scrollYProgress, [0, 1], flip ? ["4%", "-4%"] : ["-4%", "4%"]);

  return (
    <section
      id={`agent-${agent.id}`}
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby={`agent-${agent.id}-name`}
      className="relative scroll-mt-[var(--nav-h)] overflow-hidden py-24 sm:py-32"
      style={
        {
          // the chapter's own colour, available to descendants even before the
          // global scene has finished easing into it
          "--chapter": agent.color.primary,
        } as React.CSSProperties
      }
    >
      {/* the agent's world */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <AgentField
          mode={agent.id}
          rgb={agent.color.rgb.join(" ")}
          accentRgb={agent.color.accentRgb.join(" ")}
          intensity={0.5}
          className="opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(90% 60% at ${flip ? "78%" : "22%"} 40%, ${agent.color.primary}1c, transparent 70%)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div ref={inner} className="container relative">
        {/* chapter marker */}
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-2xs uppercase tracking-mono text-white/26">
              Agent {String(index).padStart(2, "0")} / 04
            </span>
            <span className="h-px flex-1" style={{ background: `${agent.color.primary}44` }} />
            <span
              className="font-mono text-2xs uppercase tracking-mono"
              style={{ color: agent.color.glow }}
            >
              {agent.discipline}
            </span>
          </div>
        </Reveal>

        <div
          className={cn(
            "grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16",
            flip && "lg:grid-cols-[0.92fr_1.08fr]",
          )}
        >
          {/* ------------------------------------------------------ portrait */}
          <div className={cn("relative", flip && "lg:order-2")}>
            <motion.div
              style={reduced ? undefined : { y: portraitY }}
              className="relative mx-auto max-w-[380px] sm:max-w-[400px] lg:sticky lg:top-28"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-hairline">
                <Image
                  src={agent.portrait}
                  alt={`${agent.name}, the ${agent.role.replace(/^The /, "")} — an AI agent identity`}
                  fill
                  sizes="(max-width: 640px) 88vw, 400px"
                  className="object-cover"
                  priority={index === 1}
                  quality={82}
                />
                {/* colour grade toward the agent's signature */}
                <div
                  className="absolute inset-0 mix-blend-color"
                  style={{ background: agent.color.primary, opacity: 0.16 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(8,8,12,0.92) 2%, rgba(8,8,12,0.34) 30%, rgba(8,8,12,0) 58%, ${agent.color.primary}1c 100%)`,
                  }}
                />
                {/* scan line — the identity being read */}
                {!reduced && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${agent.color.glow}, transparent)` }}
                    animate={{ top: ["8%", "92%", "8%"], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p
                    className="font-mono text-2xs uppercase tracking-mono"
                    style={{ color: agent.color.glow }}
                  >
                    {agent.domain} intelligence
                  </p>
                  <p className="mt-2 font-display text-[17px] italic leading-snug text-paper/92">
                    &ldquo;{agent.signature}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* -------------------------------------------------------- reading */}
          <div className={cn(flip && "lg:order-1")}>
            <motion.h2
              id={`agent-${agent.id}-name`}
              style={reduced ? undefined : { x: nameX }}
              className="agent-name"
            >
              <span className="sr-only">
                {agent.name} — {agent.role}
              </span>
              {/* The trigger sits on the mask, not the name: the name starts
                  clipped out of it, so an observer on the name would never
                  fire. See the note in WordReveal. */}
              <motion.span
                aria-hidden
                className="line-mask"
                initial={reduced ? undefined : "hidden"}
                whileInView={reduced ? undefined : "show"}
                viewport={{ once: true, margin: "-12%" }}
              >
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
                  transition={{ duration: 1.15, ease: EASE }}
                  style={{ textShadow: `0 0 100px ${agent.color.primary}44` }}
                >
                  {agent.name}
                </motion.span>
              </motion.span>
            </motion.h2>

            <Reveal delay={0.1}>
              <p
                className="mt-4 font-mono text-[11px] uppercase tracking-mono"
                style={{ color: agent.color.glow }}
              >
                {agent.role}
              </p>
            </Reveal>

            {/* the one-line answer, sized to be read before the paragraph is */}
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-[36ch] font-display text-display-sm text-paper">
                {agent.does}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="u4-rule my-8" />
            </Reveal>

            <Reveal delay={0.2}>
              <p className="lede max-w-[48ch]">{agent.description}</p>
            </Reveal>

            {/* capabilities */}
            <Reveal delay={0.26}>
              <p className="u4-eyebrow mb-4 mt-10">What {agent.name} does</p>
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-white/[0.05] sm:grid-cols-2">
              {agent.capabilities.map((cap, i) => (
                <motion.li
                  key={cap}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 * i }}
                  className="relative bg-obsidian-900 p-5"
                >
                  <span
                    className="font-mono text-[10px] tabular-nums"
                    style={{ color: agent.color.primary }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[14px] leading-snug text-white/76">{cap}</p>
                </motion.li>
              ))}
            </ul>

            {/* cta */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
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
                <span className="font-mono text-2xs uppercase tracking-mono text-white/26">
                  {agent.href.replace("https://", "")}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* -------------------------------------------------- live demonstration */}
        <Reveal delay={0.1} y={34}>
          <div className="mt-16 sm:mt-20">
            <div className="mb-4 flex items-center gap-4">
              <span className="u4-eyebrow">Inside {agent.name}</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            {demo}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
