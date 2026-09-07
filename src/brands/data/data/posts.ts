import type { Post } from '@data/types';

/**
 * Journal entries. Titles, excerpts and dates come from the live blog index.
 * Article bodies are not yet authored on the current site, so each entry links
 * through to a reading view built around its published excerpt.
 */
export const posts: Post[] = [
  {
    slug: 'data-marketplace-turning-data-catalogs-into-a-showroom-for-business-value',
    title: 'Data Marketplace: Turning Data Catalogs into a Showroom for Business Value',
    excerpt:
      'Most companies hold massive amounts of data, yet only a small portion ever drives decisions. A data marketplace changes this by turning complex catalogs into a user-friendly showroom where teams can browse trusted, business-ready data products. Instead of digging through technical tables, users discover insights the way they would shop online—unlocking faster access, stronger adoption, and far greater business value.',
    date: '2025-12-02',
    image: '/data/images/blog/data-marketplace.webp',
    readingTime: '5 min read',
  },
  {
    slug: 'ai-data-management-the-foundation-modern-enterprises-cant-ignore',
    title: 'AI Data Management: The Foundation Modern Enterprises Can’t Ignore',
    excerpt:
      'Modern enterprises are generating more data than ever, but without AI-driven data management, that data quickly becomes chaotic, inconsistent, and unusable. AI brings automation, intelligence, and real-time governance to the entire data lifecycle—turning raw information into reliable, actionable insights. It’s no longer optional; AI-powered data management is the backbone that ensures accuracy, speed, and scalability in the digital era.',
    date: '2025-12-02',
    image: '/data/images/blog/ai-data-management.webp',
    readingTime: '6 min read',
  },
  {
    slug: 'why-a-data-quality-framework-is-the-bedrock-of-trustworthy-data',
    title: 'Why a Data Quality Framework Is the Bedrock of Trustworthy Data',
    excerpt:
      'Data-driven decisions collapse without reliable, consistent, and well-governed data. A solid data quality framework gives enterprises the structure to detect errors, enforce standards, and ensure every dataset is accurate, complete, and trusted. It becomes the foundation that enables confident analytics, stronger AI outcomes, and smarter business execution.',
    date: '2025-12-02',
    image: '/data/images/blog/data-quality-framework.webp',
    readingTime: '5 min read',
  },
  {
    slug: 'why-enterprises-must-reimagine-their-data-platforms-for-the-agentic-era',
    title: 'Why Enterprises Must Reimagine Their Data Platforms for the Agentic Era',
    excerpt:
      'Enterprises are moving into an agentic era where AI systems no longer just analyze data—they act on it. Traditional data platforms can’t keep up. To stay competitive, organizations must rebuild their foundations for real-time decisioning, intelligent automation, and autonomous operations. Those that modernize now will unlock faster insights, safer innovation, and a future-ready digital backbone.',
    date: '2025-12-02',
    image: '/data/images/blog/chat-with-data.webp',
    readingTime: '7 min read',
  },
  {
    slug: 'chat-with-data-the-next-frontier-of-business-intelligence',
    title: 'Chat‑with‑Data: The Next Frontier of Business Intelligence',
    excerpt:
      'Imagine asking your analytics platform: “What caused our 15 % revenue jump in Q1?” — and receiving a coherent narrative answer in seconds, without needing to sift through dashboards or write SQL queries. This is what the chat‑with‑data paradigm offers. It signifies a shift in how organisations interact with information: from navigating dashboards to simply conversing with data.',
    date: '2025-11-25',
    image: '/data/images/blog/chat-with-data.webp',
    readingTime: '6 min read',
  },
];

export const getPost = (slug?: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

export const blogCopy = {
  eyebrow: 'Blogs',
  heading: 'What’s New in the Data Matrix',
  body: 'Read our latest articles on data engineering, AI, analytics, security, and the future of intelligent enterprises.',
};
