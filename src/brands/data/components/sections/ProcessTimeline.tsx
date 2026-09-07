import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { ProcessStep } from '@data/types';
import { SectionHeading } from '@data/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { pad } from '@data/lib/format';
import { serviceCopy } from '@data/data/services';

/**
 * Scroll-drawn process rail. A single spine runs the height of the list and
 * fills in as you read, so progress through the method is legible at a glance
 * rather than implied by numbering alone.
 */
export function ProcessTimeline({
  steps,
  eyebrow = serviceCopy.processEyebrow,
  heading = serviceCopy.processHeading,
  body = serviceCopy.processBody,
}: {
  steps: ProcessStep[];
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="relative py-28 lg:py-40" aria-label="Our process">
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} headingLines={[heading]} body={body} />

        <div ref={railRef} className="relative mt-16 lg:mt-24">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-[0.6875rem] w-px bg-ink-700 lg:left-[1.4375rem]"
          >
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-brand-green to-brand-green/30"
            />
          </div>

          <RevealGroup gap={0.12} className="flex flex-col gap-14 lg:gap-20">
            {steps.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="relative flex gap-8 pl-0 lg:gap-14">
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <span className="flex size-6 items-center justify-center rounded-full border border-brand-green/40 bg-ink-950 lg:size-12">
                      <span className="size-2 rounded-full bg-brand-green lg:size-2.5" />
                    </span>
                  </div>

                  <div className="grid flex-1 gap-4 pt-0.5 lg:grid-cols-12 lg:gap-10 lg:pt-2">
                    <div className="lg:col-span-4">
                      <span className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                        Step {pad(i + 1)}
                      </span>
                      <h3 className="mt-4 text-h3">{step.title}</h3>
                    </div>
                    <p className="text-lead text-paper/55 lg:col-span-8 lg:pt-1">{step.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
