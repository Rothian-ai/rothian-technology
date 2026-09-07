import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  BarChart3,
  BrainCircuit,
  Bug,
  Cloud,
  CloudCog,
  Code2,
  Database,
  FileSearch,
  Fingerprint,
  Globe,
  KeyRound,
  Layers,
  LayoutTemplate,
  Megaphone,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
  Zap,
} from 'lucide-react'

export interface CapabilityItem {
  name: string
  body: string
  icon: LucideIcon
}

export interface Capability {
  slug: string
  title: string
  tagline: string
  intro: string
  items: CapabilityItem[]
  /** Technology / platform tags shown as chips. */
  stack: string[]
  /** Sibling Rothian company that specialises in this space, if any. */
  network?: { name: string; href: string }
  accentIcon: LucideIcon
}

/** The five capability practices from rothian.com. */
export const CAPABILITIES: Capability[] = [
  {
    slug: 'application',
    title: 'Application',
    tagline: 'Expert-led development across web, mobile and low-code platforms.',
    intro:
      'Leveraging expert knowledge in web, mobile and low-code platforms for seamless enterprise application development — from Microsoft and Google ecosystems to native and cross-platform mobile.',
    items: [
      {
        name: 'Microsoft',
        body: 'We support Microsoft platforms using scalable and sustainable service models — enterprise-grade performance, scalability and sustainability.',
        icon: AppWindow,
      },
      {
        name: 'Dynamics 365',
        body: 'Our experts build and deploy Microsoft business solutions to transform operating efficiency and drive growth.',
        icon: Workflow,
      },
      {
        name: 'Google',
        body: 'Expertise spanning Google Cloud Platform, Google Workspace, enterprise Android and ChromeOS, plus APIs for machine learning and enterprise mapping.',
        icon: Globe,
      },
      {
        name: 'Platform (PaaS)',
        body: 'Skills across a wide range of Platform-as-a-Service technologies — AWS Elastic Beanstalk, Azure, Heroku, Force.com, Google App Engine, OpenShift and more.',
        icon: Server,
      },
      {
        name: 'Low-Code',
        body: 'Plan, design, build, release and support of Microsoft PowerApps on the Power Platform — production apps in a fraction of the time.',
        icon: Zap,
      },
      {
        name: 'Mobile',
        body: 'Native and cross-platform mobile development — Flutter, React Native, Android and iOS — built once, delivered everywhere.',
        icon: Smartphone,
      },
    ],
    stack: ['React', 'Angular', 'Flutter', 'React Native', 'iOS', 'Android', 'Power Platform', 'Dynamics 365'],
    network: { name: 'Rothian Apps', href: 'https://rothian-solutions.vercel.app' },
    accentIcon: AppWindow,
  },
  {
    slug: 'cloud',
    title: 'Cloud',
    tagline: 'Streamlined multi-cloud solutions across AWS, Azure, GCP and beyond.',
    intro:
      'Our engineers create, maintain and evolve cloud infrastructures — running applications in production, test and containerised development environments, and migrating estates from legacy to hybrid multi-cloud.',
    items: [
      {
        name: 'AWS',
        body: 'AWS engineers who create, maintain and evolve cloud infrastructure — production workloads, test environments and containerised development.',
        icon: Cloud,
      },
      {
        name: 'Azure',
        body: 'Azure infrastructure engineered for enterprise — from landing zones to containerised application platforms.',
        icon: CloudCog,
      },
      {
        name: 'GCP',
        body: 'Google Cloud infrastructure built, run and evolved by engineers who live in it every day.',
        icon: Globe,
      },
      {
        name: 'Heroku',
        body: 'Rapid, developer-friendly Heroku environments for teams that want to ship without managing infrastructure.',
        icon: Zap,
      },
      {
        name: 'Orchestration & Migration',
        body: 'Kubernetes and containerised workloads across clouds — plus migration from legacy to cloud, and cloud to hybrid multi-cloud.',
        icon: Workflow,
      },
    ],
    stack: ['AWS', 'Azure', 'GCP', 'Heroku', 'Kubernetes', 'Docker', 'Terraform'],
    accentIcon: Cloud,
  },
  {
    slug: 'cyber',
    title: 'Cyber',
    tagline: 'Security testing, threat management and access control — assured end to end.',
    intro:
      'We are experts in testing infrastructure and applications, including source code. Our cyber practice aligns to OWASP and spans static and dynamic testing, rights management and access control — backed by a 24/7 Security Operations Center.',
    items: [
      {
        name: 'OWASP-Aligned Testing',
        body: 'Web application and service testing aligned to the Open Web Application Security Project — industry-standard, repeatable, evidenced.',
        icon: ShieldCheck,
      },
      {
        name: 'SAST',
        body: 'Static application security testing — source code analysis that looks deep into native vulnerabilities before they ship.',
        icon: Code2,
      },
      {
        name: 'DAST',
        body: 'Dynamic application security testing — probing running applications the way an attacker would.',
        icon: Bug,
      },
      {
        name: 'Application Testing',
        body: 'Testing applications for vulnerabilities in software configuration — across development and pre-release environments.',
        icon: FileSearch,
      },
      {
        name: 'Infrastructure Testing',
        body: 'Testing infrastructure for vulnerabilities in the configuration of hardware and software across your estate.',
        icon: Server,
      },
      {
        name: 'Rights Management',
        body: 'Processes and technologies that let a rights owner exert control over information — wherever it travels.',
        icon: KeyRound,
      },
      {
        name: 'Access Control',
        body: "Controlling individuals' access to critical business information and services — least privilege, enforced.",
        icon: Fingerprint,
      },
    ],
    stack: ['OWASP', 'SAST', 'DAST', 'Pen Testing', 'IAM', 'SOC'],
    network: { name: 'Rothian Cyber', href: 'https://cyber.rothian.com' },
    accentIcon: ShieldCheck,
  },
  {
    slug: 'data',
    title: 'Data',
    tagline: 'Data mastery — from strategy and engineering to AI and analytics.',
    intro:
      'Comprehensive data solutions for organisations that want to put their data to work — intelligent automation, advanced analytics and the engineering that makes both possible.',
    items: [
      {
        name: 'Artificial Intelligence',
        body: 'Our AI practitioners design intelligent solutions that solve problems, automate tasks and serve your customers better.',
        icon: BrainCircuit,
      },
      {
        name: 'Data Science',
        body: 'Data scientists who analyse and interpret data using advanced statistical analysis, machine learning and data conditioning.',
        icon: Search,
      },
      {
        name: 'Data Engineering',
        body: 'Engineers with strong technical backgrounds — including the ability to develop and integrate APIs — building pipelines you can rely on.',
        icon: Database,
      },
      {
        name: 'Analytics & Reporting',
        body: 'Analysts who couple data handling, modelling and reporting techniques with a strong understanding of the business.',
        icon: BarChart3,
      },
    ],
    stack: ['Machine Learning', 'Python', 'APIs', 'Power BI', 'Data Pipelines'],
    network: { name: 'Rothian Data', href: 'https://data.rothian.com' },
    accentIcon: Database,
  },
  {
    slug: 'digital',
    title: 'Digital',
    tagline: 'Enterprise content platforms, SEO and digital marketing under one roof.',
    intro:
      'Development, support, hosting and security assurance for the major enterprise content platforms — plus the SEO, social and digital marketing to make them work hard.',
    items: [
      {
        name: 'Adobe Experience Manager',
        body: 'Development, support, hosting and security assurance for AEM platforms at enterprise scale.',
        icon: LayoutTemplate,
      },
      {
        name: 'Sitecore',
        body: 'Full lifecycle Sitecore services — build, support, hosting and security assurance.',
        icon: Layers,
      },
      {
        name: 'Drupal',
        body: 'Development, support, hosting and security assurance for Drupal estates.',
        icon: Code2,
      },
      {
        name: 'Umbraco & WordPress',
        body: 'Pragmatic, well-governed builds and support for Umbraco and WordPress platforms.',
        icon: AppWindow,
      },
      {
        name: 'SEO & Content',
        body: 'Enterprise content management combined with search optimisation — the right content, found by the right people.',
        icon: Search,
      },
      {
        name: 'Digital Marketing',
        body: 'Social and campaign delivery across Facebook, Instagram, X, LinkedIn and TikTok — powered by our sister company Rothian Digital.',
        icon: Megaphone,
      },
    ],
    stack: ['AEM', 'Sitecore', 'Drupal', 'Umbraco', 'WordPress', 'SEO'],
    network: { name: 'Rothian Digital', href: 'https://digital.rothian.com' },
    accentIcon: Megaphone,
  },
]

export const CAPABILITY_MAP = new Map(CAPABILITIES.map((c) => [c.slug, c]))
