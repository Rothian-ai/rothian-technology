import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame, Meter, useSequence } from "./Frame";
import { EASE } from "@ui4ai/lib/utils";

/**
 * Candidate → structured scorecard → explainable insight, with the human
 * decision left explicitly open. Sample candidate, sample scores.
 */

const SCORES = [
  { label: "Role fit", value: 92, tone: "primary" as const },
  { label: "Skills", value: 95, tone: "accent" as const },
  { label: "Culture add", value: 88, tone: "glow" as const },
];

const EVIDENCE = [
  "Led two platform migrations at comparable scale",
  "Mentored four engineers into senior roles",
  "Domain overlap: regulated fintech, 5 years",
];

export function MarieDemo() {
  const { ref, step } = useSequence(4, 1600);

  return (
    <div ref={ref}>
      <DemoFrame label="Marie · candidate review">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-hairline bg-black/25 p-3.5">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[16px] text-paper"
                style={{
                  background:
                    "linear-gradient(140deg, rgb(var(--agent-primary) / 0.5), rgb(var(--agent-accent) / 0.3))",
                  border: "1px solid rgb(var(--agent-primary) / 0.4)",
                }}
              >
                SC
              </span>
              <div className="min-w-0">
                <p className="font-display text-[19px] leading-tight text-paper">Sarah Chen</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
                  Senior Platform Engineer · Stage 2
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-hairline bg-black/25 p-3.5">
              <p className="eyebrow-agent mb-3">Structured scorecard</p>
              <div className="grid gap-3">
                {SCORES.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={false}
                    animate={{ opacity: step >= 1 ? 1 : 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.14 }}
                  >
                    <Meter label={s.label} value={s.value} active={step >= 1} tone={s.tone} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-hairline bg-black/25 p-3.5">
              <p className="eyebrow-agent mb-2.5">Evidence</p>
              <ul className="grid gap-2">
                {EVIDENCE.map((e, i) => (
                  <motion.li
                    key={e}
                    initial={false}
                    animate={{ opacity: step >= 2 ? 1 : 0.16, x: step >= 2 ? 0 : 8 }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.13 }}
                    className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-white/72"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "rgb(var(--agent-glow))" }}
                    />
                    {e}
                  </motion.li>
                ))}
              </ul>
            </div>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="rounded-2xl border p-3.5"
                  style={{
                    borderColor: "rgb(var(--agent-primary) / 0.4)",
                    background:
                      "linear-gradient(140deg, rgb(var(--agent-primary) / 0.14), transparent)",
                  }}
                >
                  <p className="eyebrow-agent mb-1.5">Marie&rsquo;s read</p>
                  <p className="text-[13px] leading-relaxed text-white/78">
                    Strong match on the technical bar and on the scale of the systems this role
                    owns. The open question is team leadership breadth — worth a structured probe
                    at stage three.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2.5 rounded-xl border border-hairline bg-white/[0.03] px-3 py-2.5"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "rgb(var(--agent-glow))" }}
                  />
                  <p className="text-[12px] text-white/56">
                    Recommendation only. The hiring decision stays with the panel.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
