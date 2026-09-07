import { motion } from "framer-motion";
import { useState } from "react";
import { useScene } from "@ui4ai/components/scene/SceneProvider";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { AGENTS, type AgentId } from "@ui4ai/lib/agents";
import { cn } from "@ui4ai/lib/utils";

/**
 * The four as one connected system: specialised nodes held on a shared ring,
 * linked to each other and to a common centre.
 *
 * This is the payoff of the reveal sequence — the only place on the page that
 * argues the *relationship* rather than listing the agents again. Hovering or
 * focusing a node lights its domain and hands the page that agent's colour.
 */

const POSITIONS: Record<AgentId, { x: number; y: number }> = {
  amelia: { x: 50, y: 12 },
  albert: { x: 88, y: 50 },
  isaac: { x: 50, y: 88 },
  marie: { x: 12, y: 50 },
};

const CENTRE = { x: 50, y: 50 };

export function EcosystemMap({ className }: { className?: string }) {
  const [hover, setHover] = useState<AgentId | null>(null);
  const { select } = useScene();
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="The four agents connected around a shared centre"
      >
        <defs>
          {AGENTS.map((a) => (
            <radialGradient key={a.id} id={`eco-${a.id}`}>
              <stop offset="0%" stopColor={a.color.primary} stopOpacity="0.55" />
              <stop offset="100%" stopColor={a.color.primary} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* orbit rings */}
        {[38, 27, 16].map((r, i) => (
          <circle
            key={r}
            cx={CENTRE.x}
            cy={CENTRE.y}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.25"
            strokeDasharray={i === 1 ? "1 2" : undefined}
            style={
              reduced
                ? undefined
                : {
                    animation: `spin ${40 + i * 18}s linear infinite ${i % 2 ? "reverse" : ""}`,
                    transformOrigin: "50px 50px",
                  }
            }
          />
        ))}

        {/* cross links between specialists */}
        {AGENTS.map((a, i) =>
          AGENTS.slice(i + 1).map((b) => {
            const on = hover === a.id || hover === b.id;
            return (
              <line
                key={`${a.id}-${b.id}`}
                x1={POSITIONS[a.id].x}
                y1={POSITIONS[a.id].y}
                x2={POSITIONS[b.id].x}
                y2={POSITIONS[b.id].y}
                stroke={
                  on
                    ? hover === a.id
                      ? a.color.primary
                      : b.color.primary
                    : "rgba(255,255,255,0.1)"
                }
                strokeWidth={on ? "0.35" : "0.2"}
                strokeOpacity={on ? 0.55 : 1}
                className="transition-all duration-500"
              />
            );
          }),
        )}

        {/* spokes to the shared centre */}
        {AGENTS.map((a) => (
          <line
            key={`c-${a.id}`}
            x1={CENTRE.x}
            y1={CENTRE.y}
            x2={POSITIONS[a.id].x}
            y2={POSITIONS[a.id].y}
            stroke={a.color.primary}
            strokeWidth={hover === a.id ? "0.5" : "0.28"}
            strokeOpacity={hover === a.id ? 0.85 : 0.3}
            className="transition-all duration-500"
          />
        ))}

        {/* centre */}
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r="5.2"
          fill="rgba(8,8,12,0.9)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.3"
        />
        <text
          x={CENTRE.x}
          y={CENTRE.y + 1}
          textAnchor="middle"
          className="fill-paper font-mono"
          style={{ fontSize: "2.4px", letterSpacing: "0.14em" }}
        >
          ROTHIAN
        </text>

        {/* nodes */}
        {AGENTS.map((a, i) => {
          const p = POSITIONS[a.id];
          const on = hover === a.id;
          return (
            <g key={a.id} className="cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="14"
                fill={`url(#eco-${a.id})`}
                opacity={on ? 0.8 : 0.32}
                className="transition-opacity duration-500"
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                fill={a.color.primary}
                /* framer needs a resolved starting value for an SVG geometry
                   attribute; without it the first frame writes r="undefined" */
                initial={{ r: 3.4 }}
                animate={reduced ? { r: 3.4 } : { r: on ? 4.4 : [3.2, 3.7, 3.2] }}
                transition={{
                  duration: on ? 0.3 : 3.6,
                  repeat: on ? 0 : Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="6.4"
                fill="none"
                stroke={a.color.primary}
                strokeWidth="0.28"
                strokeOpacity={on ? 0.9 : 0.35}
                className="transition-all duration-500"
              />
              <a
                href={`#agent-${a.id}`}
                onMouseEnter={() => setHover(a.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(a.id)}
                onBlur={() => setHover(null)}
                onClick={() => select(a.id)}
                aria-label={`${a.name} — ${a.does}`}
              >
                <circle cx={p.x} cy={p.y} r="11" fill="transparent" />
              </a>
              <text
                x={p.x}
                y={p.y - 9}
                textAnchor="middle"
                className="pointer-events-none fill-paper font-display transition-opacity duration-500"
                style={{ fontSize: "5px", opacity: on ? 1 : 0.72 }}
              >
                {a.name}
              </text>
              <text
                x={p.x}
                y={p.y + 12}
                textAnchor="middle"
                className="pointer-events-none font-mono transition-opacity duration-500"
                style={{
                  fontSize: "2.3px",
                  letterSpacing: "0.16em",
                  fill: a.color.glow,
                  opacity: on ? 1 : 0.5,
                }}
              >
                {a.domain.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
