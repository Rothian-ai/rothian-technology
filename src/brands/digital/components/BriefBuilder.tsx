import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Lightbulb, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { EASE } from '../lib/motion'
import { JOURNEY } from '../data/journey'

type Goal = 'awareness' | 'leads' | 'sales' | 'rebrand' | 'launch'
type Position = 'scratch' | 'weak-digital' | 'traffic-no-conversion' | 'scaling'

const GOALS: { id: Goal; label: string }[] = [
  { id: 'awareness', label: 'Get known' },
  { id: 'leads', label: 'Generate leads' },
  { id: 'sales', label: 'Increase sales' },
  { id: 'rebrand', label: 'Fix our brand' },
  { id: 'launch', label: 'Launch something' },
]

const POSITIONS: { id: Position; label: string }[] = [
  { id: 'scratch', label: 'Starting from scratch' },
  { id: 'weak-digital', label: 'We have a brand, weak digital' },
  { id: 'traffic-no-conversion', label: 'Traffic, but it does not convert' },
  { id: 'scaling', label: 'Working — we want to scale it' },
]

/** Rule-based suggestions. Deliberately not an LLM call — see the note in the UI. */
const IDEAS: Record<Goal, string[]> = {
  awareness: [
    'A distinctive creative platform plus an always-on social content engine, so you show up consistently instead of in bursts.',
    'AI visibility work (AEO/GEO) so you are the cited answer when someone asks an AI about your category.',
    'A generative creative sprint to produce a quarter of scroll-stopping assets in days, not months.',
  ],
  leads: [
    'A conversion-focused landing experience with clean tracking, so you know which spend actually produces pipeline.',
    'Paid campaigns on Google, Meta or LinkedIn with AI creative testing to drive cost per lead down.',
    'A WhatsApp or chat agent to qualify and route enquiries the moment they arrive.',
  ],
  sales: [
    'E-commerce and checkout optimisation, including readiness for AI shopping agents.',
    'Retargeting and lifecycle email automation to convert the demand you already have.',
    'Creative volume for testing — more variants means faster learning and better ROAS.',
  ],
  rebrand: [
    'Brand strategy and identity: story, positioning and a visual system that finally looks like you.',
    'Brand guidelines plus a template kit so every future asset stays on-brand without us.',
    'A website rebuild on the new identity, built machine-readable from day one.',
  ],
  launch: [
    'A launch platform: identity, site and campaign built to one deadline by one team.',
    'A pre-launch content and email sequence to build an audience before you open the doors.',
    'A generative asset pack so launch day has everything from social to out-of-home.',
  ],
}

const STAGE_FOR: Record<Position, string> = {
  scratch: 'strategy',
  'weak-digital': 'build',
  'traffic-no-conversion': 'scale',
  scaling: 'grow',
}

interface BriefBuilderProps {
  /** Receives a plain-text summary to prefill the contact form. */
  onUseBrief: (summary: string) => void
}

/**
 * A lightweight brief builder — three questions, instant starting points.
 * On-brand lead capture that gives value before asking for an email.
 */
export function BriefBuilder({ onUseBrief }: BriefBuilderProps) {
  const [business, setBusiness] = useState('')
  const [goal, setGoal] = useState<Goal | null>(null)
  const [position, setPosition] = useState<Position | null>(null)
  const [done, setDone] = useState(false)

  const ready = business.trim().length > 2 && goal && position
  const stage = position ? JOURNEY.find((s) => s.id === STAGE_FOR[position]) : null

  const summary =
    goal && position
      ? `Business: ${business.trim()}\nGoal: ${GOALS.find((g) => g.id === goal)?.label}\nWhere we are: ${
          POSITIONS.find((p) => p.id === position)?.label
        }\nSuggested starting stage: ${stage?.title ?? ''}`
      : ''

  const reset = () => {
    setDone(false)
    setGoal(null)
    setPosition(null)
    setBusiness('')
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
      <p className="eyebrow mb-3 flex items-center gap-2 text-festival-yellow">
        <Lightbulb className="size-3.5" aria-hidden />
        Brief builder
      </p>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-section text-2xl text-white sm:text-3xl">
              Three questions. Three ideas. No email required.
            </h2>

            <div className="mt-8 flex flex-col gap-7">
              <div>
                <label
                  htmlFor="bb-business"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  1 — What does your business do?
                </label>
                <input
                  id="bb-business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="e.g. a Dubai clinic, a B2B SaaS, a jewellery brand"
                  className="w-full rounded-2xl border border-white/15 bg-ink-950/60 px-5 py-3.5 text-white placeholder:text-white/30 transition-colors focus:border-festival-orange focus:outline-none"
                />
              </div>

              <fieldset>
                <legend className="mb-3 block text-sm font-medium text-white/80">
                  2 — What do you need most?
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      aria-pressed={goal === g.id}
                      className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-brand ${
                        goal === g.id
                          ? 'bg-festival-gradient text-white'
                          : 'border border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 block text-sm font-medium text-white/80">
                  3 — Where are you right now?
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {POSITIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPosition(p.id)}
                      aria-pressed={position === p.id}
                      className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-brand ${
                        position === p.id
                          ? 'bg-festival-gradient text-white'
                          : 'border border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                disabled={!ready}
                onClick={() => setDone(true)}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-festival-gradient px-7 py-3.5 font-display font-semibold text-white transition-all duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 focus-brand"
              >
                Show me the ideas
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <h2 className="heading-section text-2xl text-white sm:text-3xl">
              Three places we'd start
            </h2>
            {stage && (
              <p className="mt-3 text-sm text-white/55">
                Based on your answers, you're most likely at{' '}
                <span className="font-semibold text-festival-yellow">{stage.title}</span> —{' '}
                {stage.discipline.toLowerCase()}.
              </p>
            )}

            <ol className="mt-8 flex flex-col gap-4">
              {goal &&
                IDEAS[goal].map((idea, i) => (
                  <motion.li
                    key={idea}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.45, ease: EASE }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-950/50 p-5"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-festival-gradient font-display text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/70">{idea}</p>
                  </motion.li>
                ))}
            </ol>

            <p className="mt-6 rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-white/45">
              Straight answer: these came from a simple rule set, not a language model — we are not
              going to pretend a three-field form understands your business. A human strategist will.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onUseBrief(summary)}
                className="group inline-flex items-center gap-2 rounded-full bg-festival-gradient px-7 py-3.5 font-display font-semibold text-white transition-transform duration-300 hover:scale-[1.03] focus-brand"
              >
                Send this to a strategist
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white focus-brand"
              >
                <RotateCcw className="size-4" aria-hidden />
                Start again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
