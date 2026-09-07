export type PillarSlug = 'discover' | 'adapt' | 'evolve'

export interface Metaphor {
  /** The animal or plant from the "Secure by Nature" brand system. */
  name: string
  description: string
}

export interface Pillar {
  slug: PillarSlug
  name: string
  outcome: string
  tagline: string
  description: string
  metaphor: Metaphor
}

export interface Service {
  slug: string
  pillar: PillarSlug
  title: string
  shortTitle: string
  tagline: string
  intro: string
  cardImage: string
  heroImage: string
  heroMetaphor: Metaphor
  valueProps: { title: string; body: string }[]
  features: { metaphor: Metaphor; items: string[] }
  benefits: { metaphor: Metaphor; items: string[] }
}

export const PILLARS: Pillar[] = [
  {
    slug: 'discover',
    name: 'Discover',
    outcome: 'Improve your security posture',
    tagline: 'Know your weak spots before attackers do.',
    description:
      'Uncover vulnerabilities with cutting-edge threat intelligence and proactive analysis, empowering your defense. Every company has blind spots — our professional services illuminate them and hand you actionable steps to close them.',
    metaphor: {
      name: 'Lion',
      description:
        'The king of the jungle — leadership, power and the strength to defend your digital ecosystem.',
    },
  },
  {
    slug: 'adapt',
    name: 'Adapt',
    outcome: 'Proactively stop threats',
    tagline: '24/7 detection and response that never sleeps.',
    description:
      'Swiftly adjust defenses with adaptive technologies, real-time monitoring, and responsive strategies to outsmart cyber threats. Our blend of AI, automation and human ingenuity delivers managed detection and response unlike any other.',
    metaphor: {
      name: 'Ferns',
      description:
        'Hardy and able to thrive in different conditions — resilience and adaptability against fluctuating cybersecurity challenges.',
    },
  },
  {
    slug: 'evolve',
    name: 'Evolve',
    outcome: 'Reduce time to resolve',
    tagline: 'Stay one step ahead of the hackers.',
    description:
      'Innovate continuously with AI-driven insights, ensuring robust cybersecurity against emerging threats. Attackers deploy automation and AI — now it’s your turn. Why let them have all the fun?',
    metaphor: {
      name: 'Great White Shark',
      description:
        'Powerful, efficient and always in motion — a proactive, unstoppable defense against evolving cyber threats.',
    },
  },
]

export const SERVICES: Service[] = [
  {
    slug: 'penetration-testing',
    pillar: 'discover',
    title: 'Penetration Testing',
    shortTitle: 'Penetration Testing',
    tagline:
      'Simulated real-world attacks that expose weaknesses before real attackers find them.',
    intro:
      'Our Penetration Testing services provide a thorough examination of your IT infrastructure to identify and address vulnerabilities. Through simulated real-world attacks — ethical hacking performed by expert testers — we harden your defenses against the threats that matter.',
    cardImage: '/cyber/images/services/penetration-testing.jpg',
    heroImage: '/cyber/images/animals/armadillo.jpg',
    heroMetaphor: {
      name: 'Armadillo',
      description:
        'Its tough outer shell defends against predators — just as penetration testing strengthens your systems by finding weaknesses first.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Tailored penetration testing to match your organization and threat landscape, with engagement models from one-time assessments to regular testing schedules.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Weaknesses across your IT estate identified and consolidated into clear, actionable insights for IT and security teams.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Unbiased third-party assessments that enhance your existing security measures — no dependence on specific vendors or platforms, no significant new investments.',
      },
    ],
    features: {
      metaphor: {
        name: 'Thorny Bushes',
        description:
          'Thorns deter animals from feeding — penetration testing deters attackers by exposing vulnerabilities first.',
      },
      items: [
        'Comprehensive Risk Analysis',
        'Real-World Attack Simulations',
        'Advanced Testing Tools & Techniques',
        'Customizable Testing Frameworks',
        'Expert Penetration Testers',
        'Detailed Reporting & Analysis',
        'Post-Testing Consultation',
        'Ongoing Security Support',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Pufferfish',
        description:
          'Inflates when threatened to become much harder to attack — highlighting vulnerabilities before they are exploited.',
      },
      items: [
        'Enhanced Security Posture',
        'Informed Security Investments',
        'Compliance Assurance',
        'Reduced Risk of Data Breaches',
        'Increased Stakeholder Confidence',
        'Empowered IT & Security Teams',
        'Proactive Threat Identification',
        'Business Continuity Protection',
      ],
    },
  },
  {
    slug: 'vulnerability-management',
    pillar: 'discover',
    title: 'Vulnerability Management',
    shortTitle: 'Vulnerability Management',
    tagline:
      'Proactively identify, prioritize and remediate weaknesses across your entire estate.',
    intro:
      'Empower your defenses with cutting-edge Vulnerability Management. We proactively identify, assess and remediate potential threats — efficiently prioritizing vulnerabilities, safeguarding your assets and ensuring continuous resilience against emerging risks.',
    cardImage: '/cyber/images/services/vulnerability-management.jpg',
    heroImage: '/cyber/images/animals/porcupine.jpg',
    heroMetaphor: {
      name: 'Porcupine',
      description:
        'Sharp quills defend when threatened — vulnerability management neutralizes weaknesses before they can be exploited.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Insource, cosource or fully outsource — capitalize on existing security investments to establish your desired state of security operations.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Preconfigured content packs and ready-to-use integrations automate the processes of detecting and responding to threats.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Expand operations as necessary and incorporate a variety of products while preserving your current investments in security IP and technology.',
      },
    ],
    features: {
      metaphor: {
        name: 'Cactus',
        description:
          'Spines ward off herbivores — continuous scanning strengthens your defenses against attackers.',
      },
      items: [
        'Comprehensive Scanning',
        'Prioritization Algorithms',
        'Continuous Monitoring',
        'Automated Patch Management',
        'Integration Capabilities',
        'Customizable Reporting',
        'Scalability',
        'Compliance Checks',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Lionfish',
        description:
          'Venomous spines protect it — addressing weaknesses in the system provides layered protection.',
      },
      items: [
        'Proactive Threat Mitigation',
        'Reduced Attack Surface',
        'Operational Efficiency',
        'Improved Response Time',
        'Enhanced Cyber Resilience',
        'Cost Savings',
        'Regulatory Compliance',
        'Increased Stakeholder Confidence',
      ],
    },
  },
  {
    slug: 'governance-risk-compliance',
    pillar: 'discover',
    title: 'Governance, Risk & Compliance',
    shortTitle: 'GRC',
    tagline:
      'Risk assessments, compliance controls and real-time monitoring — integrated seamlessly.',
    intro:
      'Elevate your cybersecurity resilience with our Governance, Risk & Compliance solutions. Seamlessly integrate risk assessments, compliance controls and real-time monitoring to gain comprehensive insight — regulatory adherence, proactive risk mitigation and confident decision-making.',
    cardImage: '/cyber/images/services/grc.jpg',
    heroImage: '/cyber/images/animals/turtle.jpg',
    heroMetaphor: {
      name: 'Turtle',
      description:
        'Slow but steady progress — the consistency and thoroughness at the heart of effective GRC.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Insource, cosource or fully outsource — capitalize on existing security investments to establish your desired state of security operations.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Preconfigured content packs and ready-to-use integrations automate compliance tracking and threat response.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Expand as necessary, incorporating a variety of products while preserving your investments in security IP and technology.',
      },
    ],
    features: {
      metaphor: {
        name: 'Bamboo',
        description:
          'Sturdy yet flexible — the balance GRC strikes between compliance and adaptability.',
      },
      items: [
        'Unified GRC Platform',
        'Automated Compliance Tracking',
        'Risk Assessment Tools',
        'Incident Response Integration',
        'Policy Management',
        'Audit Trail & Reporting',
        'Vendor Risk Management',
        'Continuous Monitoring',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Cleaner Shrimp',
        description:
          'Works symbiotically with fish to keep them healthy — GRC removes risk to maintain system health.',
      },
      items: [
        'Enhanced Cybersecurity Posture',
        'Regulatory Compliance Assurance',
        'Efficient Resource Allocation',
        'Timely Incident Response',
        'Improved Decision-Making',
        'Cost Reduction',
        'Vendor Risk Mitigation',
        'Continuous Improvement',
      ],
    },
  },
  {
    slug: 'devsecops',
    pillar: 'adapt',
    title: 'DevSecOps',
    shortTitle: 'DevSecOps',
    tagline:
      'Security embedded in every stage of your development lifecycle — not bolted on after.',
    intro:
      'Our DevSecOps services integrate security seamlessly within the DevOps process. Security is not an afterthought but a fundamental component of your development lifecycle — from initial design to deployment, aligned with rapid release cycles.',
    cardImage: '/cyber/images/services/devsecops.jpg',
    heroImage: '/cyber/images/animals/komodo.jpg',
    heroMetaphor: {
      name: 'Komodo Dragon',
      description:
        'Strong and agile — the strength and responsiveness of DevSecOps addressing security issues in real time.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Tailored to projects of any size, adapting to the unique needs of each development process and to new security challenges as they emerge.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Automated, continuous security assessments streamline development while centralizing compliance for consistent regulatory adherence.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Choose the service model that suits you — evolve and adjust security strategies while maintaining your existing security investments.',
      },
    ],
    features: {
      metaphor: {
        name: 'Venus Flytrap',
        description:
          'Responds rapidly to potential threats — the agility and quick response DevSecOps brings to security.',
      },
      items: [
        'Integrated Security',
        'Automated Security Testing',
        'Continuous Compliance Monitoring',
        'Real-Time Threat Detection',
        'Collaborative Work Environment',
        'Custom Security Tool Integration',
        'Secure Code Review Practices',
        'DevSecOps Training',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Clownfish',
        description:
          'Lives within anemones for protection — security tightly integrated into a collaborative development environment.',
      },
      items: [
        'Enhanced Security Throughout Development',
        'Faster Time to Market',
        'Cost-Effective Security Solutions',
        'Improved Compliance Posture',
        'Scalability & Flexibility',
        'Proactive Risk Management',
        'Increased Developer Productivity',
        'Building Customer Trust',
      ],
    },
  },
  {
    slug: 'security-operation-center',
    pillar: 'adapt',
    title: 'Security Operations Center',
    shortTitle: 'SOC',
    tagline:
      'Preventive, detective and automated controls across every organizational layer.',
    intro:
      'Our Security Operations Center integrates cybersecurity risk and compliance across all organizational layers. We foster collaboration among Cybersecurity, IT and Operations, establishing a robust framework of preventive, detective and automated controls.',
    cardImage: '/cyber/images/services/soc.jpg',
    heroImage: '/cyber/images/animals/eagle.jpg',
    heroMetaphor: {
      name: 'Eagle',
      description:
        'Sharp eyesight detects threats from a distance — real-time monitoring that misses nothing.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Insource, cosource or fully outsource — capitalize on existing security investments to establish your desired state of security operations.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Preconfigured content packs and ready-to-use integrations automate detection and response processes.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Expand operations as necessary with the flexibility to incorporate a variety of products, preserving investments in security IP and technology.',
      },
    ],
    features: {
      metaphor: {
        name: 'Mimosa Pudica',
        description:
          'The “sensitive plant” reacts instantly to touch — mirroring the SOC’s rapid response to potential threats.',
      },
      items: [
        'Comprehensive risk assessments, controls and mapping',
        'Cybersecurity risk, issue and dependency reviews',
        'Security & Cybersecurity Risk Assessments (SRA/CRA)',
        'Real-time monitoring and governance reporting',
        'Risk dashboards tailored for each project',
        'Aggregate risk analysis for portfolio profiling',
        'Links to broader project controls environments',
        'Insight and expertise for project and program boards',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Shark',
        description:
          'Acute senses constantly monitoring its environment — comprehensive, round-the-clock surveillance.',
      },
      items: [
        'Consistency in addressing cybersecurity risks',
        'Reduced delays through proactive risk management',
        'Greater ability to identify opportunities',
        'More accurate estimating and resource planning',
        'Better information for contract negotiations',
        'Improved stakeholder confidence',
        'Accurate risk information for board decisions',
        'A common reference for audit and assurance',
      ],
    },
  },
  {
    slug: 'managed-security-services',
    pillar: 'adapt',
    title: 'Managed Security Services',
    shortTitle: 'Managed Security',
    tagline:
      'Proactive protection, detection and response — with compliance and peace of mind built in.',
    intro:
      'As a leading Managed Security Service Provider, we take a holistic approach to security management: comprehensive solutions designed to proactively protect, detect and respond to threats while ensuring compliance and operational efficiency.',
    cardImage: '/cyber/images/services/managed-security.jpg',
    heroImage: '/cyber/images/animals/wolverine.jpg',
    heroMetaphor: {
      name: 'Wolverine',
      description:
        'A fierce protector — managed security services guarding your systems against threats.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Security services customized to your organization, quickly adapting to evolving landscapes with scalable solutions that grow with your business.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Centralized security management for better visibility and control, with automated processes for efficient detection and response.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Unbiased, flexible security services that enhance your existing infrastructure without extensive new investments.',
      },
    ],
    features: {
      metaphor: {
        name: 'Poison Ivy',
        description:
          'A painful defense mechanism — strong barriers that protect against intruders.',
      },
      items: [
        '24/7 Monitoring & Support',
        'Advanced Threat Intelligence',
        'Incident Response & Recovery',
        'Compliance Management',
        'Risk Assessment & Management',
        'Security Awareness Training',
        'Data Protection & Privacy',
        'Customized Reporting',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Jellyfish',
        description:
          'A stinging defense that neutralizes threats quickly — protection that never switches off.',
      },
      items: [
        'Enhanced Cybersecurity Resilience',
        'Operational Efficiency',
        'Cost-Effective Security Management',
        'Proactive Risk Mitigation',
        'Comprehensive Security Coverage',
        'Improved Compliance Posture',
        'Increased Organizational Focus',
        'Business Continuity Assurance',
      ],
    },
  },
  {
    slug: 'security-architecture',
    pillar: 'adapt',
    title: 'Security Architecture Services',
    shortTitle: 'Security Architecture',
    tagline:
      'Secure design concepts and standards built on NCSC principles — CIA by design.',
    intro:
      'We design, implement and secure your confidential data, ensuring confidentiality, integrity and availability. Leveraging NCSC principles, we establish context, limit risk and enable detection — a comprehensive framework aligned with recognized standards.',
    cardImage: '/cyber/images/services/security-architecture.jpg',
    heroImage: '/cyber/images/animals/beaver.jpg',
    heroMetaphor: {
      name: 'Beaver',
      description:
        'Builds strong dams against floods — security architecture builds strong defenses for your data and infrastructure.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Insource, cosource or fully outsource — capitalize on existing security investments to establish your desired state of security operations.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Preconfigured content packs and ready-to-use integrations automate detection and response processes.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Expand as necessary with the flexibility to incorporate a variety of products, preserving current investments in security IP and technology.',
      },
    ],
    features: {
      metaphor: {
        name: 'Oak Tree',
        description:
          'Strong and rooted — a sturdy foundation for your systems.',
      },
      items: [
        'Comprehensive Threat Modeling',
        'Network Security Design',
        'Incident Response Planning',
        'Cloud Security Integration',
        'Identity & Access Management',
        'Security Compliance Framework',
        'Security Awareness Training',
        'Continuous Monitoring Systems',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Anglerfish',
        description:
          'Uses light to attract and defend — the latest technologies deployed to secure your systems.',
      },
      items: [
        'Holistic Protection',
        'Reduced Vulnerability Surface',
        'Rapid Incident Resolution',
        'Secure Cloud Environments',
        'Identity Assurance',
        'Regulatory Compliance Assurance',
        'Empowered Workforce',
        'Proactive Threat Mitigation',
      ],
    },
  },
  {
    slug: 'red-team-blue-team',
    pillar: 'evolve',
    title: 'Red Team / Blue Team',
    shortTitle: 'Red / Blue Team',
    tagline:
      'Offense and defense in constant collaboration — attack simulations that sharpen resilience.',
    intro:
      'Our dynamic Blue Team/Red Team approach embeds offensive and defensive strategies throughout your organization — from enterprise-wide initiatives to individual teams. Preventive, detective and responsive measures fortify defenses and continuously improve your posture.',
    cardImage: '/cyber/images/services/red-blue-team.jpg',
    heroImage: '/cyber/images/animals/fox.jpg',
    heroMetaphor: {
      name: 'Fox',
      description:
        'Clever and strategic — the tactics and strategy at the heart of Red/Blue teaming.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Insource, cosource or fully outsource — capitalize on existing security investments to establish your desired state of security operations.',
      },
      {
        title: 'Centralized & simplified',
        body: 'Preconfigured content packs and ready-to-use integrations automate detection and response processes.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Expand as necessary with the flexibility to incorporate a variety of products, preserving investments in security IP and technology.',
      },
    ],
    features: {
      metaphor: {
        name: 'Wisteria',
        description:
          'Strong yet flexible — testing the resilience and adaptability of systems against varied threats.',
      },
      items: [
        'Simulated Attacks',
        'Strategic Threat Assessment',
        'Incident Response Simulation',
        'Adversarial Tactics Simulation',
        'Security Architecture Evaluation',
        'Continuous Monitoring',
        'Collaborative Training',
        'Customized Scenario Development',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Swordfish',
        description:
          'Speed and agility combined — the fast-paced nature of Red/Blue team operations.',
      },
      items: [
        'Proactive Threat Mitigation',
        'Improved Incident Response',
        'Strategic Defense Enhancement',
        'Risk Reduction',
        'Comprehensive Security Evaluation',
        'Skill Development',
        'Regulatory Compliance Assurance',
        'Enhanced Incident Recovery',
      ],
    },
  },
  {
    slug: 'cisoaas',
    pillar: 'evolve',
    title: 'CISO as a Service',
    shortTitle: 'CISOaaS',
    tagline:
      'Executive-grade security leadership, on demand — without the full-time cost.',
    intro:
      'CISOaaS provides the expertise of a Chief Information Security Officer on an on-demand, fractional basis — aligning cybersecurity initiatives with your business objectives and bolstering your overall security posture, guided by NCSC cyber design principles.',
    cardImage: '/cyber/images/services/solutions.jpg',
    heroImage: '/cyber/images/animals/wolf.jpg',
    heroMetaphor: {
      name: 'Wolf',
      description:
        'Operates in packs with strategic coordination — aligning teams, policies and frameworks under one coherent strategy.',
    },
    valueProps: [
      {
        title: 'Flexibility & adaptability',
        body: 'Experienced security leadership without a full-time hire — from 4–5 days a month on retainer to 6–18 month full or part-time engagements.',
      },
      {
        title: 'Centralized & simplified',
        body: 'From developing a full security program to specific capabilities like incident response, awareness training and efficient security monitoring.',
      },
      {
        title: 'No vendor lock-in',
        body: 'Effective incident management with an iterative approach that combines industry insight and cutting-edge tools — no lock-in contracts.',
      },
    ],
    features: {
      metaphor: {
        name: 'Baobab Tree',
        description:
          'Stores water and thrives in harsh climates — stability under high-pressure, resource-limited conditions.',
      },
      items: [
        'Expert Guidance',
        'Elevating Cyber Strategy',
        'Identity & Access Management',
        'Proactive Threat Management',
        'Iterative Security Improvements',
        'Robust Security Framework Development',
      ],
    },
    benefits: {
      metaphor: {
        name: 'Archerfish',
        description:
          'Shoots jets of water with precision — pinpointing and neutralizing risks effectively.',
      },
      items: [
        'Strategic Risk Management',
        'Governance & Compliance',
        'Scalable Security Solutions',
        'No Lock-in Contracts',
        'Enhanced Security Posture',
        'Reduced Operational Costs',
        'Rapid Adaptation to Emerging Threats',
        'Access to Cutting-Edge Technologies',
      ],
    },
  },
]

export function servicesByPillar(pillar: PillarSlug): Service[] {
  return SERVICES.filter((s) => s.pillar === pillar)
}

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug)
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
