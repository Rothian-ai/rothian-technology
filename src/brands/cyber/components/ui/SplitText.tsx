import { motion } from 'framer-motion'
import { stagger, wordRise, VIEWPORT } from '../../lib/motion'

interface SplitTextProps {
  text: string
  /** Words rendered with the brand gradient. Matched case-insensitively. */
  highlight?: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  once?: boolean
}

/**
 * Splits text into words and reveals them with a staggered rise from
 * behind an overflow mask — the classic editorial split-text animation.
 */
export function SplitText({
  text,
  highlight = [],
  className,
  as: Tag = 'h2',
  delay = 0,
}: SplitTextProps) {
  const words = text.split(' ')
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase()))
  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(0.05, delay)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            variants={wordRise}
            className={`inline-block will-change-transform ${
              highlightSet.has(word.toLowerCase().replace(/[.,;!?]/g, '')) ? 'text-gradient' : ''
            }`}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
