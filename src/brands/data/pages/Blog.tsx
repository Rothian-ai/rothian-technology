import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { PostCard } from '@data/components/sections/JournalTeaser';
import { Reveal, RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { blogCopy, posts } from '@data/data/posts';
import { formatDate } from '@data/lib/format';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Blog() {

  const [lead, ...rest] = posts;

  return (
    <PageTransition>
      <PageHero
        eyebrow={blogCopy.eyebrow}
        titleLines={['What’s New in', 'the Data Matrix']}
        lead={blogCopy.body}
        crumbs={[{ label: 'Home', href: '/data' }, { label: 'Blog' }]}
        media="/data/images/site/bg-effect-01.webp"
      />

      {/* Lead story — full-width editorial slot */}
      <section className="pb-20 lg:pb-28" aria-label="Featured article">
        <div className="container-site">
          <Reveal>
            <article className="group">
              <Link to={`/data/blog/${lead.slug}`} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 lg:col-span-7">
                  <img
                    src={lead.image}
                    alt=""
                    width={1456}
                    height={816}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-16/10 w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>

                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="flex items-center gap-4 font-mono text-label uppercase tracking-[0.18em] text-brand-green">
                    <span>Latest</span>
                    <span aria-hidden className="h-px w-6 bg-brand-green/50" />
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </div>

                  <h2 className="mt-6 text-h2 leading-[1.08] transition-colors duration-500 group-hover:text-brand-green">
                    {lead.title}
                  </h2>

                  <p className="mt-6 text-lead text-paper/55">{lead.excerpt}</p>

                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.2em] text-brand-green">
                    Read more
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 lg:pb-40" aria-label="All articles">
        <div className="container-site">
          <div className="rule mb-16" />
          <RevealGroup gap={0.09} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <RevealItem key={post.slug}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GlobalCta />
    </PageTransition>
  );
}
