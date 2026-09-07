import { FAQS } from '../../data/faqs'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** FAQ accordion with a side rail CTA. */
export function FaqSection({ limit = 6 }: { limit?: number }) {
  return (
    <section className="bg-abyss-900 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="FAQs"
            title="Answers, before you even ask"
            description="The questions we hear most from teams sizing up a cybersecurity partner."
          />
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-4">
            <Button to="/cyber/contact" withArrow>
              Ask us anything
            </Button>
            <Button to="/cyber/faq" variant="outline">
              All FAQs
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Accordion items={FAQS.slice(0, limit)} />
        </Reveal>
      </div>
    </section>
  )
}
