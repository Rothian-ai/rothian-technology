import type { CaseStudy } from '@data/types';

/** Portfolio entries published on the live site. */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'real-time-revenue-intelligence-for-e-commerce-scale-up',
    title: 'Real-Time Revenue Intelligence for E-Commerce Scale-Up',
    image: '/data/images/blog/revenue-intelligence.webp',
    date: '2025-12-12',
    services: ['Cloud Engineering', 'BI, Dashboards & Reporting', 'Advanced Analytics'],
    summary:
      'A cloud-native pipeline and real-time reporting layer that put revenue, margin and customer behaviour in front of the leadership team as it happens, rather than a month later.',
  },
];

export const getCaseStudy = (slug?: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
