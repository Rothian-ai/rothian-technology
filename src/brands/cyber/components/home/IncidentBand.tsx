import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'

/**
 * Emergency strip — preserved and amplified from the current site:
 * "Suffered an incident? Don't panic." Rapid-response is a key conversion path.
 */
export function IncidentBand() {
  return (
    <section className="relative border-y border-brand-alert/20 bg-abyss-900">
      <Reveal className="container-site flex flex-col items-start gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-brand-alert/15 text-brand-alert">
            <ShieldAlert className="size-5" aria-hidden />
            <span
              className="absolute inset-0 animate-ping rounded-full bg-brand-alert/20 [animation-duration:2.5s]"
              aria-hidden
            />
          </span>
          <p className="text-white/85">
            <span className="font-display font-bold text-white">Suffered an incident?</span>{' '}
            Don't panic — our rapid-response team is on standby.
          </p>
        </div>
        <Link
          to="/cyber/contact?urgency=critical"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-alert px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.04]"
        >
          Get Rapid Response
        </Link>
      </Reveal>
    </section>
  )
}
