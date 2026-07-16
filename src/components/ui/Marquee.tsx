import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  className?: string
  /** Fade the edges into the background. */
  fade?: boolean
}

/** Infinite horizontal marquee. Content is duplicated once; animation translates -50%. */
export function Marquee({ children, reverse = false, className = '', fade = true }: MarqueeProps) {
  return (
    <div
      className={`group/marquee relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }
          : undefined
      }
    >
      <div
        className={`flex w-max items-center gap-0 will-change-transform ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover/marquee:[animation-play-state:paused]`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
