import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame, useSequence } from "./Frame";
import { useTypewriter } from "@ui4ai/components/motion/primitives";
import { EASE } from "@ui4ai/lib/utils";

/**
 * Rough idea → understanding → feature architecture.
 * A demonstration of the shape of Albert's output, with sample content.
 */

const IDEA = "An app for managing restaurant inventory";

const MODULES = [
  { name: "Inventory", detail: "Stock levels, par thresholds, waste log", screens: 4 },
  { name: "Orders", detail: "Purchase orders, receiving, reconciliation", screens: 5 },
  { name: "Suppliers", detail: "Catalogue, pricing history, lead times", screens: 3 },
  { name: "Analytics", detail: "Cost of goods, variance, forecast", screens: 3 },
  { name: "Alerts", detail: "Low stock, price change, expiry", screens: 2 },
];

export function AlbertDemo() {
  const { ref, step, started } = useSequence(3, 2000);
  const typed = useTypewriter(IDEA, started && step >= 0, 34);

  return (
    <div ref={ref}>
      <DemoFrame label="Albert · idea workspace">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col gap-3">
            <div>
              <p className="eyebrow-agent mb-2">Rough idea</p>
              <div className="rounded-2xl border border-hairline bg-black/25 p-3.5">
                <p className="font-display text-[19px] leading-snug text-paper">
                  {typed}
                  <span className="ml-0.5 inline-block h-4 w-px animate-caret bg-current align-middle" />
                </p>
              </div>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="rounded-2xl border border-hairline bg-black/25 p-3.5"
                >
                  <p className="eyebrow-agent mb-2.5">Understanding</p>
                  <div className="grid gap-2 text-[12.5px]">
                    {[
                      ["Primary user", "Kitchen manager, daily"],
                      ["Core job", "Know what to reorder, before it runs out"],
                      ["Constraint", "Entered on a phone, mid-service"],
                    ].map(([k, v], i) => (
                      <motion.div
                        key={k}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
                        className="flex items-baseline justify-between gap-4 border-b border-hairline-soft pb-2 last:border-0 last:pb-0"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/34">
                          {k}
                        </span>
                        <span className="flex-1 text-right text-white/76">{v}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <p className="eyebrow-agent mb-2">Feature architecture</p>
            <div className="relative rounded-2xl border border-hairline bg-black/25 p-3.5">
              {/* connective spine */}
              <span
                aria-hidden
                className="absolute bottom-6 left-[26px] top-8 w-px"
                style={{ background: "rgb(var(--agent-primary) / 0.25)" }}
              />
              <div className="grid gap-1.5">
                {MODULES.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={false}
                    animate={{
                      opacity: step >= 2 ? 1 : 0.16,
                      x: step >= 2 ? 0 : -8,
                    }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                    className="relative flex items-center gap-3 rounded-xl border border-hairline-soft bg-white/[0.02] px-3 py-2.5"
                  >
                    <span
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
                      style={{
                        background: "rgb(var(--agent-primary) / 0.2)",
                        border: "1px solid rgb(var(--agent-primary) / 0.6)",
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: "rgb(var(--agent-accent))" }}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-paper">{m.name}</p>
                      <p className="truncate text-[11.5px] text-white/44">{m.detail}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/34">
                      {m.screens} screens
                    </span>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {step >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mt-3 border-t border-hairline pt-3 text-[12.5px] text-white/60"
                  >
                    17 screens · 5 modules · phase one scoped to Inventory and Alerts
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
