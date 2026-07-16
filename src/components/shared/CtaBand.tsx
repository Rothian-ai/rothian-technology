import { CalendarClock } from 'lucide-react'
import { CONTACT } from '../../lib/nav'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SplitText } from '../ui/SplitText'

interface CtaBandProps {
  title?: string
  body?: string
  buttonLabel?: string
  to?: string
}

/** Full-width call-to-action band used at the end of inner pages — dual CTA for conversion. */
export function CtaBand({
  title = 'Ready to power your business?',
  body = "Book a consultation directly in our calendar, or tell us about your requirement — we start with your business problem, never with a product pitch.",
  buttonLabel = "Let's Get Started",
  to = '/contact',
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_30%,transparent_100%)]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,106,94,0.65), rgba(43,57,144,0.5) 55%, transparent 78%)',
        }}
      />
      <div className="container-site relative text-center">
        <SplitText
          text={title}
          as="h2"
          className="heading-display mx-auto max-w-3xl text-4xl text-white sm:text-6xl"
        />
        <Reveal as="p" delay={0.15} className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
          {body}
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button to={to} size="lg" withArrow>
            {buttonLabel}
          </Button>
          <Button
            href={CONTACT.booking}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="ghost"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
          >
            <CalendarClock className="size-4" aria-hidden />
            Book a Consultation
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
