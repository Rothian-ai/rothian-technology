import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { usePageMeta } from '../lib/seo'
import { PageHero } from '../components/PageHero'
import { WorkCard } from '../components/WorkCard'
import { WORK, WORK_FILTERS } from '../data/work'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

export default function Work() {
  usePageMeta(
    'Work | Rothian Digital — results-first case studies',
    'Campaigns, brands and builds with the numbers attached: 50%+ budget saved, 60% email open rates, cost per visit 43% below benchmark.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Work', path: '/digital/work' },
    ]),
  ])

  const [filter, setFilter] = useState<string>('all')
  const visible = useMemo(
    () => (filter === 'all' ? WORK : WORK.filter((w) => w.stage === filter)),
    [filter],
  )

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="The number comes first"
        highlight={['number']}
        intro="Every case study leads with the result it delivered, then shows the thinking behind it. Where a figure is an indicative example rather than a published result, we label it."
      />

      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap gap-2.5" role="group" aria-label="Filter work by journey stage">
            {WORK_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-brand ${
                  filter === f.id
                    ? 'bg-festival-gradient text-white shadow-lg shadow-brand-magenta/25'
                    : 'border border-white/15 text-white/60 hover:border-white/35 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((item, i) => (
              <WorkCard key={item.slug} item={item} index={i} />
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="py-16 text-center text-white/50">
              Nothing in this stage yet — try another filter.
            </p>
          )}

          <Reveal delay={0.2} className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="heading-section text-3xl text-white sm:text-4xl">
              Your business could be the next number here.
            </h2>
            <Link
              to="/digital/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform hover:scale-[1.03] focus-brand"
            >
              Book a discovery call
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
