import type { LucideIcon } from 'lucide-react'
import {
  Accessibility,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Coins,
  Compass,
  FileCheck,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  Lock,
  MessagesSquare,
  MousePointerClick,
  Network,
  PenTool,
  Radar,
  Repeat,
  Rocket,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Users,
  Workflow,
} from 'lucide-react'

export interface SubService {
  /** Post slug on rothian.com — each sub-service has its own page at /services/<slug>. */
  slug: string
  name: string
  body: string
  icon: LucideIcon
}

export interface Service {
  slug: string
  phase: string
  title: string
  tagline: string
  /** Longer intro used on the detail page hero. */
  intro: string
  /** What this phase is for, in one plain sentence — used on cards. */
  outcome: string
  subServices: SubService[]
  /** Capabilities most often applied during this phase. */
  relatedCapabilities: string[]
}

/**
 * The five service categories from rothian.com, presented as the delivery
 * lifecycle behind the brand line "Design. Develop. Deliver. Operate."
 * Every sub-service links to its own detail page (video + deliverables),
 * mirroring the live site's post URLs.
 */
export const SERVICES: Service[] = [
  {
    slug: 'strategy',
    phase: '01',
    title: 'Strategy',
    tagline:
      'End-to-end analysis of your business requirements to set an IT and digital strategy that actually fits.',
    intro:
      'Every engagement starts by understanding the problem, not selling a solution. Our strategists and solution architects work with your stakeholders to translate business goals, requirements and pain points into a clear, achievable technology roadmap.',
    outcome: 'A technology roadmap grounded in your business reality.',
    subServices: [
      {
        slug: 'business-requirements-analysis-services',
        name: 'Business & Requirements Analysis',
        body: 'We provide strategic insight using business analysis through a deep understanding of user and business needs — so decisions are grounded in evidence, not assumption.',
        icon: Lightbulb,
      },
      {
        slug: 'solution-design-services',
        name: 'Solution Design',
        body: 'Our solution architects translate business problems, stakeholder requirements and pain points into high-level service and technical design approaches.',
        icon: Compass,
      },
      {
        slug: 'demand-management-services',
        name: 'Demand Management',
        body: 'We act as the liaison between the business and selected customer groups within a department — prioritising demand so the right work happens first.',
        icon: BarChart3,
      },
      {
        slug: 'change-and-communications-services',
        name: 'Change & Communications',
        body: 'We prepare, equip and support individuals to deliver desired outcomes, guiding people through the transition from current state to a future target operating model.',
        icon: MessagesSquare,
      },
    ],
    relatedCapabilities: ['data', 'cloud', 'digital'],
  },
  {
    slug: 'design',
    phase: '02',
    title: 'Design',
    tagline:
      'Discovery, research and user-centred design that turns customer needs into services people can actually use.',
    intro:
      'Design at Rothian spans the whole spectrum — from user research and prototyping through to security and microservices architecture. We design services around the people who use them and the systems that must run them.',
    outcome: 'Services designed around real users and sound architecture.',
    subServices: [
      {
        slug: 'user-centred-design-ucd-services',
        name: 'User Centred Design',
        body: 'Users stay at the centre of every design phase — we prioritise requirements and iterate on feedback so the product reflects what people actually need.',
        icon: Users,
      },
      {
        slug: 'user-research',
        name: 'User Research',
        body: 'We plan, design and carry out research activities with users to build a deep understanding of the requirements for digital services.',
        icon: ListChecks,
      },
      {
        slug: 'ux-ui',
        name: 'UX / UI',
        body: 'Interface solutions that remove pain points along user journeys — streamlined navigation, clearer flows, more effective digital services.',
        icon: MousePointerClick,
      },
      {
        slug: 'prototyping',
        name: 'Prototyping',
        body: 'From paper sketches to high-res clickable wireframes — prototyping reduces the risk of misunderstanding and is a powerful user engagement tool.',
        icon: PenTool,
      },
      {
        slug: 'content-design',
        name: 'Content Design',
        body: 'We make things easier to understand and use — ensuring the right content reaches the user in the right place, in the best format.',
        icon: FileText,
      },
      {
        slug: 'accessibility',
        name: 'Accessibility',
        body: 'Toolkits that enhance accessibility for protected characteristics such as visual impairment, and for people who are not digitally confident.',
        icon: Accessibility,
      },
      {
        slug: 'user-data-flows',
        name: 'User & Data Flows',
        body: 'We document user flows and UX with flowcharts that outline the complete path a user takes through a product or digital service.',
        icon: Workflow,
      },
      {
        slug: 'security-architecture-services',
        name: 'Security Architecture',
        body: 'Structural frameworks to design, implement and secure confidential data — maintaining confidentiality, integrity and availability throughout.',
        icon: Lock,
      },
      {
        slug: 'microservices-architecture-services',
        name: 'Microservices Architecture',
        body: 'We design and build scalable components aligned to business capabilities, using SOLID and DRY principles.',
        icon: Boxes,
      },
    ],
    relatedCapabilities: ['application', 'cyber', 'digital'],
  },
  {
    slug: 'development',
    phase: '03',
    title: 'Development',
    tagline:
      'Secure software development with modern JavaScript frameworks, wrapped in QA, CI/CD and DevSecOps practice.',
    intro:
      'Our engineers build with modern full-stack JavaScript — Angular, React and beyond — and they never build alone: a secure development lifecycle, quality assurance, automated pipelines and security practice are embedded in every delivery team from day one.',
    outcome: 'Production-grade software, shipped through automated pipelines.',
    subServices: [
      {
        slug: 'sdlc-services',
        name: 'SDLC Services',
        body: 'Secure software development lifecycle (S-SDLC) — planning, design, build, release and maintenance with security incorporated at every stage.',
        icon: Layers,
      },
      {
        slug: 'qa-testing-services',
        name: 'QA & Testing',
        body: 'We set the testing strategy and provide embedded QA capability within delivery teams — quality is designed in, not inspected afterwards.',
        icon: ClipboardCheck,
      },
      {
        slug: 'ci-cd-services',
        name: 'CI / CD',
        body: 'We embed DevOps and DevSecOps practice to improve and automate build, test and release processes — shortening the path from commit to production.',
        icon: GitBranch,
      },
      {
        slug: 'devsecops-services',
        name: 'DevSecOps',
        body: 'Automating and integrating development with IT operations and live processes — with security controls running through the whole pipeline.',
        icon: ShieldCheck,
      },
    ],
    relatedCapabilities: ['application', 'cloud', 'cyber'],
  },
  {
    slug: 'delivery',
    phase: '04',
    title: 'Delivery',
    tagline:
      'Outcomes-based delivery through Agile, SAFe and structured portfolio management — iterative, transparent, accountable.',
    intro:
      'We deliver to outcomes, not timesheets. Whether your organisation runs Scrum teams or a scaled enterprise framework, we bring the delivery discipline — governance, reporting and adoption support — that turns plans into working services.',
    outcome: 'Predictable, fact-based delivery with people brought along.',
    subServices: [
      {
        slug: 'agile-services',
        name: 'Agile Services',
        body: 'Implementation of frameworks such as Scrum, Kanban and Lean to manage workflow — iterating quickly with full visibility of progress.',
        icon: Repeat,
      },
      {
        slug: 'scaled-agile-framework-safe-services',
        name: 'Scaled Agile (SAFe®)',
        body: 'Training and implementation of the Scaled Agile Framework to enhance productivity, quality, time to delivery and team engagement.',
        icon: Network,
      },
      {
        slug: 'project-programme-and-portfolio-management-p3m-services',
        name: 'P3M',
        body: 'Project, Programme and Portfolio Management — a structured approach that enables organisations to take fact-based business decisions.',
        icon: LayoutDashboard,
      },
      {
        slug: 'pmo-services',
        name: 'PMO Services',
        body: 'We digitise controls, governance and reporting capabilities so leadership always has an accurate, current view of delivery.',
        icon: BarChart3,
      },
      {
        slug: 'user-adoption-services',
        name: 'User Adoption',
        body: 'We help individuals transition from the current state to a future target operating model — so new services get used, not just launched.',
        icon: Rocket,
      },
    ],
    relatedCapabilities: ['application', 'data', 'digital'],
  },
  {
    slug: 'operations',
    phase: '05',
    title: 'Operations',
    tagline:
      'ITIL-aligned service operations and a full security operations practice — detection, prevention, response and continuity, 24/7.',
    intro:
      'Go-live is the beginning, not the end. We run ITIL-aligned service management — capacity, continuity, finance and service levels — alongside a full security operations practice that detects, prevents and responds to threats around the clock.',
    outcome: 'Services that stay reliable, secure and compliant in live.',
    subServices: [
      {
        slug: 'capacity',
        name: 'Capacity',
        body: 'In line with ITIL®, we translate business plans into capacity and performance requirements — predicting and controlling the performance of operational services.',
        icon: Gauge,
      },
      {
        slug: 'continuity',
        name: 'Continuity',
        body: 'ITIL® Service Continuity Management — plans and contingency arrangements that recover critical IT services and keep the business resilient.',
        icon: LifeBuoy,
      },
      {
        slug: 'service-level-management',
        name: 'Service Level Management',
        body: 'We negotiate SLAs, monitor service levels from the customer viewpoint and report against agreed targets — with OLAs and contracts kept honest.',
        icon: FileCheck,
      },
      {
        slug: 'finance',
        name: 'Finance',
        body: 'ITIL® Financial Management — budgeting, accounting and charging, with ongoing analysis that keeps the service portfolio cost-effective.',
        icon: Coins,
      },
      {
        slug: 'detection',
        name: 'Detection',
        body: 'We monitor networks and systems for malicious activity and policy violations — signature and anomaly-based intrusion detection.',
        icon: Radar,
      },
      {
        slug: 'prevention',
        name: 'Prevention',
        body: 'Countermeasures that protect the confidentiality, integrity and availability of your services — from boundary controls to malware protection.',
        icon: Shield,
      },
      {
        slug: 'response',
        name: 'Response',
        body: 'Security incidents managed from detection through resolution and remediation — minimising disruption with a coordinated technical and people response.',
        icon: Siren,
      },
      {
        slug: 'security-services',
        name: 'Security Services',
        body: 'Cyber operations for critical digital services — an overarching SOC delivering 24/7×365 Managed Detection and Response.',
        icon: ShieldAlert,
      },
      {
        slug: 'risk-compliance',
        name: 'Risk & Compliance',
        body: 'We embed risk-and-compliance activities across every level of the enterprise, down to individual sprints — assurance without slowing delivery.',
        icon: ShieldCheck,
      },
    ],
    relatedCapabilities: ['cyber', 'cloud', 'data'],
  },
]

export const SERVICE_MAP = new Map(SERVICES.map((s) => [s.slug, s]))

/** slug → [sub-service, parent service] for the 31 sub-service pages. */
export const SUB_SERVICE_MAP = new Map(
  SERVICES.flatMap((service) => service.subServices.map((sub) => [sub.slug, { sub, service }] as const)),
)
