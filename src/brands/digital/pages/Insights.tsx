import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { LinkedinIcon } from '../components/ui/SocialIcons'
import { POSTS } from '../data/posts'
import { usePageMeta } from '../lib/seo'
import { PageHero } from '../components/PageHero'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Insights() {
  usePageMeta(
    'TL;DR Insights | Rothian Digital',
    'AI, search and marketing shifts decoded for UK and UAE brands — published the week they happen.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Insights', path: '/digital/insights' },
    ]),
    {
      '@type': 'Blog',
      name: 'Rothian Digital TL;DR',
      blogPost: POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        datePublished: p.date,
        url: p.url,
        abstract: p.excerpt,
      })),
    },
  ])

  const [lead, ...rest] = POSTS

  return (
    <>
      <PageHero
        eyebrow="TL;DR"
        title="Too long; we read it for you"
        highlight={['read']}
        intro="The AI and search shifts that actually change what you should do next — written the week they land, not a quarter later."
      />

      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-site">
          {/* Lead article */}
          <Reveal>
            <a
              href={lead.url}
              target="_blank"
              rel="noreferrer"
              className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-white/25 focus-brand lg:grid-cols-2"
            >
              {lead.image && (
                <div className="overflow-hidden">
                  <img
                    src={lead.image}
                    alt=""
                    className="aspect-[16/10] size-full object-cover transition-transform duration-700 group-hover:scale-105 lg:aspect-auto"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <time dateTime={lead.date} className="eyebrow text-festival-yellow">
                  Latest · {fmt(lead.date)}
                </time>
                <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/60">{lead.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-festival-rose">
                  Read the full take
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.url} delay={(i % 3) * 0.08}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 focus-brand"
                >
                  {post.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={post.date} className="eyebrow text-white/35">
                      {fmt(post.date)}
                    </time>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-festival-yellow">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/50">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-festival-rose">
                      Read
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-16 flex flex-wrap justify-center gap-4">
            <a
              href="https://digital.rothian.com/blogs/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:border-white/45 focus-brand"
            >
              Full archive — 60+ articles
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/company/rothian-digital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:border-white/45 focus-brand"
            >
              <LinkedinIcon className="size-4" />
              Follow on LinkedIn
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
