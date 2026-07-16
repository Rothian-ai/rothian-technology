import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitText } from './SplitText'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string[]
  description?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

/** Standard section header: mono eyebrow + large split-text title + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-5 ${alignClasses} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className={`eyebrow ${dark ? 'text-brand-ice' : 'text-brand-crimson'}`}>
          {'// '}
          {eyebrow}
        </Reveal>
      )}
      <SplitText
        text={title}
        highlight={highlight}
        as="h2"
        className={`heading-section text-4xl sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-ink-900'}`}
      />
      {description && (
        <Reveal
          as="p"
          delay={0.15}
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-ink-900/65'}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
