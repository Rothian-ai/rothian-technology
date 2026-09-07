import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { SplitText } from '@data/components/ui/SplitText';
import { EASE } from '@data/lib/motion';
import { cn } from '@data/lib/cn';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** One entry per masked line. */
  titleLines: string[];
  lead?: string;
  crumbs?: Crumb[];
  /** Optional artwork behind the type. */
  media?: string;
  /** object-position for that artwork, when the subject isn't centred. */
  mediaPosition?: 'center' | 'top' | 'bottom';
  children?: ReactNode;
  align?: 'left' | 'center';
}

/**
 * Interior-page hero. Shorter than the homepage's full-viewport treatment so
 * the page's actual content starts above the fold, but built from the same
 * bloom + masked-type language.
 */
export function PageHero({
  eyebrow,
  titleLines,
  lead,
  crumbs,
  media,
  mediaPosition = 'center',
  children,
  align = 'left',
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+5rem)] lg:pb-28 lg:pt-[calc(var(--nav-h)+8rem)]">
      {media && (
        <div className="absolute inset-0 -z-20" aria-hidden>
          <img
            src={media}
            alt=""
            fetchPriority="high"
            decoding="async"
            className={cn(
              'size-full object-cover opacity-70',
              mediaPosition === 'top' && 'object-top',
              mediaPosition === 'bottom' && 'object-bottom',
            )}
          />
          {/* Two crossed scrims: the vertical one anchors the art to the page
              edges, the horizontal one clears the column the type sits in.
              Kept light in the middle so the artwork actually reads. */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/40 to-ink-950" />
          <div
            className={cn(
              'absolute inset-0',
              centered
                ? 'bg-ink-950/55'
                : 'bg-gradient-to-r from-ink-950 via-ink-950/75 to-transparent',
            )}
          />
        </div>
      )}

      <div className="bloom -left-24 top-0 size-[32rem] opacity-30" aria-hidden />

      <div className={cn('container-site relative', centered && 'text-center')}>
        {crumbs && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={cn('mb-8 flex flex-wrap items-center gap-2 font-mono text-label uppercase tracking-[0.18em] text-mist', centered && 'justify-center')}
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="size-3 text-ink-700" aria-hidden />}
                {c.href ? (
                  <Link to={c.href} className="transition-colors hover:text-brand-green">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-paper/70" aria-current="page">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>

        <SplitText
          as="h1"
          immediate
          delay={0.18}
          lines={titleLines}
          className={cn('mt-7 text-h1', centered && 'mx-auto max-w-5xl')}
        />

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className={cn('mt-8 max-w-2xl text-lead text-paper/60', centered && 'mx-auto')}
          >
            {lead}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
