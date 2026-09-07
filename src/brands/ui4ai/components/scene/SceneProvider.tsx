import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AGENT_MAP, NEUTRAL, type AgentId, type RGB } from "@ui4ai/lib/agents";
import { lerp, rgbStr } from "@ui4ai/lib/utils";

/**
 * The colour of the page is a function of which agent currently owns the scene.
 *
 * Sections register themselves as they scroll into the middle band of the
 * viewport; the provider then eases the live `--agent-*` CSS variables from the
 * monochrome foundation toward that agent's signature. Everything downstream —
 * gradients, borders, glows, canvas fields — reads those variables, so one
 * state change repaints the whole environment without a re-render storm.
 */

interface SceneValue {
  active: AgentId | null;
  /** Set by scroll observers. */
  setActive: (id: AgentId | null, source?: "scroll" | "user") => void;
  /** Set by the rail / selector — wins until the user scrolls away. */
  select: (id: AgentId) => void;
}

const SceneContext = createContext<SceneValue>({
  active: null,
  setActive: () => {},
  select: () => {},
});

export function useScene() {
  return useContext(SceneContext);
}

function paletteFor(id: AgentId | null): { primary: RGB; accent: RGB; glow: RGB; mix: number } {
  if (!id) {
    return { primary: NEUTRAL.rgb, accent: NEUTRAL.accentRgb, glow: NEUTRAL.glowRgb, mix: 0 };
  }
  const c = AGENT_MAP[id].color;
  return { primary: c.rgb, accent: c.accentRgb, glow: c.glowRgb, mix: 1 };
}

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [active, setActiveState] = useState<AgentId | null>(null);

  // Current (animated) colour, kept out of React state so the rAF loop never
  // triggers a render.
  const current = useRef({ p: [...NEUTRAL.rgb] as number[], a: [...NEUTRAL.accentRgb] as number[], g: [...NEUTRAL.glowRgb] as number[], mix: 0 });
  const target = useRef(paletteFor(null));
  const frame = useRef<number>(0);

  const setActive = useCallback((id: AgentId | null) => {
    setActiveState((prev) => (prev === id ? prev : id));
  }, []);

  const select = useCallback((id: AgentId) => {
    setActiveState(id);
  }, []);

  useEffect(() => {
    target.current = paletteFor(active);
  }, [active]);

  useEffect(() => {
    const root = document.documentElement;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      const k = 0.075;
      let moved = false;

      for (let i = 0; i < 3; i++) {
        const np = lerp(c.p[i], t.primary[i], k);
        const na = lerp(c.a[i], t.accent[i], k);
        const ng = lerp(c.g[i], t.glow[i], k);
        if (Math.abs(np - c.p[i]) > 0.15 || Math.abs(na - c.a[i]) > 0.15 || Math.abs(ng - c.g[i]) > 0.15) {
          moved = true;
        }
        c.p[i] = np;
        c.a[i] = na;
        c.g[i] = ng;
      }
      const nm = lerp(c.mix, t.mix, k);
      if (Math.abs(nm - c.mix) > 0.002) moved = true;
      c.mix = nm;

      if (moved) {
        root.style.setProperty("--agent-primary", c.p.map(Math.round).join(" "));
        root.style.setProperty("--agent-accent", c.a.map(Math.round).join(" "));
        root.style.setProperty("--agent-glow", c.g.map(Math.round).join(" "));
        root.style.setProperty("--agent-mix", c.mix.toFixed(3));
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const value = useMemo(() => ({ active, setActive, select }), [active, setActive, select]);

  return (
    <SceneContext.Provider value={value}>
      {children}
      <SceneAmbience />
    </SceneContext.Provider>
  );
}

/**
 * A single fixed light source behind the whole page. It never re-renders; it
 * simply reads the live variables, so the page's ambient colour follows the
 * agent who currently owns the scene.
 */
function SceneAmbience() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-30vh] h-[85vh] w-[130vw] -translate-x-1/2 rounded-full blur-[130px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--agent-primary) / calc(0.2 * var(--agent-mix) + 0.03)), transparent 62%)",
        }}
      />
      <div
        className="absolute bottom-[-35vh] right-[-10vw] h-[75vh] w-[80vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--agent-accent) / calc(0.14 * var(--agent-mix) + 0.02)), transparent 65%)",
        }}
      />
    </div>
  );
}

/**
 * Attach to a section: while it holds the viewport centre, the scene takes the
 * given colour (`null` returns it to the monochrome foundation).
 *
 * Passing a value that changes — a selected agent, say — re-runs the effect, so
 * a section that is already centred follows its own selection immediately.
 */
export function useSceneWhenCentred<T extends HTMLElement>(id: AgentId | null) {
  const { setActive } = useScene();
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, setActive]);

  return ref;
}

/** Marks a section as owned by an agent while it holds the viewport centre. */
export function useSceneOwner(id: AgentId) {
  return useSceneWhenCentred<HTMLElement>(id);
}

/** Returns the scene to the neutral foundation while a section is centred. */
export function useSceneNeutral<T extends HTMLElement>() {
  return useSceneWhenCentred<T>(null);
}

export { rgbStr };
