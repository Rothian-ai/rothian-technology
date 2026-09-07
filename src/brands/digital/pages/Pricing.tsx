import { motion } from 'framer-motion'
import { Check, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { PLAN_CATEGORIES, type Plan } from '../data/plans'
import { EASE } from '../lib/motion'
import { usePageMeta } from '../lib/seo'
import { PageHero } from '../components/PageHero'
import { breadcrumbs, ORGANIZATION, useJsonLd } from '../lib/schema'

function PlanCard({ plan, yearly, delay }: { plan: Plan; yearly: boolean; delay: number }) {
  const price = yearly && plan.yearly !== undefined ? plan.yearly : plan.monthly

  return (
    <Reveal
      delay={delay}
      className={`relative flex h-full flex-col rounded-3xl p-8 ${
        plan.popular
          ? 'border border-transparent bg-white/[0.07] ring-1 ring-festival-orange/50'
          : 'border border-white/10 bg-white/[0.03]'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-8 rounded-full bg-festival-gradient px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white">
          Most chosen
        </span>
      )}

      <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
      <p className="mt-5 flex items-baseline gap-2">
        {typeof price === 'number' ? (
          <>
            <span className="font-display text-5xl font-extrabold tracking-tight text-white">
              ${price.toLocaleString()}
            </span>
            <span className="text-white/45">/ month</span>
          </>
        ) : (
          <span className="font-display text-5xl font-extrabold tracking-tight text-white">
            Custom
          </span>
        )}
      </p>
      {yearly && plan.yearly !== undefined && (
        <p className="mt-1.5 text-xs font-medium text-festival-yellow">
          Billed yearly — better rate
        </p>
      )}

      <ul className="mt-8 flex flex-1 flex-col gap-3.5">
        {plan.features.map((f) => {
          const text = yearly && f.yearlyText ? f.yearlyText : f.text
          return (
            <li
              key={f.text}
              className={`flex items-start gap-3 text-sm leading-relaxed ${
                f.included ? 'text-white/75' : 'text-white/25 line-through decoration-white/15'
              }`}
            >
              {f.included ? (
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-festival-gradient">
                  <Check className="size-3 text-white" aria-hidden />
                </span>
              ) : (
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/8">
                  <X className="size-3 text-white/35" aria-hidden />
                </span>
              )}
              {text}
            </li>
          )
        })}
      </ul>

      <Link
        to="/digital/contact"
        className={`mt-9 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-display text-sm font-semibold transition-all duration-300 focus-brand ${
          plan.popular
            ? 'bg-festival-gradient text-white hover:scale-[1.03]'
            : 'border border-white/20 text-white hover:border-transparent hover:bg-festival-gradient'
        }`}
      >
        Get this
      </Link>
    </Reveal>
  )
}

export default function Pricing() {
  usePageMeta(
    'Pricing | Rothian Digital — no upfront costs, no bs',
    'Clear monthly plans for social media, web development, brand and campaign management. No upfront costs, no bs.',
  )
  useJsonLd([
    ORGANIZATION,
    breadcrumbs([
      { name: 'Home', path: '/digital' },
      { name: 'Pricing', path: '/digital/pricing' },
    ]),
  ])

  const [categorySlug, setCategorySlug] = useState(PLAN_CATEGORIES[0].slug)
  const [yearly, setYearly] = useState(false)
  const category = PLAN_CATEGORIES.find((c) => c.slug === categorySlug)!

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="No upfront costs, no bs"
        highlight={['bs']}
        intro="Start on a monthly plan, see the work, scale when it earns it. No setup fee, no twelve-month lock-in before you have seen a result."
      />

      {/* The promise, treated as a feature */}
      <section className="border-b border-white/10 bg-ink-900 py-14">
        <div className="container-site grid gap-6 sm:grid-cols-3">
          {[
            { title: 'No upfront costs', body: 'You do not pay to start. You pay for the month you are in.' },
            { title: 'No hidden lock-in', body: 'Plans are monthly. Yearly is a better rate, never a trap.' },
            { title: 'No mystery scope', body: 'Every plan lists exactly what is in and what is not.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="flex items-start gap-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-festival-yellow" aria-hidden />
              <span>
                <span className="block font-display font-bold text-white">{item.title}</span>
                <span className="mt-1 block text-sm text-white/55">{item.body}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Plans"
            title="Pick the engine you need first"
            description="Most clients start with one and add stages as they grow."
            dark
            className="mb-12 max-w-2xl"
          />

          {/* Category switcher */}
          <div className="mb-8 flex flex-wrap gap-2.5" role="group" aria-label="Plan category">
            {PLAN_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategorySlug(c.slug)}
                aria-pressed={c.slug === categorySlug}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-brand ${
                  c.slug === categorySlug
                    ? 'bg-festival-gradient text-white shadow-lg shadow-brand-magenta/25'
                    : 'border border-white/15 text-white/60 hover:border-white/35 hover:text-white'
                }`}
              >
                {c.title.replace(' Plans', '')}
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          {category.hasYearly && (
            <div className="mb-12 flex items-center gap-4">
              <span className={`text-sm font-medium ${!yearly ? 'text-white' : 'text-white/40'}`}>
                Monthly
              </span>
              <button
                role="switch"
                aria-checked={yearly}
                aria-label="Toggle yearly billing"
                onClick={() => setYearly((v) => !v)}
                className={`relative h-8 w-14 rounded-full transition-colors duration-300 focus-brand ${
                  yearly ? 'bg-festival-gradient' : 'bg-white/15'
                }`}
              >
                <motion.span
                  animate={{ x: yearly ? 24 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-1 top-1 size-6 rounded-full bg-white shadow"
                />
              </button>
              <span className={`text-sm font-medium ${yearly ? 'text-white' : 'text-white/40'}`}>
                Yearly <span className="text-festival-yellow">— better rate</span>
              </span>
            </div>
          )}

          <p className="mb-8 text-sm text-white/45">{category.intro}</p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {category.plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} yearly={yearly} delay={i * 0.06} />
            ))}
          </div>

          {category.note && <p className="mt-10 text-sm text-white/45">{category.note}</p>}

          <Reveal delay={0.15} className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="heading-section text-2xl text-white sm:text-3xl">
              Not sure which one? Say so.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Tell us the outcome you want and we'll tell you the smallest plan that gets you there —
              even if that is less than you were about to spend.
            </p>
            <Link
              to="/digital/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform hover:scale-[1.03] focus-brand"
            >
              Get a recommendation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
