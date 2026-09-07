export interface NavItem {
  label: string
  to: string
}

/** Primary information architecture. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', to: '/digital/work' },
  { label: 'Showcase', to: '/digital/showcase' },
  { label: 'Services', to: '/digital/services' },
  { label: 'About', to: '/digital/about' },
  { label: 'Pricing', to: '/digital/pricing' },
  { label: 'Insights', to: '/digital/insights' },
]

/**
 * Site-wide primary conversion: a booked discovery call.
 * Kept short here because the nav pill is space-constrained; prominent
 * placements use the fuller "Book a discovery call".
 */
export const PRIMARY_CTA = { label: 'Book a Call', to: '/digital/contact' } as const

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Rothian-Digital/100094693056015/' },
  { label: 'X', href: 'https://twitter.com/Rothian_Digital' },
  { label: 'Instagram', href: 'https://www.instagram.com/rothian_digital/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@RothianDigital' },
] as const

export const CONTACT = {
  email: 'info@rothian.com',
  teamEmail: 'digital.team@rothian.me',
  phone: '+44 07379 506 159',
  phoneHref: 'tel:+4407379506159',
  whatsapp: 'https://api.whatsapp.com/send?phone=971585862377',
} as const
