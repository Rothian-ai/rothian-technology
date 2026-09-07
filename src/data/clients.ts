export interface Client {
  name: string
  logo: string
}

/** Partner / client logos shown on the live rothian.com homepage. */
export const CLIENTS: Client[] = [
  { name: 'CST', logo: '/images/clients/cst.png' },
  { name: 'Concerto', logo: '/images/clients/concerto.png' },
  { name: 'tmc3', logo: '/images/clients/tmc3.png' },
  { name: 'Encordia Consulting', logo: '/images/clients/encordia.png' },
]

/** Headline numbers, derived from the live site's own content. */
export const STATS = [
  { to: 8, suffix: '+', label: 'Years empowering business' },
  { to: 5, prefix: '0', label: 'Capability practices' },
  { to: 25, suffix: '+', label: 'Specialist services' },
  { to: 24, suffix: '/7', label: 'SOC monitoring' },
] as const
