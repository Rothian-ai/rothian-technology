import { useLayoutEffect } from 'react'

export type Brand = 'digital' | 'cyber' | 'data'

/**
 * Applies a brand's theme scope for as long as the subtree is mounted.
 *
 * The attribute goes on <html> rather than a wrapper element so the body
 * background — and the overscroll area behind it — follow the brand too.
 * `styles/brands.css` re-declares the contested design tokens under
 * `:root[data-brand='…']`; because Tailwind v4 compiles colours to
 * `var(--color-*)` references, the same `bg-ink-950` class resolves to
 * Digital's purple-black here and Data's green-black one route over.
 *
 * useLayoutEffect (not useEffect) so the attribute lands in the same frame the
 * brand's markup paints — with useEffect the first frame renders the previous
 * brand's colours and the section visibly flashes on entry.
 */
export function BrandTheme({ brand, children }: { brand: Brand; children: React.ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const previous = root.dataset.brand
    root.dataset.brand = brand

    return () => {
      // Restore rather than delete: nested or rapidly-swapped brand routes
      // would otherwise strip the incoming brand's attribute on unmount.
      if (previous) root.dataset.brand = previous
      else delete root.dataset.brand
    }
  }, [brand])

  return children
}
