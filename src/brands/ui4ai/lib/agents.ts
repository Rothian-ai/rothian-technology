/**
 * The four Rothian agents.
 *
 * Positioning, signature lines, capabilities and colours are taken from each
 * agent's own live landing page and source project — not invented here. Each
 * record is the single source of truth for copy, palette and CTA destination
 * across the whole page.
 */

export type AgentId = "amelia" | "albert" | "isaac" | "marie";

export type RGB = [number, number, number];

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  domain: string;
  /** One-word discipline used in the rail, ecosystem map and comparison. */
  discipline: string;
  intelligence: string;
  /**
   * Plain-language answer to "what does this one actually do?", in one line.
   * This is the first thing a visitor should read anywhere the four are shown
   * together — it carries more weight than the poetic labels around it.
   */
  does: string;
  /** Two-word compressions of `capabilities`, for scanning rather than reading. */
  shortCaps: [string, string, string];
  /** The agent's own line, from its product site. */
  signature: string;
  description: string;
  capabilities: string[];
  /** Historical inspiration — a stated influence, never an impersonation. */
  inspiration: {
    figure: string;
    lived: string;
    principle: string;
    note: string;
    motifs: string[];
    /** An original archival-style plate evoking the figure's field of work. */
    plate: string;
  };
  href: string;
  portrait: string;
  /**
   * The official wordmark, where one was supplied, with its true intrinsic
   * size — the marks differ in width by word, and forcing a common aspect
   * distorts them. Amelia has none yet, so her lockup is set in type to
   * match — see AgentWordmark.
   */
  wordmark?: { src: string; width: number; height: number };
  /** Accent bar colour from the brand wordmarks. */
  markAccent: string;
  /** Intelligence signature, lifted from the agent's own product palette. */
  color: { primary: string; accent: string; glow: string; rgb: RGB; accentRgb: RGB; glowRgb: RGB };
  /** Diagnostic prompt for "Which agent do I need?" */
  problem: string;
  problemDetail: string;
}

export const AGENTS: Agent[] = [
  {
    id: "amelia",
    name: "Amelia",
    role: "The Property Intelligence Advisor",
    domain: "Property",
    discipline: "Navigation",
    intelligence: "Investment intelligence",
    does: "Answers property enquiries with real yields, costs and risk — not brochure copy.",
    shortCaps: ["Yield analysis", "Payment plans", "Verified data"],
    signature: "Sell off-plan with data, not adjectives.",
    description:
      "Amelia turns every property enquiry into a clear, data-backed UAE off-plan investment recommendation. She reads the market so buyers can compare opportunities on evidence rather than brochures.",
    capabilities: [
      "Verified DLD, RERA, escrow and inventory grounding",
      "Rental yield, developer and supply-risk analysis",
      "Payment-plan, acquisition-cost and ROI scenarios",
      "Always-on multilingual investor qualification",
    ],
    inspiration: {
      figure: "Amelia Earhart",
      lived: "1897 — 1937",
      principle: "Navigate the unknown.",
      note: "Earhart's legacy of navigation and pioneering flight informs how Amelia is designed: plot the route, read the instruments, commit to a heading.",
      motifs: ["Horizon", "Waypoints", "Trajectory", "Coordinates"],
      plate: "/ui4ai/images/historical/plate-navigation.svg",
    },
    href: "https://amelia.always.expert",
    portrait: "/ui4ai/images/agents/amelia.png",
    markAccent: "#7B5CF0",
    color: {
      primary: "#7B5CF0",
      accent: "#4E7CF6",
      glow: "#A96BEB",
      rgb: [123, 92, 240],
      accentRgb: [78, 124, 246],
      glowRgb: [169, 107, 235],
    },
    problem: "I need to understand a property",
    problemDetail:
      "Yields, payment plans, developer risk — an investment decision that has to hold up.",
  },
  {
    id: "albert",
    name: "Albert",
    role: "The App Architect",
    domain: "Product",
    discipline: "Imagination",
    intelligence: "Product architecture",
    does: "Turns an app idea into a build plan: features, screens and scope.",
    shortCaps: ["Feature scoping", "UX blueprints", "Build plans"],
    signature: "Tell me your idea. Let's turn it into something people can use.",
    description:
      "Albert stands between a rough app idea and a plan a team can actually build. He sees the system behind the idea and removes the technical friction between concept and launch.",
    capabilities: [
      "Idea-to-product discovery",
      "Feature and workflow architecture",
      "UX blueprinting and rapid prototyping",
      "Build guidance, iteration and quality review",
    ],
    inspiration: {
      figure: "Albert Einstein",
      lived: "1879 — 1955",
      principle: "Imagine beyond the obvious.",
      note: "Einstein's habit of reasoning through thought experiments informs Albert's method: change the frame, and the structure of the problem becomes visible.",
      motifs: ["Thought experiment", "Geometry", "Systems", "Relativity"],
      plate: "/ui4ai/images/historical/plate-geometry.svg",
    },
    href: "https://albert.always.expert",
    portrait: "/ui4ai/images/agents/albert.png",
    wordmark: { src: "/ui4ai/icons/wordmarks/albert.png", width: 386, height: 138 },
    markAccent: "#FFD200",
    color: {
      primary: "#F59E0B",
      accent: "#FBBF24",
      glow: "#FCD34D",
      rgb: [245, 158, 11],
      accentRgb: [251, 191, 36],
      glowRgb: [252, 211, 77],
    },
    problem: "I have an idea for a product",
    problemDetail:
      "A rough concept that needs shape — features, flows and a plan developers can act on.",
  },
  {
    id: "isaac",
    name: "Isaac",
    role: "The Social Catalyst",
    domain: "Social",
    discipline: "Motion",
    intelligence: "Content and growth intelligence",
    does: "Plans, writes and schedules your social content across every channel.",
    shortCaps: ["Content creation", "Campaign planning", "Cross-channel posting"],
    signature: "Let's turn every idea into a conversation.",
    description:
      "Isaac learns a brand, plans its campaigns, creates the content and keeps improving every post. Great marketing is governed by patterns, not luck.",
    capabilities: [
      "Brand-aware content creation",
      "Campaign and editorial planning",
      "Cross-channel scheduling and repurposing",
      "Performance learning and creative optimisation",
    ],
    inspiration: {
      figure: "Isaac Newton",
      lived: "1643 — 1727",
      principle: "Understand the forces behind movement.",
      note: "Newton's description of motion and force informs how Isaac works: attention obeys patterns, and a system that reads them can give an idea direction.",
      motifs: ["Orbit", "Momentum", "Force", "Feedback"],
      plate: "/ui4ai/images/historical/plate-orbit.svg",
    },
    href: "https://isaac.always.expert",
    portrait: "/ui4ai/images/agents/isaac.png",
    wordmark: { src: "/ui4ai/icons/wordmarks/isaac.png", width: 336, height: 138 },
    markAccent: "#0048FF",
    color: {
      primary: "#6366F1",
      accent: "#60A5FA",
      glow: "#818CF8",
      rgb: [99, 102, 241],
      accentRgb: [96, 165, 250],
      glowRgb: [129, 140, 248],
    },
    problem: "I need to grow my brand",
    problemDetail:
      "Content that keeps arriving, on every channel, and gets sharper each cycle.",
  },
  {
    id: "marie",
    name: "Marie",
    role: "The Talent Navigator",
    domain: "Talent",
    discipline: "Discovery",
    intelligence: "People intelligence",
    does: "Screens candidates and scores role fit, with the reasoning shown.",
    shortCaps: ["CV screening", "Fit scorecards", "Interview support"],
    signature: "Great hiring begins by recognising potential.",
    description:
      "Marie recognises high-potential candidates and connects talent with the right opportunities — the intelligence layer over a talent operating system spanning six connected people modules on one employee record.",
    capabilities: [
      "Role and competency intelligence",
      "Candidate screening and structured scorecards",
      "Interview planning and evaluation support",
      "Explainable fit insights with human oversight",
    ],
    inspiration: {
      figure: "Marie Curie",
      lived: "1867 — 1934",
      principle: "Discover what others overlook.",
      note: "Curie's disciplined, evidence-first method informs Marie's design: measure carefully, show the working, and let the finding survive scrutiny.",
      motifs: ["Evidence", "Radiance", "Method", "Potential"],
      plate: "/ui4ai/images/historical/plate-discovery.svg",
    },
    href: "https://marie.always.expert",
    portrait: "/ui4ai/images/agents/marie.png",
    wordmark: { src: "/ui4ai/icons/wordmarks/marie.png", width: 364, height: 138 },
    markAccent: "#8500A2",
    color: {
      primary: "#A8187A",
      accent: "#7C3AED",
      glow: "#5FE3C0",
      rgb: [168, 24, 122],
      accentRgb: [124, 58, 237],
      glowRgb: [95, 227, 192],
    },
    problem: "I need to understand my people",
    problemDetail:
      "Hiring and workforce decisions that need judgement, structure and a record of why.",
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.id, a])) as Record<
  AgentId,
  Agent
>;

export const AGENT_IDS = AGENTS.map((a) => a.id);

/** The six people modules Marie's operating system spans. */
export const MARIE_MODULES = [
  "Core HR",
  "Talent Acquisition & Transitions",
  "Workforce Management",
  "Total Rewards",
  "Talent & Performance",
  "People Analytics",
];

/** Neutral foundation used before any agent enters the scene. */
export const NEUTRAL = {
  rgb: [148, 152, 170] as RGB,
  accentRgb: [120, 124, 145] as RGB,
  glowRgb: [170, 174, 190] as RGB,
};
