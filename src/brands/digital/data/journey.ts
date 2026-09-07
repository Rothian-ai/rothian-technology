/**
 * The four-stage customer journey — the organizing spine of the whole site.
 * Services marked `ai: true` are the AI-native additions/upgrades (★ in the brief).
 */

export interface JourneyService {
  name: string
  description: string
  /** Marks an AI-native service or an AI upgrade to an existing one. */
  ai?: boolean
}

export interface JourneyStage {
  id: string
  index: string
  /** e.g. "Start with Strategy" */
  title: string
  /** The capability grouping, e.g. "Brand & Identity" */
  discipline: string
  promise: string
  /** Accent used for this stage across the site (festival palette). */
  accent: 'yellow' | 'orange' | 'rose' | 'violet'
  services: JourneyService[]
}

export const JOURNEY: JourneyStage[] = [
  {
    id: 'strategy',
    index: '01',
    title: 'Start with Strategy',
    discipline: 'Brand & Identity',
    promise: 'Build the foundation of your business with a brand that customers trust and remember.',
    accent: 'yellow',
    services: [
      {
        name: 'Brand Strategy & Identity',
        description:
          'Craft a powerful brand story, vision, and visual identity that connects emotionally with your audience and sets you apart from competitors.',
      },
      {
        name: 'AI-informed Audience & Market Insight',
        description:
          'Interrogate real market signal at speed — audience, category, and competitor intelligence that sharpens the strategy before a pixel is drawn.',
        ai: true,
      },
      {
        name: 'Visual Branding',
        description:
          'Design logos, colour palettes, typography, and brand guidelines that give your business a recognizable and lasting presence.',
      },
      {
        name: 'Website Creation',
        description:
          'Create beautiful, fast, and user-friendly websites that showcase your brand and drive real customer action — built machine-readable for AI and agentic discovery from day one.',
        ai: true,
      },
      {
        name: 'Mobile App Development',
        description:
          'Launch intuitive, beautifully designed mobile apps that bring your brand experience directly into the hands of your customers.',
      },
    ],
  },
  {
    id: 'build',
    index: '02',
    title: 'Build Your Brand',
    discipline: 'Experience Design',
    promise: 'Create digital experiences that customers love to interact with — making your brand unforgettable.',
    accent: 'orange',
    services: [
      {
        name: 'Customer Experience Design (UI/UX)',
        description:
          'Design seamless, intuitive digital experiences for websites and apps that drive engagement, loyalty, and satisfaction.',
      },
      {
        name: 'Generative Creative Studio',
        description:
          'AI-accelerated design, video, and brand assets. Human art direction plus generative tooling gives you volume and taste — never one at the cost of the other.',
        ai: true,
      },
      {
        name: 'Virtual Event Production',
        description:
          'Host unforgettable virtual events, webinars, and online experiences — fully branded, interactive, and built to impress your audience.',
      },
    ],
  },
  {
    id: 'grow',
    index: '03',
    title: 'Grow Your Audience',
    discipline: 'Engagement & Community',
    promise: 'Expand your reach, deepen relationships, and stay top-of-mind with your customers.',
    accent: 'rose',
    services: [
      {
        name: 'Social Media Growth',
        description:
          'Build, grow, and nurture your community on Instagram, LinkedIn, and TikTok — powered by AI-assisted content engines and daily human engagement.',
        ai: true,
      },
      {
        name: 'Content Creation',
        description:
          'Produce stunning visuals, engaging videos, and powerful copywriting that tell your story — scaled with generative tools, quality-controlled by people.',
        ai: true,
      },
      {
        name: 'AI Agents & Conversational Commerce',
        description:
          'Chat, WhatsApp, and voice agents that engage and sell around the clock — from agentic ads to conversational checkout.',
        ai: true,
      },
    ],
  },
  {
    id: 'scale',
    index: '04',
    title: 'Optimize & Scale',
    discipline: 'Growth Services',
    promise: 'Turn your digital presence into real results: more traffic, more leads, more sales.',
    accent: 'violet',
    services: [
      {
        name: 'Paid Advertising & Lead Generation',
        description:
          'Design and run high-converting campaigns across Google, Meta, and more — with AI creative testing and agentic ad platforms working the budget harder.',
        ai: true,
      },
      {
        name: 'Online Store Setup (E-commerce)',
        description:
          'Launch a seamless online store that turns visitors into loyal buyers — from setup to checkout, and optimised for AI shopping agents.',
        ai: true,
      },
      {
        name: 'Search & AI Visibility (SEO + AEO/GEO)',
        description:
          'Rank for humans and become the cited answer inside ChatGPT, Perplexity, Gemini, Google AI Overviews, and Copilot. When most searches end without a click, being the answer matters as much as the ranking.',
        ai: true,
      },
      {
        name: 'AI-Readiness / Machine-Readable Web',
        description:
          'Structured data, schema, and llms.txt so agentic browsers and AI assistants can read, understand, and transact with your site.',
        ai: true,
      },
      {
        name: 'AI Insights & Predictive Analytics',
        description:
          'Track, measure, and optimise every touchpoint — with forecasting and AI-surfaced recommendations, not just dashboards.',
        ai: true,
      },
    ],
  },
]

/** Tailwind classes per stage accent, so stages stay visually distinct but on-palette. */
export const ACCENT: Record<
  JourneyStage['accent'],
  { text: string; bg: string; ring: string; dot: string }
> = {
  yellow: {
    text: 'text-festival-yellow',
    bg: 'bg-festival-yellow',
    ring: 'ring-festival-yellow/40',
    dot: 'bg-festival-yellow',
  },
  orange: {
    text: 'text-festival-orange',
    bg: 'bg-festival-orange',
    ring: 'ring-festival-orange/40',
    dot: 'bg-festival-orange',
  },
  rose: {
    text: 'text-festival-rose',
    bg: 'bg-festival-rose',
    ring: 'ring-festival-rose/40',
    dot: 'bg-festival-rose',
  },
  violet: {
    text: 'text-festival-violet',
    bg: 'bg-festival-violet',
    ring: 'ring-festival-violet/40',
    dot: 'bg-festival-violet',
  },
}

export const METHOD = ['Discover', 'Define', 'Design', 'Develop'] as const

export const getStage = (id: string) => JOURNEY.find((s) => s.id === id)
