import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '@data/data/site';
import { Button } from '@data/components/ui/Button';
import { SplitText } from '@data/components/ui/SplitText';
import { DataField } from '@data/components/ui/DataField';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { EASE } from '@data/lib/motion';
import { usePrefersReducedMotion } from '@data/lib/hooks';

/**
 * Homepage hero. Four depth planes — ambient video, node field, bloom, type —
 * each drifting at a different rate as the page scrolls, so the section
 * dissolves rather than simply moving away.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pt-[var(--nav-h)]"
      aria-label="Introduction"
    >
      {/* Plane 1 — ambient motion, held far back by a heavy scrim. */}
      <motion.div
        style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
        className="absolute inset-0 -z-30"
        aria-hidden
      >
        <video
          className="size-full object-cover opacity-[0.16]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/data/images/site/bg-effect-01.webp"
        >
          <source src="/data/videos/hero-ambient.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/70 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-transparent to-ink-950/60" />
      </motion.div>

      {/* Plane 2 — the connected data field. */}
      <DataField className="pointer-events-none absolute inset-0 -z-20 size-full opacity-70" />

      {/* Plane 3 — phosphor bloom. */}
      <div className="bloom left-[8%] top-[18%] size-[38rem] opacity-40" aria-hidden />
      <div className="bloom right-[2%] bottom-[6%] size-[26rem] opacity-25" aria-hidden />

      {/* Plane 4 — type. */}
      <motion.div
        style={reduced ? undefined : { y: typeY, opacity: typeOpacity }}
        className="container-site relative z-10 py-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Eyebrow>{site.tagline}</Eyebrow>
        </motion.div>

        {/* The live site sets one word of the headline in signal green; that
            accent is kept here rather than replaced with a gradient. */}
        <SplitText
          as="h1"
          immediate
          delay={0.25}
          className="mt-8 max-w-[18ch] text-display font-bold text-paper"
          lines={[
            <span key="line-1">
              Turning <span className="text-brand-green">Data</span> Into
            </span>,
            'Decisions To',
            'Drive Growth',
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          className="mt-10 max-w-xl text-lead text-paper/65"
        >
          We help businesses to build modern data platforms, AI-driven analytics, and
          future-ready infrastructures that unlock real business value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Button href="/data/contact" size="lg" arrow>
            Let&rsquo;s Talk
          </Button>
          <Button href="/data/services" size="lg" variant="outline">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.8 }}
      className="absolute inset-x-0 bottom-8 z-10 hidden justify-center md:flex"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-label uppercase tracking-[0.24em] text-mist">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ink-700">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-brand-green"
            animate={{ y: ['-100%', '280%'] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </motion.div>
  );
}
