import { ArrowUpRight } from 'lucide-react'
import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { POSTS } from '../data/posts'
import { usePageMeta } from '../lib/seo'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Insights() {
  usePageMeta(
    'Industry Insights | Rothian Cyber',
    'Cybersecurity news, vulnerability breakdowns and industry analysis from the Rothian Cyber team.',
  )

  return (
    <>
      <PageHero
        eyebrow="Industry Insights"
        title="Know-how that helps you sleep at night"
        highlight={['sleep']}
        description="Cyber is an industry-wide problem — it cannot be solved by any one entity. Collaboration is king, so we take input from everywhere and give back, publishing our learnings to make the digital world safer for all."
        image="/cyber/images/analyst-silhouette.jpg"
        compact
      />

      <section className="bg-abyss-950 bg-cyber-grid py-24 sm:py-32">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 0.08} className="h-full">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-brand-cyan/40"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-6 flex-1 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-brand-cyan">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-white/40">{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-white/85">
                      Read
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer answers to articles?"
        body="Skip the reading list — book a free assessment and get insights specific to your environment."
      />
    </>
  )
}
