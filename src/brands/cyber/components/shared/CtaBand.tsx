import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SplitText } from '../ui/SplitText'

interface CtaBandProps {
  title?: string
  body?: string
  buttonLabel?: string
  to?: string
}

/** Full-width glowing call-to-action band used at the end of inner pages. */
export function CtaBand({
  title = 'Ready to secure your business?',
  body = 'Book a free security assessment and we’ll map your current posture, surface your weak spots and hand you a clear plan — no obligations, no lock-in.',
  buttonLabel = 'Book a Security Assessment',
  to = '/cyber/contact',
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-abyss-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.7), rgba(45,212,238,0.4) 55%, transparent 78%)',
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
          <Link
            to="/cyber/contact?urgency=critical"
            className="inline-flex items-center gap-2 rounded-full border border-brand-alert/40 px-8 py-4 font-display font-medium text-brand-alert transition-colors hover:bg-brand-alert/10"
          >
            <ShieldAlert className="size-4" aria-hidden />
            Suffered an incident?
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
