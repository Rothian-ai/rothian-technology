import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { caseStudies } from '@data/data/work';
import { formatDate, pad } from '@data/lib/format';

export default function Work() {

  return (
    <PageTransition>
      <PageHero
        eyebrow="Portfolio"
        titleLines={['Proof, not', 'promises']}
        lead="Selected engagements where modern data engineering changed how a business makes decisions."
        crumbs={[{ label: 'Home', href: '/data' }, { label: 'Portfolio' }]}
        media="/data/images/site/flip-section.webp"
      />

      <section className="pb-28 lg:pb-40" aria-label="Case studies">
        <div className="container-site">
          <RevealGroup gap={0.1} className="flex flex-col gap-16 lg:gap-24">
            {caseStudies.map((study, i) => (
              <RevealItem key={study.slug}>
                <article className="group">
                  <Link to={`/data/portfolio/${study.slug}`} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 lg:col-span-7">
                      <img
                        src={study.image}
                        alt=""
                        width={1456}
                        height={816}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="aspect-16/10 w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="flex flex-col justify-center lg:col-span-5">
                      <span className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                        {pad(i + 1)} — <time dateTime={study.date}>{formatDate(study.date)}</time>
                      </span>

                      <h2 className="mt-6 text-h2 leading-[1.1] transition-colors duration-500 group-hover:text-brand-green">
                        {study.title}
                      </h2>

                      <p className="mt-6 text-lead text-paper/55">{study.summary}</p>

                      <ul className="mt-8 flex flex-wrap gap-2">
                        {study.services.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-ink-700 px-4 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-paper/60"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.2em] text-brand-green">
                        View case study
                        <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GlobalCta />
    </PageTransition>
  );
}
