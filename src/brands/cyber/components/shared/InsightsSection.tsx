import { ArrowUpRight } from 'lucide-react'
import { POSTS } from '../../data/posts'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Latest industry insights — three most recent posts from the live blog. */
export function InsightsSection({ limit = 3 }: { limit?: number }) {
  return (
    <section className="bg-abyss-900 py-24 sm:py-32">
      <div className="container-site">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 sm:mb-16">
          <SectionHeading
            eyebrow="Industry Insights"
            title="Know-how that helps you sleep at night"
            highlight={['sleep']}
            description="Cyber is an industry-wide problem — collaboration is king. We publish our own learnings to make the digital world safer for everyone."
          />
          <Reveal delay={0.2}>
            <Button to="/cyber/insights" variant="outline" withArrow>
              View All Insights
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.slice(0, limit).map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1} className="h-full">
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-brand-cyan/40"
              >
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/50"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 flex-1 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-brand-cyan">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-white/85">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
