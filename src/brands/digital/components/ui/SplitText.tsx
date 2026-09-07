import { motion } from 'framer-motion'
import { EASE, VIEWPORT } from '../../lib/motion'

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const

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
 * Heading that fades and rises into view as a single block — the same
 * "Fade In Up" entrance Elementor produces natively, so the WordPress
 * rebuild matches 1:1. Highlighted words keep the brand gradient.
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
  const MotionTag = MOTION_TAGS[Tag]

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={
            highlightSet.has(word.toLowerCase().replace(/[.,;!?]/g, '')) ? 'text-gradient' : ''
          }
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  )
}
