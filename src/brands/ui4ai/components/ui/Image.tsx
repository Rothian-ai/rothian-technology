import type { CSSProperties, ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** next/image: preload rather than lazy-load. */
  priority?: boolean
  /** next/image: absolutely fill the nearest positioned ancestor. */
  fill?: boolean
  /** next/image: optimiser hint. No optimiser here, so it is ignored. */
  quality?: number
}

/**
 * A stand-in for `next/image`, so the Rothian App components port over
 * unchanged.
 *
 * This site is a Vite SPA with no image optimiser, so the parts of the API that
 * exist to drive one — `quality`, and the srcset `sizes` would feed — have
 * nothing to act on. What does carry meaning is reproduced faithfully:
 * `priority` flips lazy loading off, and `fill` reproduces the absolute-inset
 * layout that the agent portraits are built around.
 */
export default function Image({
  priority,
  fill,
  quality: _quality,
  style,
  width,
  height,
  ...rest
}: ImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }
    : style

  return (
    <img
      {...rest}
      // With `fill`, next/image drops the intrinsic dimensions; keeping them
      // would fight the absolute layout.
      {...(fill ? {} : { width, height })}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={fillStyle}
    />
  )
}
