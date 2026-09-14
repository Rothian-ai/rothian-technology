import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Analytics 4.
 *
 * The snippet Google hands you assumes a page load per page. This is a single
 * page app, so after the first load React Router swaps the view without the
 * browser navigating — gtag would never fire again and every session would
 * report exactly one pageview, on whichever URL the visitor happened to enter.
 *
 * So `send_page_view` is switched off at config time and a `page_view` is sent
 * per route below, including the first. Turning it off matters: left on, the
 * landing page would be counted twice, once by the config call and once by us.
 */

/** Overridable per environment; falls back to the rothian.com property. */
const GA_ID = import.meta.env.VITE_GA_ID ?? 'G-YVGQ7NV30R'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Which part of the group a path belongs to, sent as GA4's `content_group`.
 *
 * rothian.com serves five brands from one property, so without this every
 * report is one undifferentiated list of paths. With it, "how is Cyber doing
 * against Digital" is a single dimension rather than a pile of path filters.
 */
export function brandForPath(pathname: string): string {
  switch (pathname.split('/')[1]) {
    case 'digital':
      return 'Rothian Digital'
    case 'cyber':
      return 'Rothian Cyber'
    case 'data':
      return 'Rothian Data'
    case 'ui4ai':
      return 'Rothian App'
    default:
      return 'Rothian Technology'
  }
}

let started = false

/** Injects gtag.js once. No-op in development, so local work never reports. */
function start(): boolean {
  if (import.meta.env.DEV || !GA_ID) return false
  if (started) return true
  started = true

  window.dataLayer = window.dataLayer ?? []
  // Must be a function declaration, not an arrow: gtag forwards `arguments`.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
  return true
}

/** Sends one `page_view` per route. Mount once, at the root. */
export function useAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!start() || !window.gtag) return

    window.gtag('event', 'page_view', {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      content_group: brandForPath(pathname),
    })
  }, [pathname, search])
}
