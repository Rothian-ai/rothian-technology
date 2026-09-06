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
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'Strategy', to: '/services/strategy' },
      { label: 'Design', to: '/services/design' },
      { label: 'Development', to: '/services/development' },
      { label: 'Delivery', to: '/services/delivery' },
      { label: 'Operations', to: '/services/operations' },
    ],
  },
  {
    label: 'Capabilities',
    to: '/capabilities',
    children: [
      { label: 'Application', to: '/capabilities/application' },
      { label: 'Cloud', to: '/capabilities/cloud' },
      { label: 'Cyber', to: '/capabilities/cyber' },
      { label: 'Data', to: '/capabilities/data' },
      { label: 'Digital', to: '/capabilities/digital' },
    ],
  },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Social Values', to: '/social-values' },
  { label: 'Careers', to: '/careers' },
]

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/rothian' },
  { label: 'X', href: 'https://x.com/Rothian_LLC' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/rothian-llc/' },
  { label: 'Instagram', href: 'https://www.instagram.com/rothian_llc/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@rothian_llc' },
] as const

export const CONTACT = {
  email: 'info@rothian.com',
  booking:
    'https://outlook.office365.com/owa/calendar/RothianTechnologyBookaslot@rothian.com/bookings/',
  companyNo: '11570066',
  vatNo: '345 8483 68',
} as const

/** The wider Rothian Group — sibling companies of Rothian Technology.
 *  `accent` is each company's 2026 wordmark chip colour, so the swatch beside
 *  a logo always matches the mark itself. */
export const GROUP_NETWORK = [
  {
    name: 'Rothian Digital',
    accent: '#D44345',
    href: 'https://digital.rothian.com',
    logo: '/logos/rothian-digital-logo.png',
    logoMono: '/logos/rothian-digital-logo-mono.png',
    blurb: 'AI-native digital marketing — social, web, brand and campaigns.',
  },
  {
    name: 'Rothian Cyber',
    accent: '#2407D4',
    href: 'https://cyber.rothian.com',
    logo: '/logos/rothian-cyber-logo.png',
    logoMono: '/logos/rothian-cyber-logo-mono.png',
    blurb: 'Cybersecurity solutions, security testing and threat management.',
  },
  {
    name: 'Rothian Data',
    accent: '#43D45B',
    href: 'https://data.rothian.com',
    logo: '/logos/rothian-data-logo.png',
    logoMono: '/logos/rothian-data-logo-mono.png',
    blurb: 'Data analytics, engineering and transformation.',
  },
  {
    name: 'Rothian Apps',
    accent: '#F9FF61',
    href: 'https://app.rothian.com',
    logo: '/logos/rothian-apps-logo.png',
    logoMono: '/logos/rothian-apps-logo-mono.png',
    blurb: 'Web and mobile application development.',
  },
] as const
