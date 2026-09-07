import { useEffect, useRef } from "react";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import type { AgentId } from "@ui4ai/lib/agents";
import { cn, seeded } from "@ui4ai/lib/utils";

/**
 * Each agent lives in a different visual system. The four renderers below are
 * the page's core metaphor, so they are drawn rather than decorated:
 *
 *   amelia   navigation — great-circle routes, waypoints, a heading in motion
 *   albert   imagination — a geometric field deformed by an idea at its centre
 *   isaac    motion — orbital bodies carrying momentum around a common mass
 *   marie    discovery — emitted particles read against measurement rings
 *
 * All four share one canvas host: device-pixel aware, paused when off-screen,
 * and reduced to a single static frame when the visitor asks for less motion.
 */

type Mode = AgentId;

interface Props {
  mode: Mode;
  className?: string;
  /** Overall opacity of the field; the surrounding section sets the mood. */
  intensity?: number;
  /** Primary colour, as "r g b". Defaults to the live scene colour. */
  rgb?: string;
  /** Secondary colour, as "r g b". Falls back to `rgb`, then to the scene. */
  accentRgb?: string;
}

interface Ctx {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  t: number;
  color: (alpha: number) => string;
  accent: (alpha: number) => string;
  /** Per-canvas scratch space, so two instances of a field never share state. */
  state: FieldState;
}

interface FieldState {
  particles?: Particle[];
}

export function AgentField({ mode, className, intensity = 1, rgb, accentRgb }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let t = 0;
    let w = 0;
    let h = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = Math.max(1, canvas.clientWidth || canvas.getBoundingClientRect().width);
      h = Math.max(1, canvas.clientHeight || canvas.getBoundingClientRect().height);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width === bw && canvas.height === bh) return;
      canvas.width = bw;
      canvas.height = bh;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause when scrolled out of view — four fields on one page adds up.
    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduced) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(canvas);

    const readColor = () => {
      if (rgb) return rgb;
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--agent-primary")
        .trim();
      return v || "148 152 170";
    };
    const readAccent = () => {
      if (accentRgb) return accentRgb;
      if (rgb) return rgb;
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--agent-accent")
        .trim();
      return v || "120 124 145";
    };

    const state: FieldState = {};
    let colorCache = readColor();
    let accentCache = readAccent();
    let colorTick = 0;

    const draw = () => {
      // Re-reading computed style every frame is wasteful; 6 fps is plenty for
      // a colour that eases over ~1s.
      if (colorTick++ % 10 === 0) {
        colorCache = readColor();
        accentCache = readAccent();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = intensity;

      const scene: Ctx = {
        ctx,
        w,
        h,
        t,
        color: (a) => `rgb(${colorCache} / ${a})`,
        accent: (a) => `rgb(${accentCache} / ${a})`,
        state,
      };

      RENDERERS[mode](scene);
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      t += 1;
      // The observer above handles ordinary resizes; this catches the case
      // where the element was laid out after the effect first measured it.
      if (t % 15 === 0) resize();
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      t = 240; // a settled frame rather than an empty one
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [mode, intensity, rgb, accentRgb, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}

/* ==================================================================== amelia
   Navigation. Routes arc between waypoints over a curved horizon; a heading
   marker travels one of them. */

function navigation({ ctx, w, h, t, color, accent }: Ctx) {
  const time = t * 0.0016;

  // horizon
  ctx.beginPath();
  ctx.moveTo(-40, h * 0.74);
  ctx.quadraticCurveTo(w * 0.5, h * 0.6, w + 40, h * 0.74);
  ctx.strokeStyle = color(0.22);
  ctx.lineWidth = 1;
  ctx.stroke();

  // meridians
  for (let i = 0; i <= 8; i++) {
    const x = (w / 8) * i;
    ctx.beginPath();
    ctx.moveTo(x, h * 0.74 + Math.sin((i / 8) * Math.PI) * -h * 0.14);
    ctx.lineTo(x + (x - w / 2) * 0.28, h + 20);
    ctx.strokeStyle = color(0.06);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // route arcs
  const routes = [
    { a: [0.08, 0.62], b: [0.94, 0.3], lift: 0.26, speed: 1 },
    { a: [0.14, 0.28], b: [0.86, 0.66], lift: -0.18, speed: 0.74 },
    { a: [0.3, 0.84], b: [0.72, 0.14], lift: 0.2, speed: 1.3 },
  ];

  routes.forEach((r, i) => {
    const x1 = r.a[0] * w;
    const y1 = r.a[1] * h;
    const x2 = r.b[0] * w;
    const y2 = r.b[1] * h;
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2 - r.lift * h;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.strokeStyle = i === 0 ? color(0.42) : color(0.14);
    ctx.lineWidth = i === 0 ? 1.3 : 1;
    ctx.setLineDash(i === 0 ? [] : [3, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    // heading marker travelling the route
    const p = (time * r.speed * 0.35 + i * 0.33) % 1;
    const mx = (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * cx + p * p * x2;
    const my = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * cy + p * p * y2;

    const g = ctx.createRadialGradient(mx, my, 0, mx, my, 26);
    g.addColorStop(0, accent(0.55));
    g.addColorStop(1, accent(0));
    ctx.fillStyle = g;
    ctx.fillRect(mx - 26, my - 26, 52, 52);

    ctx.beginPath();
    ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = accent(0.95);
    ctx.fill();

    // waypoints
    [
      [x1, y1],
      [x2, y2],
    ].forEach(([px, py]) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = color(0.5);
      ctx.lineWidth = 1;
      ctx.strokeRect(-3.2, -3.2, 6.4, 6.4);
      ctx.restore();
    });
  });
}

/* ==================================================================== albert
   Imagination. A regular lattice deformed by an idea sitting at its centre —
   the frame bends, and structure appears. */

function geometry({ ctx, w, h, t, color, accent }: Ctx) {
  const time = t * 0.0045;
  const cols = 16;
  const rows = 10;
  const cx = w * (0.5 + Math.sin(time * 0.3) * 0.06);
  const cy = h * (0.5 + Math.cos(time * 0.24) * 0.05);
  const mass = Math.min(w, h) * 0.42;

  const point = (i: number, j: number) => {
    const x0 = (w / cols) * i;
    const y0 = (h / rows) * j;
    const dx = x0 - cx;
    const dy = y0 - cy;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const pull = Math.exp(-(d * d) / (2 * mass * mass)) * mass * 0.34;
    return [x0 - (dx / d) * pull, y0 - (dy / d) * pull * 0.72] as const;
  };

  ctx.lineWidth = 1;
  for (let j = 0; j <= rows; j++) {
    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      const [x, y] = point(i, j);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color(0.085);
    ctx.stroke();
  }
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    for (let j = 0; j <= rows; j++) {
      const [x, y] = point(i, j);
      j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color(0.055);
    ctx.stroke();
  }

  // the idea at the centre, and the structure it implies
  const nodes = 6;
  const r = mass * 0.36;
  const pts: [number, number][] = [];
  for (let i = 0; i < nodes; i++) {
    const a = (i / nodes) * Math.PI * 2 + time * 0.16;
    pts.push([cx + Math.cos(a) * r * (1 + Math.sin(time + i) * 0.1), cy + Math.sin(a) * r * 0.62]);
  }
  for (let i = 0; i < nodes; i++) {
    for (let j = i + 1; j < nodes; j++) {
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[j][0], pts[j][1]);
      ctx.strokeStyle = accent(0.09);
      ctx.stroke();
    }
  }
  pts.forEach(([x, y], i) => {
    const pulse = 0.5 + Math.sin(time * 1.6 + i) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, 2 + pulse * 1.4, 0, Math.PI * 2);
    ctx.fillStyle = accent(0.5 + pulse * 0.4);
    ctx.fill();
  });

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, mass * 0.5);
  g.addColorStop(0, accent(0.16));
  g.addColorStop(1, accent(0));
  ctx.fillStyle = g;
  ctx.fillRect(cx - mass, cy - mass, mass * 2, mass * 2);
}

/* ===================================================================== isaac
   Motion. Bodies on inclined orbits, each carrying its own momentum around a
   shared centre of mass. */

function orbit({ ctx, w, h, t, color, accent }: Ctx) {
  const time = t * 0.004;
  const cx = w * 0.5;
  const cy = h * 0.52;
  const base = Math.min(w, h) * 0.5;

  const rings = [
    { rx: 0.44, ry: 0.15, tilt: -0.16, speed: 0.9, bodies: 2 },
    { rx: 0.66, ry: 0.24, tilt: 0.12, speed: 0.58, bodies: 3 },
    { rx: 0.9, ry: 0.34, tilt: -0.3, speed: 0.36, bodies: 2 },
    { rx: 1.16, ry: 0.46, tilt: 0.24, speed: 0.24, bodies: 3 },
  ];

  rings.forEach((ring, ri) => {
    const rx = base * ring.rx;
    const ry = base * ring.ry;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ring.tilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = color(0.12 - ri * 0.014);
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let b = 0; b < ring.bodies; b++) {
      const a = time * ring.speed + (b / ring.bodies) * Math.PI * 2 + ri;
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;

      // trail — momentum made visible
      ctx.beginPath();
      for (let k = 0; k < 22; k++) {
        const ka = a - k * 0.028;
        const kx = Math.cos(ka) * rx;
        const ky = Math.sin(ka) * ry;
        k === 0 ? ctx.moveTo(kx, ky) : ctx.lineTo(kx, ky);
      }
      ctx.strokeStyle = accent(0.2);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
      g.addColorStop(0, accent(0.6));
      g.addColorStop(1, accent(0));
      ctx.fillStyle = g;
      ctx.fillRect(x - 18, y - 18, 36, 36);

      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = accent(0.95);
      ctx.fill();
    }
    ctx.restore();
  });

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.34);
  core.addColorStop(0, color(0.3));
  core.addColorStop(0.5, color(0.07));
  core.addColorStop(1, color(0));
  ctx.fillStyle = core;
  ctx.fillRect(cx - base, cy - base, base * 2, base * 2);
}

/* ===================================================================== marie
   Discovery. Emission read against measurement rings — signal separating from
   noise as it is observed. */

interface Particle {
  a: number;
  r: number;
  v: number;
  life: number;
  size: number;
  strong: boolean;
}

function particles({ ctx, w, h, t, color, accent, state }: Ctx) {
  const cx = w * 0.5;
  const cy = h * 0.54;
  const max = Math.min(w, h) * 0.62;

  if (!state.particles) {
    const rand = seeded(20260828);
    state.particles = Array.from({ length: 74 }, () => ({
      a: rand() * Math.PI * 2,
      r: rand() * max,
      v: 0.25 + rand() * 0.75,
      life: rand(),
      size: 0.7 + rand() * 1.5,
      strong: rand() > 0.78,
    }));
  }

  // measurement rings
  for (let i = 1; i <= 4; i++) {
    const r = (max / 4) * i;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = color(0.075);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 9]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // reading axes
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + t * 0.0004;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * max, cy + Math.sin(a) * max);
    ctx.strokeStyle = color(0.045);
    ctx.stroke();
  }

  state.particles.forEach((p) => {
    p.r += p.v * 0.5;
    p.life += 0.004;
    if (p.r > max) {
      p.r = 0;
      p.a = Math.random() * Math.PI * 2;
      p.life = 0;
    }
    const x = cx + Math.cos(p.a) * p.r;
    const y = cy + Math.sin(p.a) * p.r * 0.88;
    const fade = 1 - p.r / max;

    if (p.strong) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
      g.addColorStop(0, accent(0.5 * fade));
      g.addColorStop(1, accent(0));
      ctx.fillStyle = g;
      ctx.fillRect(x - 14, y - 14, 28, 28);
    }

    ctx.beginPath();
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.strong ? accent(0.85 * fade) : color(0.4 * fade);
    ctx.fill();
  });

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, max * 0.4);
  g.addColorStop(0, accent(0.2));
  g.addColorStop(1, accent(0));
  ctx.fillStyle = g;
  ctx.fillRect(cx - max, cy - max, max * 2, max * 2);
}

const RENDERERS: Record<Mode, (c: Ctx) => void> = {
  amelia: navigation,
  albert: geometry,
  isaac: orbit,
  marie: particles,
};
