import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on route change (instant, before paint of the new page). */
export function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
