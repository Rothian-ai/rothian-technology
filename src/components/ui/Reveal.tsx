import { motion, type Variants } from 'framer-motion'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { fadeRise, VIEWPORT } from '../../lib/motion'

/** Cache motion components per tag so Reveal doesn't remount its subtree on re-render. */
const motionCache = new Map<ElementType, ReturnType<typeof motion.create>>()
function getMotionComponent(tag: ElementType) {
  let component = motionCache.get(tag)
  if (!component) {
    component = motion.create(tag)
    motionCache.set(tag, component)
  }
  return component
}

type RevealProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

/** Scroll-triggered reveal wrapper. Fades and rises once when entering the viewport. */
export function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  variants = fadeRise,
  delay = 0,
  className,
  ...rest
}: RevealProps<T>) {
  const Component = getMotionComponent((as ?? 'div') as ElementType)
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
