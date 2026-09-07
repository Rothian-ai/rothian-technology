import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@data/data/services';
import { SectionHeading } from '@data/components/ui/SectionHeading';
import { Button } from '@data/components/ui/Button';
import { RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { EASE } from '@data/lib/motion';
import { pad } from '@data/lib/format';
import { useMediaQuery } from '@data/lib/hooks';

/**
 * Services index as an editorial list rather than a card grid. On desktop the
 * hovered row previews its own artwork in a floating panel; on smaller screens
 * the same rows stack with their images inline. One layout, two densities.
 */
export function ServicesShowcase({
  limit,
  eyebrow = 'Services',
  headingLines = ['What We Build'],
  body = 'From strategy to execution, we design and deliver end-to-end data solutions that power intelligence, automation, and scalable growth.',
  showAll = false,
}: {
  limit?: number;
  eyebrow?: string;
  headingLines?: string[];
  body?: string;
  showAll?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;
  // Defaults to the first discipline so the preview panel is never empty.
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section className="relative py-28 lg:py-40" aria-label={headingLines.join(' ')}>
      <div className="container-site">
        <SectionHeading
          eyebrow={eyebrow}
          headingLines={headingLines}
          body={body}
          action={
            !showAll && (
              <Button href="/data/services" variant="outline" arrow>
                Explore More Services
              </Button>
            )
          }
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Row list */}
          <div className="lg:col-span-7" onMouseLeave={() => setActive(0)}>
            <RevealGroup gap={0.06} className="border-t border-ink-700">
              {list.map((service, i) => (
                <RevealItem key={service.slug}>
                  <Link
                    to={`/data/services/${service.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative block border-b border-ink-700 py-8 lg:py-9"
                  >
                    {/* Phosphor wash that wipes in from the left on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-6 -right-6 origin-left scale-x-0 rounded-lg bg-gradient-to-r from-brand-green/[0.07] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />

                    <div className="relative flex items-start gap-5 lg:gap-8">
                      <span className="mt-1.5 font-mono text-label text-mist transition-colors duration-500 group-hover:text-brand-green">
                        {pad(i + 1)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-h3 transition-colors duration-500 group-hover:text-brand-green">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-paper/50 lg:text-base">
                          {service.summary}
                        </p>

                        {/* Inline artwork below lg, where there is no preview panel */}
                        <div className="mt-6 overflow-hidden rounded-xl lg:hidden">
                          <img
                            src={service.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width={960}
                            height={640}
                            className="aspect-16/10 w-full object-cover"
                          />
                        </div>
                      </div>

                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-mist transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-green"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Sticky preview — desktop only */}
          {isDesktop && (
            <div className="lg:col-span-5">
              <div className="sticky top-[calc(var(--nav-h)+3rem)]">
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-ink-700 bg-ink-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={list[active].slug}
                      src={list[active].image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${list[active].slug}-label`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-x-0 bottom-0 p-7"
                    >
                      <p className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                        {pad(active + 1)} / {pad(list.length)}
                      </p>
                      <p className="mt-2 font-display text-2xl font-bold">{list[active].title}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
