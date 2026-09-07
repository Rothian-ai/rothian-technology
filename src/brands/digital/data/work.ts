/**
 * Results-first case studies.
 *
 * Metrics here are the REAL figures published on the live Rothian Digital site.
 * Anything not verifiable from the live site is flagged `illustrative: true` and
 * must be labelled as such in the UI (per brief §9 / §11).
 */

export interface WorkMetric {
  value: string
  label: string
  context?: string
}

export interface WorkItem {
  slug: string
  client: string
  title: string
  /** Which journey stage the impact landed in. */
  stage: 'strategy' | 'build' | 'grow' | 'scale'
  discipline: string
  industry: string
  image: string
  /** The single number that leads the card and the detail hero. */
  headline: WorkMetric
  summary: string
  challenge: string
  approach: string[]
  impact: string
  metrics: WorkMetric[]
  /** True when figures are indicative examples rather than published results. */
  illustrative?: boolean
}

export const WORK: WorkItem[] = [
  {
    slug: 'gitex-2025',
    client: 'GITEX Global 2025',
    title: 'Multi-channel LinkedIn & email campaign that cut cost per result by half',
    stage: 'scale',
    discipline: 'Campaign Management',
    industry: 'Technology & Events',
    image: '/digital/images/portfolio/gitex-2025.png',
    headline: { value: '50%+', label: 'ad budget saved', context: 'while still generating qualified leads' },
    summary:
      'A targeted LinkedIn and email programme for GITEX 2025 that generated 600+ website visits, 6 qualified leads and one new client — on under half the planned budget.',
    challenge:
      'Stand out during the busiest week in the regional tech calendar, generate qualified leads, and prove the spend — without burning a $2,000 budget on impressions that go nowhere.',
    approach: [
      'Sponsored LinkedIn campaigns targeted at tech founders, digital teams, and IT decision-makers.',
      'Spotted a high cost-per-result on Lead Gen ads early and paused them rather than letting them run.',
      'Shifted the investment into landing-page traffic ads, which improved cost efficiency and engagement.',
      'Ran pre-event and live-event email waves, replacing manual list research with automation to move faster.',
      'Weekly optimisation against CPR, CPL, open rate, click-through and conversion flow.',
    ],
    impact:
      'The campaign delivered direct client growth on a fraction of the planned spend — the budget discipline became the headline result, not a footnote.',
    metrics: [
      { value: '6', label: 'Qualified leads' },
      { value: '1', label: 'New client acquired' },
      { value: '600+', label: 'Website visits' },
      { value: '33.45%', label: 'Email open rate' },
      { value: '<$900', label: 'Final spend', context: 'from a $2,000 budget' },
    ],
  },
  {
    slug: 'adipec-2025',
    client: 'ADIPEC 2025',
    title: 'Email programme that beat industry benchmarks by 178%',
    stage: 'grow',
    discipline: 'Email Marketing',
    industry: 'Energy',
    image: '/digital/images/portfolio/adipec-2025.jpg',
    headline: { value: '60%', label: 'email open rate', context: 'against a 21.5% industry average' },
    summary:
      'An eight-wave email campaign for one of the world’s largest energy exhibitions, engineered around timing, segmentation and ruthless clarity.',
    challenge:
      'Reach industry professionals, executives and technology partners across a crowded event cycle — and hold their attention from pre-event through to follow-up.',
    approach: [
      'Eight campaigns spanning pre-event, live-event and post-event phases.',
      'Audience segmented by role, geography and interest area across energy and technology.',
      'Short, action-focused copy with a single clear CTA and visually aligned templates.',
      'Continuous monitoring of open, click and bounce rates to refine each subsequent batch.',
    ],
    impact:
      'Open rates ran nearly triple the industry average and click-through nearly nine times it — driven by subject-line craft and disciplined send timing.',
    metrics: [
      { value: '5,000', label: 'Emails sent', context: 'avg. 636 per campaign' },
      { value: '3,000', label: 'Total opens' },
      { value: '1,000+', label: 'Total clicks' },
      { value: '20%', label: 'Click-through rate', context: 'industry average 2.3%' },
    ],
  },
  {
    slug: 'gisec-2025',
    client: 'Rothian Cyber',
    title: 'Full-funnel LinkedIn campaign at 43% below benchmark cost',
    stage: 'scale',
    discipline: 'Paid Ads',
    industry: 'Cybersecurity',
    image: '/digital/images/portfolio/gisec-2025.png',
    headline: { value: '$0.64', label: 'cost per visit', context: '43.5% below benchmark' },
    summary:
      'A precision-targeted LinkedIn campaign inviting CISOs and IT leaders at GISEC 2025 to complete a free two-minute cyber resilience assessment.',
    challenge:
      'Reach mission-critical security decision-makers — government, finance, telecom, healthcare — with a message concise enough to act on during a live expo.',
    approach: [
      'Two ad sets: a 60-second video ad for traffic, and a personalised InMail message ad for direct response.',
      'Targeting focused on CISOs, IT managers and security analysts across enterprise verticals.',
      'A single sharp creative line — “Think your systems are secure? Think again.”',
      'A dedicated landing page built around a two-minute readiness check.',
    ],
    impact:
      'The video ad drove strong top-of-funnel performance well under benchmark cost, while the message ad produced a 55% open rate and clear signal for future conversion-focused optimisation.',
    metrics: [
      { value: '280', label: 'Website visits' },
      { value: '2.65%', label: 'Click-through rate' },
      { value: '813', label: 'InMails delivered' },
      { value: '55.47%', label: 'Message open rate' },
    ],
  },
  {
    slug: 'ordtek',
    client: 'Ordtek',
    title: 'From dated to conversion-ready in under two months',
    stage: 'strategy',
    discipline: 'Website Development',
    industry: 'Risk Management',
    image: '/digital/images/portfolio/ordtek-website.jpg',
    headline: { value: '8 weeks', label: 'research to live', context: '3 March → 28 April 2025' },
    summary:
      'A full website refresh for a leading UXO risk management company, aligned to both its own brand and the visual standards of its new parent, Venterra Group.',
    challenge:
      'A website that no longer reflected the expertise or ambition of the business — and a newly-acquired brand that had to meet group standards fast.',
    approach: [
      'Stakeholder interviews and user research to establish real requirements.',
      'Competitor and heuristic analysis, then a content audit and new information architecture.',
      'Wireframing and UI design against both Ordtek and Venterra Group brand guidelines.',
      'WordPress build, QA and launch inside an eight-week agile cycle.',
    ],
    impact:
      'A professional, conversion-ready platform that communicates credibility and clarity — fast, mobile-optimised, easy to maintain and SEO-friendly.',
    metrics: [
      { value: '8', label: 'Weeks end-to-end' },
      { value: '100%', label: 'Brand-guideline compliance', context: 'Ordtek + Venterra Group' },
    ],
  },
  {
    slug: 'the-modern-carat',
    client: 'The Modern Carat',
    title: 'A sustainable luxury identity built for three distinct buyers',
    stage: 'strategy',
    discipline: 'Brand Design',
    industry: 'Jewellery & Retail',
    image: '/digital/images/portfolio/the-modern-carat.jpg',
    headline: { value: '3', label: 'buyer personas', context: 'one coherent identity' },
    summary:
      'A minimal, classy and sustainable brand identity for lab-grown diamond jewellery — designed to speak to the Dubai Flexer, the Emotional Buyer and the Sustainable Shopper at once.',
    challenge:
      'Communicate genuine luxury and ethical sourcing simultaneously, to three audiences with very different motivations, across rental and custom purchase journeys.',
    approach: [
      'Mapped the user journey for each persona, online and offline.',
      'Built a visual identity around clean lines, muted colour and sophisticated typography.',
      'Kept the rent-or-buy experience smooth, confidential and intuitive.',
    ],
    impact:
      'A refined identity that reads as high-end without shouting — and makes the sustainability story an asset rather than a disclaimer.',
    metrics: [{ value: '360°', label: 'Brand system', context: 'identity + collateral + journey' }],
  },
  {
    slug: 'exchange-legal-services',
    client: 'Exchange Legal Services',
    title: 'One visual system across every client touchpoint',
    stage: 'build',
    discipline: 'Graphic Design',
    industry: 'Legal',
    image: '/digital/images/portfolio/exchange-legal-services.jpg',
    headline: { value: '4', label: 'platforms unified', context: 'plus print and animation' },
    summary:
      'A complete design system for a UK legal practice — social, print, document templates and explainer animation, all communicating clarity and trust.',
    challenge:
      'Help a legal brand look as considered as its work, for clients navigating sensitive issues like housing, immigration and civil disputes.',
    approach: [
      'Built the visual strategy around simplicity, professionalism and empathy.',
      'Concise layouts and clear iconography over dense legal language.',
      'Scalable, editable templates so the team could keep producing on-brand.',
      'Short-form animation to make legal topics approachable.',
    ],
    impact:
      'A polished, consistent presence across Instagram, LinkedIn, Facebook and Twitter, plus flyers, banners, letterheads and explainer video.',
    metrics: [{ value: '6+', label: 'Asset families delivered' }],
  },
]

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug)

export const WORK_FILTERS = [
  { id: 'all', label: 'All work' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'build', label: 'Build' },
  { id: 'grow', label: 'Grow' },
  { id: 'scale', label: 'Scale' },
] as const
