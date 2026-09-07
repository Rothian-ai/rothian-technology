import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '@data/components/layout/PageTransition';
import { GlobalCta } from '@data/components/sections/GlobalCta';
import { PostCard } from '@data/components/sections/JournalTeaser';
import { PageHero } from '@data/components/sections/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { getPost, posts } from '@data/data/posts';
import { site, socials } from '@data/data/site';
import { formatDate } from '@data/lib/format';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);


  if (!post) return <Navigate to="/data/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageTransition>
      <PageHero
        eyebrow={formatDate(post.date)}
        titleLines={[post.title]}
        crumbs={[
          { label: 'Home', href: '/data' },
          { label: 'Blog', href: '/data/blog' },
          { label: post.readingTime },
        ]}
      />

      <article className="pb-28 lg:pb-40">
        <div className="container-site">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-800">
              <img
                src={post.image}
                alt=""
                width={1456}
                height={816}
                fetchPriority="high"
                decoding="async"
                className="aspect-16/9 w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>

        <div className="container-reading mt-16 lg:mt-24">
          {/* Standfirst — set larger than body, as a magazine would */}
          <Reveal>
            <p className="border-l-2 border-brand-green pl-6 text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.6] text-paper/80">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-2xl border border-ink-700 bg-ink-800/50 p-8 lg:p-10">
              <p className="font-mono text-label uppercase tracking-[0.22em] text-brand-green">
                Full article
              </p>
              <p className="mt-5 text-paper/60">
                The complete piece is being prepared for publication. In the meantime, our team is
                happy to talk through any of the themes above and what they mean for your data
                platform.
              </p>
              <Link
                to="/data/contact"
                className="group mt-7 inline-flex items-center gap-2 font-medium text-brand-green"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink-700 pt-8">
              <div>
                <p className="font-mono text-label uppercase tracking-[0.2em] text-mist">Written by</p>
                <p className="mt-2 font-display text-lg font-bold">{site.name}</p>
              </div>

              <div className="flex items-center gap-5">
                <span className="font-mono text-label uppercase tracking-[0.2em] text-mist">Share</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-label uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-brand-green"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-label uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-brand-green"
                >
                  X
                </a>
                <a
                  href={socials[0].href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-label uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-brand-green"
                >
                  Follow
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-ink-700 py-28 lg:py-40" aria-label="More articles">
        <div className="container-site">
          <h2 className="text-h2">More from the Matrix</h2>
          <RevealGroup gap={0.09} className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GlobalCta />
    </PageTransition>
  );
}
