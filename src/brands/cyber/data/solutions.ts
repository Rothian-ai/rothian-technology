import type { Metaphor } from './services'

export interface Solution {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  intro: string
  cardImage: string
  heroImage: string
  heroMetaphor?: Metaphor
  valueProps: { title: string; body: string }[]
  features: { metaphor: Metaphor; items: string[] }
  benefits: { metaphor: Metaphor; items: string[] }
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'soc',
    title: 'SOC as a Service',
    shortTitle: 'SOC',
    tagline:
      'A complete strategy for detecting and countering security risks in your IT estate — monitored in real time.',
    intro:
      'Our Security Operations Center services offer a comprehensive approach to identifying and mitigating security threats in your IT infrastructure. By monitoring and analyzing real-time data, we fortify your defenses against potential cyber threats around the clock.',
    cardImage: '/cyber/images/services/soc.jpg',
    heroImage: '/cyber/images/analyst-silhouette.jpg',
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Tailored to suit organizations of any size, adapting quickly to new security challenges while maintaining operational integrity.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Automated, continuous security assessments with centralized compliance for consistent adherence to regulatory standards.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Freedom to choose the most suitable service model, evolving your security strategy while maintaining existing investments.',
      },
    ],
    features: {
      metaphor: {
        name: 'Willow Tree',
        description:
          'Flexible and adaptive — bending with evolving threats while maintaining strong defenses.',
      },
      items: [
        'Real-time Monitoring',
        'Threat Detection',
        'Incident Response',
        'Security Intelligence',
        'Compliance Monitoring',
        'Security Analytics',
        'Forensic Analysis',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Tuna',
        description:
          'Fast-moving and strong — the speed and force with which the SOC reacts to threats in real time.',
      },
      items: [
        'Enhanced Threat Detection',
        'Rapid Incident Response',
        'Proactive Security Measures',
        'Improved Security Posture',
        'Compliance Assurance',
        'Reduced Risk of Data Breaches',
        'Increased Operational Efficiency',
        'Business Continuity Protection',
      ],
    },
  },
  {
    slug: 'ciso',
    title: 'CISO Services',
    shortTitle: 'CISO',
    tagline:
      'Holistic oversight of your information security — strategic guidance that protects your assets.',
    intro:
      'Our Chief Information Security Officer services encompass a holistic approach to managing your organization’s information security needs — strategic guidance and oversight, protection of your assets, and mitigation of cybersecurity risk.',
    cardImage: '/cyber/images/services/solutions.jpg',
    heroImage: '/cyber/images/holo-terminal.jpg',
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Tailored to organizations of any size, adapting quickly to new security challenges without disrupting how you work.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Automated, continuous security assessments and centralized compliance for consistent adherence to regulatory standards.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Choose the service model that suits you — evolve security strategies while maintaining your existing security investments.',
      },
    ],
    features: {
      metaphor: {
        name: 'Redwood Tree',
        description:
          'Towering and resilient — enduring strength that protects your assets against the most significant challenges.',
      },
      items: [
        'Strategic Security Planning',
        'Risk Management',
        'Security Policy Development',
        'Security Awareness Training',
        'Incident Response Planning',
        'Regulatory Compliance',
        'Security Audits & Assessments',
        'Security Vendor Management',
      ],
    },
    benefits: {
      metaphor: {
        name: 'School of Fish',
        description:
          'Moving in perfect harmony — collaboration and coordinated action under strategic CISO guidance.',
      },
      items: [
        'Improved Security Strategy',
        'Enhanced Risk Management',
        'Increased Security Awareness',
        'Regulatory Compliance Assurance',
        'Effective Incident Response',
        'Stronger Security Policies',
        'Vendor Risk Mitigation',
        'Business Continuity Protection',
      ],
    },
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
