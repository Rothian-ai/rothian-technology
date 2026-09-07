export interface Post {
  title: string
  categories: string[]
  href: string
  date: string
  excerpt: string
}

/** Industry Insights — published on the live Rothian Cyber blog. */
export const POSTS: Post[] = [
  {
    title: 'Ni8mare: Critical Vulnerability in n8n Lets Hackers Hijack Servers',
    categories: ['Cybersecurity News', 'Software Vulnerabilities'],
    href: 'https://cyber.rothian.com/ni8mare-critical-vulnerability-in-n8n-lets-hackers-hijack-servers/',
    date: '2026-06-30',
    excerpt:
      'A critical flaw in the popular n8n automation platform allows attackers to take over servers. What it means and how to protect your deployment.',
  },
  {
    title: 'MongoDB “MongoL” CVE Explained: How an Unauthenticated Memory Leak Puts Databases at Risk',
    categories: ['Cybersecurity News', 'Software Vulnerabilities'],
    href: 'https://cyber.rothian.com/mongodb-mongol-vulnerability-cve/',
    date: '2026-06-12',
    excerpt:
      'An unauthenticated memory leak in MongoDB exposes sensitive data. We break down the CVE, the risk and the remediation steps.',
  },
  {
    title: 'Why Rising AI Use for Emotional Support Matters to Cybersecurity Leaders',
    categories: ['Cybersecurity News'],
    href: 'https://cyber.rothian.com/why-rising-ai-use-for-emotional-support-matters-to-cybersecurity-leaders/',
    date: '2026-05-28',
    excerpt:
      'Employees increasingly confide in AI tools — creating new data-exposure surfaces that security leaders cannot ignore.',
  },
  {
    title: 'ENISA’s Threat Landscape Report for 2023, 11th Edition: Key Highlights',
    categories: ['Industry Analysis'],
    href: 'https://cyber.rothian.com/category/cybersecurity-news/',
    date: '2023-10-23',
    excerpt:
      'The headline findings from ENISA’s flagship threat landscape report — and what they mean for your defenses.',
  },
  {
    title: 'To SOC or not to SOC?',
    categories: ['Cybersecurity Insights'],
    href: 'https://cyber.rothian.com/category/cybersecurity-news/',
    date: '2023-11-21',
    excerpt:
      'When does a dedicated Security Operations Center make sense — and when is a managed service the smarter path?',
  },
  {
    title: 'A zero-day flaw in Zimbra email software is being exploited by four hacker groups',
    categories: ['Software Vulnerabilities'],
    href: 'https://cyber.rothian.com/category/software-vulnerabilities/',
    date: '2023-10-29',
    excerpt:
      'Multiple threat actors are actively exploiting a zero-day in Zimbra. Here’s what defenders need to know.',
  },
]
