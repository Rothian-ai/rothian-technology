import { site } from '../data/site.ts';
import { services } from '../data/services.ts';
import { posts, blogCopy } from '../data/posts.ts';
import { caseStudies } from '../data/work.ts';
import { about } from '../data/about.ts';

/**
 * Single source of truth for per-route metadata.
 *
 * Both the running app (src/lib/seo.ts) and the build-time prerenderer
 * (scripts/prerender.mjs) read this list, so the HTML a crawler receives and
 * the HTML a user navigates to can never drift apart.
 *
 * Imports here are relative and carry their .ts extension deliberately: this
 * module is also loaded directly by Node during the build, where the "@/"
 * alias does not exist.
 */
export interface RouteMeta {
  /** Absolute path, no trailing slash (except the root). */
  path: string;
  /** Page title, without the site-name suffix. */
  title: string;
  description: string;
  /** Absolute-from-root image path, e.g. /images/site/home-1.webp */
  image?: string;
  type: 'website' | 'article';
  /** ISO date — articles and case studies only. */
  published?: string;
  /** Sitemap weighting. */
  priority: number;
  /** Keep out of the index (the 404 view). */
  noindex?: boolean;
}

const HOME_DESCRIPTION =
  'We help businesses to build modern data platforms, AI-driven analytics, and future-ready infrastructures that unlock real business value.';

const staticRoutes: RouteMeta[] = [
  {
    path: '/data',
    title: `${site.name} — ${site.tagline}`,
    description: HOME_DESCRIPTION,
    image: '/data/images/site/home-1.webp',
    type: 'website',
    priority: 1,
  },
  {
    path: '/data/about-us',
    title: 'About Us',
    description: about.body[0],
    image: about.image,
    type: 'website',
    priority: 0.8,
  },
  {
    path: '/data/services',
    title: 'Services',
    description:
      'Our framework breaks the modern enterprise into interconnected data domains, each powered by engineering excellence, governance, and intelligence.',
    image: '/data/images/site/bg-effect-02.webp',
    type: 'website',
    priority: 0.9,
  },
  {
    path: '/data/blog',
    title: 'Blog',
    description: blogCopy.body,
    image: posts[0]?.image,
    type: 'website',
    priority: 0.7,
  },
  {
    path: '/data/portfolio',
    title: 'Work',
    description:
      'Selected engagements where modern data engineering changed how a business makes decisions.',
    image: caseStudies[0]?.image,
    type: 'website',
    priority: 0.7,
  },
  {
    path: '/data/contact',
    title: 'Contact',
    description:
      'From data management to advanced analytics, we help businesses harness the full potential of their information for strategic advantage.',
    image: '/data/images/site/data-helix.webp',
    type: 'website',
    priority: 0.8,
  },
];

const serviceRoutes: RouteMeta[] = services.map((service) => ({
  path: `/data/services/${service.slug}`,
  title: service.title,
  description: service.summary,
  image: service.image,
  type: 'website',
  priority: 0.8,
}));

const postRoutes: RouteMeta[] = posts.map((post) => ({
  path: `/data/blog/${post.slug}`,
  title: post.title,
  description: post.excerpt,
  image: post.image,
  type: 'article',
  published: post.date,
  priority: 0.6,
}));

const workRoutes: RouteMeta[] = caseStudies.map((study) => ({
  path: `/data/portfolio/${study.slug}`,
  title: study.title,
  description: study.summary,
  image: study.image,
  type: 'article',
  published: study.date,
  priority: 0.6,
}));

/** Every route that gets its own prerendered HTML file and sitemap entry. */
export const routes: RouteMeta[] = [
  ...staticRoutes,
  ...serviceRoutes,
  ...postRoutes,
  ...workRoutes,
];

export const notFoundMeta: RouteMeta = {
  path: '/404',
  title: 'Page not found',
  description: 'The page you were looking for has moved.',
  type: 'website',
  priority: 0,
  noindex: true,
};

/** Trailing slashes are tolerated so /services/ and /services resolve alike. */
export function findRouteMeta(pathname: string): RouteMeta {
  const normalised = pathname !== '/data' ? pathname.replace(/\/+$/, '') : '/data';
  return routes.find((r) => r.path === normalised) ?? notFoundMeta;
}

/** Full document title, with the site-name suffix applied consistently. */
export const documentTitle = (meta: RouteMeta) =>
  meta.path === '/data' ? meta.title : `${meta.title} — ${site.name}`;

/** Route paths already carry the /data prefix, so site.url is the bare origin. */
export const absoluteUrl = (path: string) => `${site.url}${path}`;
