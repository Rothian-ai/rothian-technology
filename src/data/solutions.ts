import type { LucideIcon } from 'lucide-react'
import { Factory, Megaphone, Radar, UserCog } from 'lucide-react'

export interface Solution {
  slug: string
  title: string
  tagline: string
  body: string
  highlights: string[]
  icon: LucideIcon
  /** Optional external specialist site. */
  href?: string
}

/** Packaged solutions from rothian.com/category/solutions. */
export const SOLUTIONS: Solution[] = [
  {
    slug: 'soc',
    title: 'Security Operations Center',
    tagline: '24/7 monitoring that catches cybersecurity events as they emerge.',
    body: 'We monitor IT infrastructures around the clock to detect cybersecurity events in real time — and address them as quickly and effectively as possible. Detection, triage and response, delivered as a managed service.',
    highlights: ['24/7/365 monitoring', 'Real-time detection', 'Rapid incident response', 'Managed service'],
    icon: Radar,
    href: 'https://cyber.rothian.com',
  },
  {
    slug: 'ciso-as-a-service',
    title: 'CISO as a Service',
    tagline: 'Security leadership without the full-time hire.',
    body: "We have led security transformations for some of the world's largest and most complex organisations. Get that experience on demand — strategy, governance and board-level accountability, scaled to your organisation.",
    highlights: ['Board-level security leadership', 'Security transformation', 'Governance & compliance', 'On-demand scale'],
    icon: UserCog,
    href: 'https://cyber.rothian.com',
  },
  {
    slug: 'app-factory',
    title: 'App Factory',
    tagline: 'High-impact apps in short bursts — 2-week sprints, 4 to 16 weeks end to end.',
    body: 'Standalone app development for small-to-medium enterprises and corporate departments. High-impact digital experiences delivered in two-week sprints over a 4-to-16-week period, sized by scope and complexity.',
    highlights: ['2-week sprints', '4–16 week delivery', 'Fixed, transparent scope', 'SME & departmental focus'],
    icon: Factory,
    href: 'https://rothian-solutions.vercel.app',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Reach your audience across every platform that matters.',
    body: 'Campaigns across Facebook, Instagram, X, LinkedIn and TikTok — strategy, content and management delivered with our AI-native sister company, Rothian Digital.',
    highlights: ['Social media management', 'Campaign management', 'SEO & content', 'AI-native tooling'],
    icon: Megaphone,
    href: 'https://digital.rothian.com',
  },
]
