export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  href?: string
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/cyber' },
  {
    label: 'About Us',
    to: '/cyber/about',
    children: [
      { label: 'What We Do', to: '/cyber/what-we-do' },
      { label: 'Our Experts', to: '/cyber/about/experts' },
    ],
  },
  {
    label: 'Services',
    to: '/cyber/services',
    children: [
      { label: 'Discover', to: '/cyber/services/discover' },
      { label: 'Adapt', to: '/cyber/services/adapt' },
      { label: 'Evolve', to: '/cyber/services/evolve' },
    ],
  },
  { label: 'Capabilities', to: '/cyber/capabilities' },
  {
    label: 'Solutions',
    to: '/cyber/solutions',
    children: [
      { label: 'SOC as a Service', to: '/cyber/solutions/soc' },
      { label: 'CISO as a Service', to: '/cyber/solutions/ciso' },
    ],
  },
  { label: 'Insights', to: '/cyber/insights' },
]

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/188219831034107' },
  { label: 'X', href: 'https://twitter.com/Rothian_Cyber' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rothian-cyber' },
  { label: 'Instagram', href: 'https://www.instagram.com/rothian_cyber' },
  { label: 'YouTube', href: 'https://www.youtube.com/@RothianCyber' },
] as const

export const CONTACT = {
  email: 'info@rothian.com',
  phone: '+44 07379 506 159',
  phoneHref: 'tel:+4407379506159',
  whatsapp: 'https://api.whatsapp.com/send?phone=971585862377',
} as const
