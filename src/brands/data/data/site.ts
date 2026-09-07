import type { NavItem } from '@data/types';

/**
 * Global site content. Everything here is lifted from data.rothian.com so the
 * brand voice, positioning and calls-to-action stay untouched.
 */
export const site = {
  name: 'Rothian Data',
  /** Canonical production origin — used for canonical URLs, og:url and the sitemap. */
  // Origin only: Rothian Data now lives at rothian.com/data (data.rothian.com
  // 301s here) and every route and asset path already carries the /data prefix,
  // so appending one here would produce /data/data/… canonicals.
  url: 'https://rothian.com',
  /** The <title> strapline used across the live site. */
  tagline: 'Decode the Matrix of Your Business',
  /** Footer signature line. */
  signature: 'Data. Decision. Drive. Growth.',
  email: 'info@rothian.com',
  locationLine:
    'Join leading companies in Dubai and across the UAE who are leveraging data for growth',
  logo: {
    light: '/data/logos/rothian-data-logo-white.png',
    dark: '/data/logos/rothian-data-logo.png',
    animation: '/data/videos/logo-animation.webm',
  },
} as const;

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/data' },
  { label: 'About Us', href: '/data/about-us' },
  { label: 'Services', href: '/data/services' },
  { label: 'Work', href: '/data/portfolio' },
  { label: 'Blog', href: '/data/blog' },
  { label: 'Contact', href: '/data/contact' },
];

/** "Overview" column in the live footer. */
export const footerOverview: NavItem[] = [
  { label: 'Home', href: '/data' },
  { label: 'About Us', href: '/data/about-us' },
  { label: 'Services', href: '/data/services' },
  { label: 'Contact Us', href: '/data/contact' },
];

/** "Capabilities" column — each leads to the group site that owns it. Cloud has
 *  no sibling brand, so it stays on the main site's own capability page. */
export const footerCapabilities: NavItem[] = [
  { label: 'Application', href: '/ui4ai' },
  { label: 'Cloud', href: '/capabilities/cloud' },
  { label: 'Cyber', href: '/cyber' },
  { label: 'Data', href: '/data' },
  { label: 'Digital', href: '/digital' },
];

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rothian-llc/?originalSubdomain=uk' },
  { label: 'X', href: 'https://x.com/Rothian_Digital' },
  { label: 'Instagram', href: 'https://www.instagram.com/rothian_digital/' },
  { label: 'Facebook', href: 'https://www.facebook.com/rothian' },
] as const;

/** The rotating keyword marquee on the live homepage. */
export const capabilityMarquee = [
  'Machine Learning',
  'Artificial Intelligence',
  'Data Science',
  'Big Data',
  'Analytics',
  'Automation',
  'Deep Learning',
  'Neural Networks',
  'Data Mining',
  'Predictive Modeling',
];

export const globalCta = {
  heading: 'Ready to Transform Your Data?',
  body: 'Join leading companies who are leveraging data for growth',
  action: { label: "Let's Talk", href: '/data/contact' },
};
