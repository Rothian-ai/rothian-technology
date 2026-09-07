import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { cn, EASE } from "@ui4ai/lib/utils";

/**
 * Shared chrome for the four embedded product demonstrations.
 *
 * These are illustrative recreations built in the DOM, not the live products
 * and not screenshots — the label makes that explicit so the demonstration is
 * never mistaken for the application itself.
 */
export function DemoFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("glass glass-agent relative overflow-hidden rounded-3xl", className)}>
      <figcaption className="flex items-center gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="hidden gap-1.5 sm:flex" aria-hidden>
          {["rgba(255,255,255,0.14)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.07)"].map((c, i) => (
            <span key={i} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
        </span>
        {/* the console name yields first when space is tight; the
            "illustrative" disclosure never wraps or truncates */}
        <span className="min-w-0 truncate font-mono text-2xs uppercase tracking-[0.16em] text-white/44">
          {label}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "rgb(var(--agent-accent))" }}
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/32">
            Illustrative
          </span>
        </span>
      </figcaption>
      <div className="relative p-4 sm:p-5">{children}</div>
    </figure>
  );
}

/**
 * Runs a stepped sequence forward once the demo is on screen, then loops.
 *
 * Under reduced motion the sequence does not loop at all: the demo is shown in
 * its completed state, so the information is still there without the movement.
 */
export function useSequence(steps: number, interval = 1500) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setStep(steps);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % (steps + 1));
    }, interval);
    return () => window.clearInterval(id);
  }, [started, steps, interval, reduced]);

  return { ref, step, started };
}

export function StepRow({
  active,
  done,
  label,
  value,
  delay = 0,
}: {
  active: boolean;
  done: boolean;
  label: string;
  value?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active || done ? 1 : 0.26 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="flex items-center gap-3 py-2"
    >
      <span className="relative grid h-4 w-4 shrink-0 place-items-center">
        <span
          className="absolute inset-0 rounded-full border transition-colors duration-500"
          style={{
            borderColor: active || done ? "rgb(var(--agent-primary) / 0.7)" : "rgba(255,255,255,0.16)",
          }}
        />
        {active && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgb(var(--agent-primary))" }}
            animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span
          className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
          style={{
            background: done || active ? "rgb(var(--agent-primary))" : "rgba(255,255,255,0.2)",
          }}
        />
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] text-white/72">{label}</span>
      {value && (
        <span className="font-mono text-[11.5px] tabular-nums text-white/50">{value}</span>
      )}
    </motion.div>
  );
}

export function Meter({
  label,
  value,
  active,
  tone = "primary",
}: {
  label: string;
  value: number;
  active: boolean;
  tone?: "primary" | "accent" | "glow";
}) {
  const color =
    tone === "accent"
      ? "rgb(var(--agent-accent))"
      : tone === "glow"
        ? "rgb(var(--agent-glow))"
        : "rgb(var(--agent-primary))";

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] text-white/58">{label}</span>
        <span className="font-mono text-[13px] tabular-nums text-paper">{value}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>
    </div>
  );
}
