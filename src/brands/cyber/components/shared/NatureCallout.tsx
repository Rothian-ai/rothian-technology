import { Leaf } from 'lucide-react'
import type { Metaphor } from '../../data/services'
import { Reveal } from '../ui/Reveal'

interface NatureCalloutProps {
  metaphor: Metaphor
  className?: string
}

/**
 * "Secure by Nature" callout — the brand's signature device pairing each
 * capability with its counterpart in the natural world.
 */
export function NatureCallout({ metaphor, className = '' }: NatureCalloutProps) {
  return (
    <Reveal
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-brand-violet/15 blur-3xl"
      />
      <p className="eyebrow flex items-center gap-2 text-brand-cyan">
        <Leaf className="size-3.5" aria-hidden />
        Secure by Nature
      </p>
      <p className="mt-4 font-display text-2xl font-bold text-white">{metaphor.name}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{metaphor.description}</p>
    </Reveal>
  )
}
