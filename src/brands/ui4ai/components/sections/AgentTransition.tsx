import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { AGENT_MAP, type AgentId } from "@ui4ai/lib/agents";
import { clamp, lerp } from "@ui4ai/lib/utils";

/**
 * The connective tissue between chapters.
 *
 * One agent's motif is morphed into the next as the visitor scrolls past: the
 * route curves into a lattice, the lattice folds into an orbit, the orbit
 * disperses into a talent network. Both shapes are defined parametrically over
 * the same domain, so the morph is a straight interpolation of sampled points
 * rather than a cross-fade.
 */

type Motif = "route" | "lattice" | "orbit" | "network";

const SAMPLES = 96;

/** Each motif is a function from t (0→1) to a point in a 100×100 box. */
const SHAPES: Record<Motif, (t: number) => [number, number]> = {
  // a great-circle route across a horizon
  route: (t) => [t * 100, 62 - Math.sin(t * Math.PI) * 34],
  // a folded lattice — the same line, reasoned into structure
  lattice: (t) => {
    const seg = Math.floor(t * 6);
    const local = t * 6 - seg;
    const pts: [number, number][] = [
      [4, 62],
      [26, 22],
      [50, 46],
      [74, 20],
      [96, 60],
      [64, 74],
      [4, 62],
    ];
    const a = pts[seg] ?? pts[pts.length - 1];
    const b = pts[seg + 1] ?? pts[pts.length - 1];
    return [lerp(a[0], b[0], local), lerp(a[1], b[1], local)];
  },
  // the structure closes into an orbit
  orbit: (t) => {
    const a = t * Math.PI * 2 - Math.PI / 2;
    return [50 + Math.cos(a) * 44, 46 + Math.sin(a) * 26];
  },
  // the orbit disperses into a network of individual points
  network: (t) => {
    const a = t * Math.PI * 2 - Math.PI / 2;
    const wobble = Math.sin(t * Math.PI * 14) * 9 + Math.cos(t * Math.PI * 9) * 5;
    return [50 + Math.cos(a) * (36 + wobble), 46 + Math.sin(a) * (22 + wobble * 0.5)];
  },
};

const PAIRS: Record<string, { from: Motif; to: Motif; caption: string }> = {
  "amelia-albert": {
    from: "route",
    to: "lattice",
    caption: "A route becomes a structure.",
  },
  "albert-isaac": {
    from: "lattice",
    to: "orbit",
    caption: "A structure is set in motion.",
  },
  "isaac-marie": {
    from: "orbit",
    to: "network",
    caption: "Motion resolves into people.",
  },
};

function pathFor(from: Motif, to: Motif, p: number, closed: boolean) {
  const f = SHAPES[from];
  const g = SHAPES[to];
  let d = "";
  for (let i = 0; i < SAMPLES; i++) {
    const t = i / (SAMPLES - 1);
    const [x1, y1] = f(t);
    const [x2, y2] = g(t);
    const x = lerp(x1, x2, p);
    const y = lerp(y1, y2, p);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return closed && p > 0.65 ? `${d}Z` : d;
}

export function AgentTransition({ from, to }: { from: AgentId; to: AgentId }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // the middle 60% of the pass does the work; the edges are lead-in and out
    setP(clamp((v - 0.2) / 0.6));
  });

  const pair = PAIRS[`${from}-${to}`];
  const a = AGENT_MAP[from];
  const b = AGENT_MAP[to];
  const captionOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.78], [0, 1, 0]);

  if (reduced) {
    return (
      <div className="container py-10">
        <div className="u4-rule" />
      </div>
    );
  }

  return (
    <div ref={ref} aria-hidden className="relative h-[30vh] overflow-hidden sm:h-[46vh] lg:h-[54vh]">
      <div className="container flex h-full items-center">
        <div className="relative w-full">
          <svg viewBox="0 0 100 84" className="h-[22vh] w-full sm:h-[34vh] lg:h-[40vh]" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`morph-${from}-${to}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={a.color.primary} />
                <stop offset="100%" stopColor={b.color.primary} />
              </linearGradient>
            </defs>
            <path
              d={pathFor(pair.from, pair.to, p, pair.to !== "lattice")}
              fill="none"
              stroke={`url(#morph-${from}-${to})`}
              strokeWidth="0.45"
              strokeOpacity="0.85"
              vectorEffect="non-scaling-stroke"
            />
            {/* travelling point — the idea moving between disciplines */}
            {(() => {
              const t = (p * 0.8 + 0.1) % 1;
              const [x1, y1] = SHAPES[pair.from](t);
              const [x2, y2] = SHAPES[pair.to](t);
              const x = lerp(x1, x2, p);
              const y = lerp(y1, y2, p);
              return (
                <>
                  <circle cx={x} cy={y} r="2.4" fill={p > 0.5 ? b.color.primary : a.color.primary} opacity="0.22" />
                  <circle cx={x} cy={y} r="0.9" fill="#F4F2ED" />
                </>
              );
            })()}
          </svg>

          <motion.p
            style={{ opacity: captionOpacity }}
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-2xs uppercase tracking-[0.34em] text-white/40"
          >
            {pair.caption}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
