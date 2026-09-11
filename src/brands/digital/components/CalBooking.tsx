import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { CalendarDays } from 'lucide-react'

/** cal.com/<user>/<event> — the Rothian Digital discovery call. */
const CAL_LINK = 'rothiandigital/digital'
const CAL_URL = `https://cal.com/${CAL_LINK}`

/**
 * Cal.com scheduler for the discovery call.
 *
 * The embed is third-party and iframe-based, so it can fail in ways the rest
 * of the page cannot: a blocked script, an ad blocker, a Cal.com outage. The
 * form beside it already collects a preferred slot and works on its own, so a
 * failure here must not read as "booking is broken" — it falls back to a plain
 * link to the same page rather than leaving an empty frame.
 */
export function CalBooking() {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const cal = await getCalApi({ namespace: 'digital' })
        if (cancelled) return
        cal('ui', {
          // Matches the brand's dark ground and orange→magenta accent, so the
          // scheduler does not arrive as a white rectangle mid-page.
          theme: 'dark',
          cssVarsPerTheme: { dark: { 'cal-brand': '#ee8722' }, light: { 'cal-brand': '#ee8722' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  if (failed) {
    return (
      <a
        href={CAL_URL}
        target="_blank"
        rel="noreferrer"
        className="focus-brand flex items-center gap-3 rounded-2xl border border-white/15 bg-ink-950/50 p-5 text-sm text-white/70 transition-colors hover:border-festival-orange/50 hover:text-white"
      >
        <CalendarDays className="size-5 shrink-0 text-festival-yellow" aria-hidden />
        Book a slot on our calendar
      </a>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950/50">
      <Cal
        namespace="digital"
        calLink={CAL_LINK}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view', theme: 'dark' }}
      />
    </div>
  )
}
