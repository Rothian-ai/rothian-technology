import type { LucideIcon } from 'lucide-react'
import { HandHeart, Leaf, Scale, Users } from 'lucide-react'

export interface SocialValue {
  title: string
  statement: string
  body: string
  icon: LucideIcon
}

/** Social values from rothian.com/category/social-values. */
export const SOCIAL_VALUES: SocialValue[] = [
  {
    title: 'Integrate with our communities',
    statement: 'We embed ourselves where we work.',
    body: 'We will embed ourselves in the communities around us — integrating, contributing and adopting new ways of working rather than parachuting in and out.',
    icon: Users,
  },
  {
    title: 'Values ahead of commercial',
    statement: 'Respect is earned, not invoiced.',
    body: 'We earn respect through honesty and integrity — even when that means a poorer commercial outcome for us. Long-term trust beats short-term revenue.',
    icon: Scale,
  },
  {
    title: 'Invest in our staff',
    statement: 'People do their best work when they can be themselves.',
    body: 'We promote wellbeing and build an inclusive culture, so everyone feels safe, supported and able to bring their whole self to work.',
    icon: HandHeart,
  },
  {
    title: 'Care for our environment',
    statement: 'Sustainable choices, by default.',
    body: 'From remote-first ways of working to the platforms we recommend, we make choices that reduce our footprint and help clients reduce theirs.',
    icon: Leaf,
  },
]

/** Careers culture pillars from rothian.com/careers. */
export const CULTURE_PILLARS = [
  {
    title: 'Global clients, tight-knit team',
    body: 'We collaborate with businesses worldwide while keeping a human-scale culture at home. Think global, collaborate local.',
  },
  {
    title: 'Real work, real impact',
    body: 'Substance without excess. Every project we take on matters — no bench, no busywork, no filler.',
  },
  {
    title: 'Ideas over hierarchy',
    body: 'Good ideas can come from anywhere. Merit decides what we build next, not job titles.',
  },
] as const
