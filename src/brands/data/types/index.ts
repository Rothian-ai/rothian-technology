export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface Service {
  /** URL slug — matches the live site's paths exactly. */
  slug: string;
  title: string;
  /** Short card summary used on the home + services index. */
  summary: string;
  /** Long-form "What We Do" statement from the service page. */
  statement: string;
  image: string;
  process: ProcessStep[];
  features: Feature[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readingTime: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  image: string;
  date: string;
  services: string[];
  summary: string;
}

export interface ValuePillar {
  title: string;
  body: string;
}
