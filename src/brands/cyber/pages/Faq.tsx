import { CtaBand } from '../components/shared/CtaBand'
import { PageHero } from '../components/shared/PageHero'
import { Accordion } from '../components/ui/Accordion'
import { Reveal } from '../components/ui/Reveal'
import { FAQS } from '../data/faqs'
import { usePageMeta } from '../lib/seo'

export default function Faq() {
  usePageMeta(
    'FAQ | Rothian Cyber',
    'Frequently asked questions about Rothian Cyber’s services, approach, industries and how to get started.',
  )

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers, before you even ask"
        highlight={['ask']}
        description="Everything teams usually want to know before choosing a cybersecurity partner."
        compact
      />

      <section className="bg-abyss-950 py-24 sm:py-32">
        <div className="container-site max-w-4xl">
          <Reveal>
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        body="Ask us anything — a security expert (not a sales script) will get back to you shortly."
        buttonLabel="Ask Us Anything"
      />
    </>
  )
}
