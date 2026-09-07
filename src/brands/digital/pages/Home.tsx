import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Marquee } from '../components/ui/Marquee'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CLIENTS } from '../data/clients'
import { POSTS } from '../data/posts'
import { EASE } from '../lib/motion'
import { usePageMeta } from '../lib/seo'
import { ColourBurstCanvas } from '../components/ColourBurstCanvas'
import { ReimaginedSlider } from '../components/ReimaginedSlider'
import { ShowcaseGallery } from '../components/ShowcaseGallery'
import { WorkCard } from '../components/WorkCard'
import { ACCENT, JOURNEY } from '../data/journey'
import { WORK } from '../data/work'
import { ORGANIZATION, useJsonLd, WEBSITE } from '../lib/schema'

const AWARDS = [
  { src: '/digital/images/awards/designrush.svg', alt: 'Rothian Digital on DesignRush' },
  { src: '/digital/images/awards/goodfirms.svg', alt: 'Top Web Design Company on GoodFirms' },
  { src: '/digital/images/awards/topdevelopers.png', alt: 'Top Developers 2025' },
]

export default function Home() {
  usePageMeta(
    'Rothian Digital | Reimagining your business — AI-native creative marketing',
    'The AI-native creative marketing agency. Human creativity, AI velocity. Brand, experience, growth and AI visibility across the UK and UAE. No upfront costs, no bs.',
  )
  useJsonLd([ORGANIZATION, WEBSITE])

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink-950">
        <div className="absolute inset-0" aria-hidden>
          <ColourBurstCanvas />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_45%,transparent_25%,rgba(8,6,10,0.72)_100%)]"
          aria-hidden
        />

        <div className="container-site relative z-10 py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="eyebrow mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/85 backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-festival-yellow" aria-hidden />
            No upfront costs, no bs
          </motion.p>

          <h1 className="heading-display mx-auto max-w-5xl text-[3rem] text-white sm:text-7xl lg:text-[6.5rem]">
            {['Reimagining', 'your', 'business.'].map((word, i) => (
              // The space is a real text node *between* the inline-blocks, so the
              // heading still reads "Reimagining your business." to screen readers
              // and to anything extracting the text (a space inside an
              // inline-block would collapse away).
              <Fragment key={word}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.8, ease: EASE }}
                  className={`inline-block ${i === 1 ? 'text-festival-gradient' : ''}`}
                >
                  {word}
                </motion.span>
                {i < 2 ? ' ' : null}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            The AI-native creative marketing agency. Human creativity, AI velocity — from strategy and
            brand to growth and AI visibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
            className="mt-11 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/digital/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white shadow-[0_10px_40px_-8px_rgba(168,24,122,0.7)] transition-transform duration-300 hover:scale-[1.03] focus-brand"
            >
              Book a discovery call
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <Link
              to="/digital/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 font-display font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/50 focus-brand"
            >
              See the results
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-16 text-xs uppercase tracking-[0.2em] text-white/30"
          >
            Move your cursor · tap the colour
          </motion.p>
        </div>
      </section>

      {/* ══ THE REIMAGINED MOMENT ══ */}
      <section className="relative bg-ink-950 py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-14 max-w-3xl">
            <SectionHeading
              eyebrow="The difference, dragged into view"
              title="Grey and generic, or unmistakably you"
              highlight={['you']}
              description="Most brands look like their competitors. Drag the handle — this is the same work before and after we get hold of it."
              dark
            />
          </div>
          <ReimaginedSlider
            image="/digital/images/services/social-media-management.webp"
            alt="Rothian Digital social media creative for client brands"
          />
          <Reveal as="p" delay={0.2} className="mt-6 text-sm text-white/40">
            Real client work. Left: the world without art direction. Right: what we shipped.
          </Reveal>
        </div>
      </section>

      {/* ══ WHAT WE DO — journey teaser ══ */}
      <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Four stages. One growth engine."
            highlight={['engine.']}
            description="We help at every stage — building not just assets, but a machine for brand growth."
            dark
            className="mb-16 max-w-3xl"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((stage, i) => {
              const accent = ACCENT[stage.accent]
              const aiCount = stage.services.filter((s) => s.ai).length
              return (
                <Reveal key={stage.id} delay={i * 0.08}>
                  <Link
                    to={`/digital/services#stage-${stage.id}`}
                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 focus-brand"
                  >
                    <span className={`font-display text-sm font-bold tracking-widest ${accent.text}`}>
                      {stage.index}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                      {stage.discipline}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
                      {stage.promise}
                    </p>
                    <p className="mt-6 flex items-center gap-2 text-xs text-white/40">
                      <span>{stage.services.length} services</span>
                      {aiCount > 0 && (
                        <>
                          <span className="text-white/20">·</span>
                          <span className="inline-flex items-center gap-1 text-festival-yellow">
                            <Sparkles className="size-3" aria-hidden />
                            {aiCount} AI-native
                          </span>
                        </>
                      )}
                    </p>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.2} className="mt-12">
            <Link
              to="/digital/services"
              className="group inline-flex items-center gap-2 font-display font-semibold text-white underline decoration-festival-orange decoration-2 underline-offset-8 transition-colors hover:text-festival-yellow focus-brand"
            >
              Walk the whole journey
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ SELECTED WORK ══ */}
      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Selected work"
              title="Results first. Story second."
              highlight={['Results']}
              description="Every case study leads with the number it moved."
              dark
            />
            <Reveal delay={0.15}>
              <Link
                to="/digital/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 focus-brand"
              >
                All work
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {WORK.slice(0, 3).map((item, i) => (
              <WorkCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CREATIVE SHOWCASE TEASER ══ */}
      <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl animate-drift"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.6), rgba(244,63,94,0.4) 55%, transparent 75%)',
          }}
        />
        <div className="container-site relative">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Creative showcase"
              title="Generative work that still has taste"
              highlight={['taste']}
              description="Every piece shows the brief that started it and the human decision that finished it."
              dark
            />
            <Reveal delay={0.15}>
              <Link
                to="/digital/showcase"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 focus-brand"
              >
                Open the gallery
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
          <ShowcaseGallery limit={3} showFilters={false} />
        </div>
      </section>

      {/* ══ TRUST ══ */}
      <section className="border-y border-white/10 bg-ink-950 py-20">
        <div className="container-site mb-12 text-center">
          <Reveal as="p" className="eyebrow text-white/40">
            Trusted by teams across the UK and UAE
          </Reveal>
        </div>
        <Marquee>
          {CLIENTS.map((client) => (
            <div key={client.name} className="mx-8 flex h-24 w-56 shrink-0 items-center justify-center sm:mx-10 sm:h-28 sm:w-64">
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="size-full object-contain opacity-50 brightness-0 invert transition-all duration-500 hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
        <div className="container-site mt-16 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {AWARDS.map((a) => (
            <img
              key={a.alt}
              src={a.src}
              alt={a.alt}
              loading="lazy"
              className="h-16 w-auto opacity-60 transition-opacity hover:opacity-100 sm:h-20"
            />
          ))}
        </div>
      </section>

      {/* ══ INSIGHTS ══ */}
      <section className="bg-ink-900 py-24 sm:py-32">
        <div className="container-site">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="TL;DR"
              title="We publish what we practise"
              description="AI, search and marketing shifts decoded the week they happen."
              dark
            />
            <Reveal delay={0.15}>
              <Link
                to="/digital/insights"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 focus-brand"
              >
                All insights
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.slice(0, 3).map((post, i) => (
              <Reveal key={post.url} delay={i * 0.08}>
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
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className="mt-3 flex-1 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-festival-yellow">
                      {post.title}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-festival-rose">
                      Read
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
