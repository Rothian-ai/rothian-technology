import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame, StepRow, useSequence } from "./Frame";
import { EASE } from "@ui4ai/lib/utils";

/**
 * Enquiry → profile → matching → yield → recommendation.
 * Sample figures, shown to demonstrate the shape of Amelia's reasoning.
 */

const STEPS = [
  { label: "Investor enquiry received", value: "EN · AR" },
  { label: "Profile built — budget, horizon, risk", value: "AED 1.8M" },
  { label: "Inventory matched against criteria", value: "34 → 6" },
  { label: "Yield and payment-plan analysis", value: "6 units" },
  { label: "Recommendation prepared", value: "Ready" },
];

const MATCHES = [
  { name: "Marina Vista · Tower B", yield: "6.8%", plan: "60/40", risk: "Low", lead: true },
  { name: "Creek Rise · Phase 2", yield: "6.1%", plan: "70/30", risk: "Low" },
  { name: "Harbour Point · West", yield: "5.4%", plan: "50/50", risk: "Medium" },
];

export function AmeliaDemo() {
  const { ref, step } = useSequence(STEPS.length, 1500);

  return (
    <div ref={ref}>
      <DemoFrame label="Amelia · advisory console">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="eyebrow-agent mb-2">Enquiry pipeline</p>
            <div className="rounded-2xl border border-hairline bg-black/25 p-3">
              {STEPS.map((s, i) => (
                <StepRow
                  key={s.label}
                  label={s.label}
                  value={step > i ? s.value : undefined}
                  active={step === i}
                  done={step > i}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="eyebrow-agent mb-2">Matched inventory</p>
              <div className="grid gap-1.5">
                {MATCHES.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={false}
                    animate={{
                      opacity: step > 2 ? 1 : 0.2,
                      y: step > 2 ? 0 : 6,
                    }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
                    className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                    style={{
                      borderColor:
                        m.lead && step > 3
                          ? "rgb(var(--agent-primary) / 0.45)"
                          : "rgba(255,255,255,0.08)",
                      background:
                        m.lead && step > 3 ? "rgb(var(--agent-primary) / 0.09)" : "rgba(0,0,0,0.24)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] text-paper">{m.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/36">
                        Plan {m.plan} · Supply risk {m.risk}
                      </p>
                    </div>
                    <span
                      className="font-mono text-[13px] tabular-nums"
                      style={{ color: "rgb(var(--agent-glow))" }}
                    >
                      {step > 3 ? m.yield : "—"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step >= 4 && (
                <motion.div
                  key="rec"
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
                  <p className="eyebrow-agent mb-1.5">Recommendation</p>
                  <p className="text-[13px] leading-relaxed text-white/78">
                    Marina Vista Tower B leads on net yield after acquisition cost, with escrow
                    verified and a 60/40 plan that fits the stated horizon.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["DLD verified", "RERA escrow", "Handover Q4 2027"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em]"
                        style={{
                          background: "rgb(var(--agent-primary) / 0.14)",
                          color: "rgb(var(--agent-glow))",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
