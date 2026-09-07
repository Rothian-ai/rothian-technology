import { useEffect, useRef } from "react";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { AGENTS } from "@ui4ai/lib/agents";
import { cn, clamp, seeded } from "@ui4ai/lib/utils";

/**
 * The hero environment: four separate intelligence systems, each running its
 * own behaviour in its own quadrant, gradually drawn toward a common centre
 * until they link into one network.
 *
 * Different minds. Connected intelligence.
 *
 * `progress` (0 → 1) drives convergence, so the caller can tie it to scroll or
 * simply let it play once on load.
 */

interface Node {
  /** Home position within its own system, in unit space. */
  hx: number;
  hy: number;
  /** Position in the converged network. */
  cx: number;
  cy: number;
  x: number;
  y: number;
  agent: number;
  phase: number;
  size: number;
}

export function ConvergenceField({
  className,
  autoplay = true,
}: {
  className?: string;
  autoplay?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let t = 0;

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

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduced) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(canvas);

    // Four clusters, one per agent, arranged around the frame. Each converges
    // onto a ring position at the centre.
    const rand = seeded(97531);
    const centres = [
      [0.2, 0.28],
      [0.8, 0.26],
      [0.22, 0.76],
      [0.78, 0.78],
    ];
    const perCluster = 13;
    const nodes: Node[] = [];

    centres.forEach(([qx, qy], ai) => {
      for (let i = 0; i < perCluster; i++) {
        const a = (i / perCluster) * Math.PI * 2;
        const spread = 0.055 + rand() * 0.1;
        const ringA = (ai / 4) * Math.PI * 2 + (i / perCluster) * (Math.PI / 2) - Math.PI / 4;
        const ringR = 0.1 + (i % 3) * 0.052;
        nodes.push({
          hx: qx + Math.cos(a) * spread * 1.5,
          hy: qy + Math.sin(a) * spread,
          cx: 0.5 + Math.cos(ringA) * ringR * 1.7,
          cy: 0.5 + Math.sin(ringA) * ringR,
          x: 0,
          y: 0,
          agent: ai,
          phase: rand() * Math.PI * 2,
          size: 1 + rand() * 1.8,
        });
      }
    });

    const palettes = AGENTS.map((a) => a.color.rgb);
    const started = performance.now();

    function loop() {
      if (!running) return;
      t += 1;
      if (t % 15 === 0) resize();
      // ~3.4s ease into the converged network, which then holds and breathes.
      const elapsed = (performance.now() - started) / 1000;
      const raw = autoplay ? clamp(elapsed / 3.4) : 0;
      draw((1 - Math.pow(1 - raw, 3)) * 0.82);
      raf = requestAnimationFrame(loop);
    }

    const draw = (p: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.006;
      const conv = clamp(p);

      // resolve positions
      nodes.forEach((n) => {
        const drift = reduced ? 0 : Math.sin(time * 0.7 + n.phase) * 0.006;
        const ux = n.hx + (n.cx - n.hx) * conv + drift;
        const uy = n.hy + (n.cy - n.hy) * conv + drift * 1.4;
        n.x = ux * w;
        n.y = uy * h;
      });

      // intra-cluster links (always) + cross-cluster links (as it converges)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const same = a.agent === b.agent;
          if (!same && conv < 0.42) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          const reach = same ? Math.min(w, h) * 0.22 : Math.min(w, h) * 0.3;
          if (d > reach) continue;

          const strength = (1 - d / reach) * (same ? 0.3 : 0.36 * (conv - 0.42) * 1.7);
          if (strength <= 0.004) continue;

          const [r1, g1, b1] = palettes[a.agent];
          const [r2, g2, b2] = palettes[b.agent];
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgb(${r1} ${g1} ${b1} / ${strength})`);
          grad.addColorStop(1, `rgb(${r2} ${g2} ${b2} / ${strength})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = same ? 1 : 1.1;
          ctx.stroke();
        }
      }

      // nodes
      nodes.forEach((n) => {
        const [r, g, b] = palettes[n.agent];
        const pulse = reduced ? 0.6 : 0.5 + Math.sin(time * 1.4 + n.phase) * 0.5;

        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
        halo.addColorStop(0, `rgb(${r} ${g} ${b} / ${0.22 + pulse * 0.22})`);
        halo.addColorStop(1, `rgb(${r} ${g} ${b} / 0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(n.x - 22, n.y - 22, 44, 44);

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * (0.8 + pulse * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r} ${g} ${b} / ${0.55 + pulse * 0.4})`;
        ctx.fill();
      });
    };

    if (reduced) {
      draw(0.68);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced, autoplay]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
