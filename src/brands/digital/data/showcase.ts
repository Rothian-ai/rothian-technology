/**
 * Creative Showcase — the GenAI gallery.
 *
 * Each asset carries a "brief → result" caption so visitors see the leverage,
 * not just the output (brief §9).
 *
 * NOTE FOR THE TEAM: `tool` values describe the *class* of tool used, not a
 * specific vendor. Replace them with the exact tools your team used before this
 * goes live — naming real tools is a stronger trust signal, but only if accurate.
 * `turnaround` and `traditional` are indicative comparisons; adjust to your real
 * production times.
 */

export interface ShowcaseAsset {
  id: string
  title: string
  /** Discipline tag shown on the card. */
  category: 'Brand' | 'Digital' | 'Campaign' | 'AI-Native' | 'Growth' | 'Motion'
  video: string
  /** The human instruction that started it. */
  brief: string
  /** What came out, and what a human did to it. */
  result: string
  tool: string
  /** Roughly how long the asset took, versus a traditional route. */
  turnaround: string
  traditional: string
}

export const SHOWCASE: ShowcaseAsset[] = [
  {
    id: 'the-signal',
    title: 'The Signal',
    category: 'Brand',
    video: '/digital/videos/genai/the-signal.mp4',
    brief:
      'A monumental translucent glass sculpture standing in an almost-black architectural space, lit from within by a warm orange core that falls away into magenta and violet. Clean enough to sit in an Apple campaign.',
    result:
      'A brand world built as an object rather than a logo sheet. The internal gradient is the Rothian core palette, so the piece reads as ours before a single word appears on screen.',
    tool: 'Image generation → image-to-video → colour grade',
    turnaround: 'A few hours',
    traditional: 'CGI product render — days',
  },
  {
    id: 'interface-unbound',
    title: 'Interface, Unbound',
    category: 'Digital',
    video: '/digital/videos/genai/interface-unbound.mp4',
    brief:
      'Immaculate transparent interface planes floating vertically in darkness, reflected on a glossy floor. Real interface detail — but nothing that reads as a generic SaaS dashboard.',
    result:
      'Rothian gradient light travels through the glass as the planes drift. Built for product and UX conversations where a flat screenshot would kill the idea.',
    tool: 'Image generation → image-to-video',
    turnaround: 'A few hours',
    traditional: 'UI mockup plus 3D compositing — days',
  },
  {
    id: 'own-the-night',
    title: 'Own the Night',
    category: 'Campaign',
    video: '/digital/videos/genai/own-the-night.mp4',
    brief:
      'A vast illuminated installation inside a dark urban environment, orange and magenta light spilling across wet concrete.',
    result:
      'Deliberately carries no readable advertising copy — the artwork itself is the campaign visual, so a client headline can drop in without fighting the frame.',
    tool: 'Image generation → image-to-video → grade',
    turnaround: 'Under a day',
    traditional: 'Location shoot, permits and retouch — weeks',
  },
  {
    id: 'the-machine',
    title: 'The Machine',
    category: 'AI-Native',
    video: '/digital/videos/genai/the-machine.mp4',
    brief:
      'A kinetic sculpture in precision-machined black metal, glass and luminous components, its parts intelligently arranging themselves around a glowing central object.',
    result:
      'Industrial design, not science fiction. The whole point of the brief was to show AI and automation without reaching for a robot or a glowing brain.',
    tool: 'Image generation → image-to-video with motion emphasis',
    turnaround: 'Under a day',
    traditional: '3D modelling and animation — a week',
  },
  {
    id: 'attention-field',
    title: 'Attention Field',
    category: 'Growth',
    video: '/digital/videos/genai/attention-field.mp4',
    brief:
      'Hundreds of faint points of light travelling through darkness and converging into one beautifully controlled glowing form.',
    result:
      'Orange at the source, through pink into violet as the system grows. The growth story told as light instead of another rising line on a chart.',
    tool: 'Image generation → image-to-video',
    turnaround: 'Under a day',
    traditional: 'Particle simulation in 3D — days',
  },
  {
    id: 'controlled-chaos',
    title: 'Controlled Chaos',
    category: 'Motion',
    video: '/digital/videos/genai/controlled-chaos.mp4',
    brief:
      'A ribbon of reflective liquid metal frozen halfway through a complex movement — one side perfectly ordered, the other breaking apart into particles.',
    result:
      'The flex. If you only look at one piece here, look at this one: generative work that is unmistakably art-directed rather than merely generated.',
    tool: 'Image generation → image-to-video → grade',
    turnaround: 'Under a day',
    traditional: 'Simulation and VFX compositing — weeks',
  },
]

export const SHOWCASE_FILTERS = [
  'All',
  'Brand',
  'Digital',
  'Campaign',
  'AI-Native',
  'Growth',
  'Motion',
] as const

/**
 * How we work with AI — the human-in-the-loop process.
 * Counters the "AI slop" objection by being specific about where judgement lives.
 */
export const AI_PROCESS = [
  {
    step: 'Discover',
    title: 'Brief before prompt',
    body: 'Nothing gets generated until we know the audience, the message, and what the asset has to achieve. AI is fast at making things — it is not the thing that decides what is worth making.',
  },
  {
    step: 'Define',
    title: 'Art direction, locked',
    body: 'We fix the look first — palette, composition, material, tone — usually as a single approved keyframe. That lock is why our output stays consistent instead of drifting between generations.',
  },
  {
    step: 'Design',
    title: 'Generate, then curate hard',
    body: 'We produce many options and throw most of them away. The value is not the generation, it is the editorial judgement about which one earns its place in front of your customers.',
  },
  {
    step: 'Develop',
    title: 'Finish like a studio',
    body: 'Grade, retouch, sound, upscale, and QA. Every asset gets a human pass before delivery, checked against brand guidelines and platform specs.',
  },
] as const

/** Honest position on disclosure — on-brand, given we publish on AI ad rules. */
export const AI_PRINCIPLES = [
  'We disclose AI-generated advertising where platforms or regulators require it — and we help you do the same.',
  'We never ship a generation nobody has reviewed. A human signs off on every asset.',
  'Your brand assets and data are not fed into public training sets.',
  'If a traditional shoot or a human illustrator is genuinely the better answer, we will tell you.',
] as const
