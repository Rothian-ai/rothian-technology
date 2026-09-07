import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitText } from './SplitText'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string[]
  description?: ReactNode
  align?: 'left' | 'center'
  /** Cyber is dark-first; pass light for the occasional light section. */
  light?: boolean
  className?: string
}

/** Standard section header: small uppercase eyebrow + large split-text title + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-5 ${alignClasses} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className={`eyebrow ${light ? 'text-brand-purple' : 'text-brand-cyan'}`}>
          {eyebrow}
        </Reveal>
      )}
      <SplitText
        text={title}
        highlight={highlight}
        as="h2"
        className={`heading-section text-4xl sm:text-5xl lg:text-6xl ${light ? 'text-abyss-900' : 'text-white'}`}
      />
      {description && (
        <Reveal
          as="p"
          delay={0.15}
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${light ? 'text-abyss-900/65' : 'text-white/65'}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
