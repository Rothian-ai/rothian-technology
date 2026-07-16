import type { LucideIcon } from 'lucide-react'
import { Handshake, Receipt, Timer } from 'lucide-react'

export interface EngagementModel {
  title: string
  body: string
  icon: LucideIcon
  bestFor: string
}

/** Commercial models from the live site — "fixed-price, pay-as-you-go, or partnership-based". */
export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: 'Fixed Price',
    body: 'A clearly scoped outcome for a clearly stated price. We agree the deliverables, the timeline and the acceptance criteria up front — then we carry the delivery risk.',
    bestFor: 'Well-defined projects with a firm scope',
    icon: Receipt,
  },
  {
    title: 'Pay As You Go',
    body: 'Flexible time-and-materials engagement. Scale our involvement up or down as your priorities move — you only pay for the capability you use.',
    bestFor: 'Evolving programmes and embedded teams',
    icon: Timer,
  },
  {
    title: 'Partnership',
    body: 'A long-term, outcomes-based relationship. We invest alongside you, share the risk and tie our commercials to the results we deliver together.',
    bestFor: 'Strategic, multi-year transformation',
    icon: Handshake,
  },
]

export interface Faq {
  question: string
  answer: string
}

export const FAQS: Faq[] = [
  {
    question: 'How are you different from the big consulting firms?',
    answer:
      'We choose agility over scale and capability over resources. You get senior practitioners who do the work — fresh ideas and agile solutions instead of conventional methodologies and layers of account management.',
  },
  {
    question: 'What engagement models do you offer?',
    answer:
      'Three: fixed price for clearly scoped outcomes, pay-as-you-go when you need flexible capacity, and partnership-based commercials for long-term transformation where we share the risk with you.',
  },
  {
    question: 'Which cloud platforms do you support?',
    answer:
      'AWS, Azure, Google Cloud Platform and Heroku — including containerised and Kubernetes workloads, plus migration from legacy estates to hybrid multi-cloud.',
  },
  {
    question: 'How does the App Factory work?',
    answer:
      'Standalone app development for SMEs and corporate departments, delivered in two-week sprints over a 4-to-16-week period depending on size and complexity. High impact, short bursts, fixed rhythm.',
  },
  {
    question: 'Can you work alongside our existing teams?',
    answer:
      'Yes — most of our services are designed to embed. QA engineers inside your delivery teams, architects alongside your stakeholders, DevSecOps practice threaded through your existing pipelines.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a consultation directly in our calendar, or send a note to info@rothian.com. We start with your business requirements — never with a product pitch.',
  },
]
