import { CalendarClock } from 'lucide-react'
import { FAQS } from '../../data/faqs'
import { CONTACT } from '../../lib/nav'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** FAQ accordion with a booking side-card — answer objections, then convert. */
export function FaqSection() {
  return (
    <section className="bg-paper-cool py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="FAQs"
            title="Answers, before you even ask"
            highlight={['Answers,']}
            description="The questions new clients ask most — engagement models, platforms and how we work alongside your teams."
          />
          <Reveal delay={0.25} className="mt-10 rounded-3xl bg-ink-950 p-8 text-white">
            <p className="eyebrow text-brand-ice">Still curious?</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Grab a slot straight from our calendar — a 30-minute conversation about your
              requirement, no pitch decks.
            </p>
            <Button
              href={CONTACT.booking}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full"
              withArrow
            >
              <CalendarClock className="size-4" aria-hidden />
              Book a Consultation
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}
