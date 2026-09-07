import { motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@ui4ai/hooks/use-reduced-motion";
import { cn, EASE } from "@ui4ai/lib/utils";

/* ------------------------------------------------------------------ reveal */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------- word reveal */

/**
 * The words start translated a full line below their mask, which clips them
 * away entirely. An IntersectionObserver on a word would therefore never fire —
 * it is clipped because it has not animated, and it cannot animate because it
 * is clipped. So the viewport trigger lives on the unclipped wrapper, and the
 * words follow it as variants.
 */
const lineContainer: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "div";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline-flex flex-wrap gap-x-[0.26em]"
        custom={delay}
        variants={lineContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="line-mask">
            <motion.span
              className="inline-block will-change-transform"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ---------------------------------------------------------------- magnetic */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------- counter */

export function Counter({
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------- typewriter */

export function useTypewriter(text: string, active: boolean, speed = 26) {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    if (reduced) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed, reduced]);

  return out;
}
