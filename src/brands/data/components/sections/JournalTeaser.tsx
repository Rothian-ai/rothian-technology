import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { blogCopy, posts } from '@data/data/posts';
import { SectionHeading } from '@data/components/ui/SectionHeading';
import { Button } from '@data/components/ui/Button';
import { RevealGroup, RevealItem } from '@data/components/ui/Reveal';
import { formatDate } from '@data/lib/format';
import type { Post } from '@data/types';

export function JournalTeaser({ limit = 3 }: { limit?: number }) {
  return (
    <section className="py-28 lg:py-40" aria-label="Latest writing">
      <div className="container-site">
        <SectionHeading
          eyebrow={blogCopy.eyebrow}
          headingLines={[blogCopy.heading]}
          body={blogCopy.body}
          action={
            <Button href="/data/blog" variant="outline" arrow>
              All Articles
            </Button>
          }
        />

        <RevealGroup
          gap={0.1}
          className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {posts.slice(0, limit).map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function PostCard({ post, eager = false }: { post: Post; eager?: boolean }) {
  return (
    <article className="group h-full">
      <Link to={`/data/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-ink-700 bg-ink-800">
          <img
            src={post.image}
            alt=""
            width={1456}
            height={816}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <div className="flex items-center gap-4 font-mono text-label uppercase tracking-[0.18em] text-mist">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden className="h-px w-4 bg-ink-700" />
            <span>{post.readingTime}</span>
          </div>

          <h3 className="mt-4 text-h3 leading-snug transition-colors duration-500 group-hover:text-brand-green">
            {post.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-[0.9375rem] leading-relaxed text-paper/50">
            {post.excerpt}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.2em] text-brand-green">
            Read more
            <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
