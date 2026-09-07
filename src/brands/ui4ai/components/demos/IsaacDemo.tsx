import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame, useSequence } from "./Frame";
import { EASE } from "@ui4ai/lib/utils";

/**
 * Campaign → channels → variants → performance.
 * Sample campaign data illustrating how Isaac's cycle is structured.
 */

const CHANNELS = [
  { name: "LinkedIn", posts: 6, tone: "Authority" },
  { name: "Instagram", posts: 9, tone: "Visual" },
  { name: "X", posts: 12, tone: "Fast" },
  { name: "Email", posts: 3, tone: "Depth" },
];

const VARIANTS = [
  { copy: "The launch note, written for a buyer who already knows the category.", pick: true },
  { copy: "The launch note, written for someone hearing about it first." },
  { copy: "The launch note, as a single question." },
];

const SERIES = [38, 44, 41, 52, 58, 55, 67, 74, 71, 83];

export function IsaacDemo() {
  const { ref, step } = useSequence(4, 1650);

  return (
    <div ref={ref}>
      <DemoFrame label="Isaac · campaign studio">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-hairline bg-black/25 p-3.5">
              <p className="eyebrow-agent mb-1.5">Campaign</p>
              <p className="font-display text-[20px] leading-snug text-paper">Product launch</p>
              <p className="mt-1 text-[12.5px] text-white/50">
                Brand voice loaded · 4 channels · 3-week arc
              </p>
            </div>

            <div>
              <p className="eyebrow-agent mb-2">Channel plan</p>
              <div className="grid grid-cols-2 gap-1.5">
                {CHANNELS.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={false}
                    animate={{ opacity: step >= 1 ? 1 : 0.18, y: step >= 1 ? 0 : 8 }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                    className="rounded-xl border border-hairline-soft bg-white/[0.025] px-3 py-2.5"
                  >
                    <p className="text-[12.5px] text-paper">{c.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-white/38">
                      {c.posts} posts · {c.tone}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="eyebrow-agent mb-2">Generated variants</p>
              <div className="grid gap-1.5">
                {VARIANTS.map((v, i) => (
                  <motion.div
                    key={v.copy}
                    initial={false}
                    animate={{ opacity: step >= 2 ? 1 : 0.16, x: step >= 2 ? 0 : 10 }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
                    className="flex items-start gap-2.5 rounded-xl border px-3 py-2.5"
                    style={{
                      borderColor:
                        v.pick && step >= 3
                          ? "rgb(var(--agent-primary) / 0.5)"
                          : "rgba(255,255,255,0.075)",
                      background:
                        v.pick && step >= 3 ? "rgb(var(--agent-primary) / 0.1)" : "rgba(0,0,0,0.22)",
                    }}
                  >
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background:
                          v.pick && step >= 3
                            ? "rgb(var(--agent-accent))"
                            : "rgba(255,255,255,0.22)",
                      }}
                    />
                    <p className="text-[12.5px] leading-relaxed text-white/72">{v.copy}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-hairline bg-black/25 p-3.5">
              <div className="mb-2.5 flex items-baseline justify-between">
                <p className="eyebrow-agent">Engagement trend</p>
                <AnimatePresence>
                  {step >= 4 && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="font-mono text-[13px] tabular-nums"
                      style={{ color: "rgb(var(--agent-glow))" }}
                    >
                      ↑ 24%
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <svg viewBox="0 0 220 62" className="h-16 w-full" role="img" aria-label="Sample engagement trend rising over ten cycles">
                <defs>
                  <linearGradient id="isaac-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--agent-primary))" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="rgb(var(--agent-primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {(() => {
                  const pts = SERIES.map((v, i) => [
                    (i / (SERIES.length - 1)) * 216 + 2,
                    58 - (v / 100) * 52,
                  ]);
                  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
                  return (
                    <>
                      <motion.path
                        d={`${line} L218,60 L2,60 Z`}
                        fill="url(#isaac-fill)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 4 ? 1 : 0 }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                      <motion.path
                        d={line}
                        fill="none"
                        stroke="rgb(var(--agent-accent))"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: step >= 4 ? 1 : 0 }}
                        transition={{ duration: 1.4, ease: EASE }}
                      />
                      <motion.circle
                        cx={pts[pts.length - 1][0]}
                        cy={pts[pts.length - 1][1]}
                        r="2.6"
                        fill="rgb(var(--agent-glow))"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 4 ? 1 : 0 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                      />
                    </>
                  );
                })()}
              </svg>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/28">
                Sample data · ten publishing cycles
              </p>
            </div>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
