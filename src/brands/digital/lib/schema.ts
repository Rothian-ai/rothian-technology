import { useEffect } from 'react'

const SCRIPT_ID = 'rothian-jsonld'

/**
 * Injects JSON-LD structured data for the current page.
 *
 * This is deliberately part of the product, not an afterthought: the site has to
 * be a working proof of the AI-Readiness / AEO service it sells (brief §12).
 */
export function useJsonLd(schema: object | object[] | null) {
  useEffect(() => {
    if (!schema) return
    const graph = Array.isArray(schema) ? schema : [schema]
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = SCRIPT_ID
    el.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    document.head.appendChild(el)
    return () => el.remove()
  }, [schema])
}

// Rothian Digital now lives at rothian.com/digital; digital.rothian.com 301s
// here, so structured data must point at the destination, not the old host.
// ORIGIN is kept separate because asset paths are already /digital-prefixed —
// concatenating them onto SITE would yield /digital/digital/images/….
const ORIGIN = 'https://rothian.com'
const SITE = `${ORIGIN}/digital`

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Rothian Digital',
  url: SITE,
  description:
    'The AI-native creative marketing agency. Human creativity, AI velocity. Brand, experience, growth and AI visibility for businesses across the UK and UAE.',
  slogan: 'Reimagining your business',
  email: 'info@rothian.com',
  telephone: '+44 07379 506 159',
  areaServed: ['GB', 'AE'],
  parentOrganization: { '@type': 'Organization', name: 'Rothian', url: 'https://rothian.com' },
  sameAs: [
    'https://www.linkedin.com/company/rothian-digital',
    'https://twitter.com/Rothian_Digital',
    'https://www.instagram.com/rothian_digital/',
    'https://www.facebook.com/people/Rothian-Digital/100094693056015/',
    'https://www.youtube.com/@RothianDigital',
  ],
}

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Rothian Digital',
  publisher: { '@id': `${SITE}/#organization` },
}

export function serviceSchema(name: string, description: string) {
  return {
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${SITE}/#organization` },
    areaServed: ['GB', 'AE'],
  }
}

export function caseStudySchema(item: {
  title: string
  summary: string
  image: string
  client: string
}) {
  return {
    '@type': 'CreativeWork',
    name: item.title,
    abstract: item.summary,
    image: `${ORIGIN}${item.image}`,
    creator: { '@id': `${SITE}/#organization` },
    about: item.client,
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  }
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${ORIGIN}${t.path}`,
    })),
  }
}
