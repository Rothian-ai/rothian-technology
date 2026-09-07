export interface Expert {
  role: string
  metaphor: string
  metaphorWhy: string
  description: string
}

/** "Guardians of Digital Fortresses" — each expert role mapped to its nature counterpart. */
export const EXPERTS: Expert[] = [
  {
    role: 'Security Consultant',
    metaphor: 'Border Collie',
    metaphorWhy:
      'Intelligent and alert, always scanning for issues and guiding the flock safely — consultants who anticipate risks and maintain control.',
    description:
      'The frontline defenders of your digital fortress. With deep knowledge of cybersecurity frameworks and industry best practices, they assess, analyze and design robust security strategies tailored to your business — spanning network security, application security and risk management.',
  },
  {
    role: 'vCISO',
    metaphor: 'Owl',
    metaphorWhy:
      'The classic symbol of wisdom, strategic foresight and silent observation — overseeing, predicting and advising with precision.',
    description:
      'Your virtual guardians, offering strategic security leadership without a full-time in-house executive. Seasoned professionals managing risk, developing security policy and ensuring compliance — aligning cybersecurity initiatives with your business objectives.',
  },
  {
    role: 'Cyber Strategy Expert',
    metaphor: 'Octopus',
    metaphorWhy:
      'Intelligent and adaptable — multifaceted strategic thinking with simultaneous control over network, application and policy domains.',
    description:
      'Craft comprehensive plans that blend proactive defense with incident response. Through thorough risk assessments and constant awareness of industry trends, they ensure your organization is secure today and resilient against tomorrow’s threats.',
  },
  {
    role: 'L2/L3 Security Specialist',
    metaphor: 'Honey Badger',
    metaphorWhy:
      'Fearless and relentless — tenacity and resilience when handling complex breaches or zero-day threats.',
    description:
      'The backbone of our technical defense. Proficient in intricate security incidents with deep understanding of network protocols, encryption and threat vectors — detection, response and mitigation that keeps your infrastructure resilient.',
  },
  {
    role: 'SOC Analyst',
    metaphor: 'Aloe Vera',
    metaphorWhy:
      'Both protective and healing — incident response and post-breach recovery in one.',
    description:
      'Vigilant guardians monitoring your digital landscape around the clock. With a keen eye for anomalies and rapid response to threats, they provide real-time analysis so incidents are identified and neutralized swiftly — minimizing damage and downtime.',
  },
]

export interface Team {
  name: string
  image: string
  description: string
}

export const TEAMS: Team[] = [
  {
    name: 'Red Team',
    image: '/cyber/images/teams/red.jpg',
    description:
      'Simulates sophisticated cyber attacks — adopting the mindset and tactics of real attackers to find and exploit vulnerabilities in your defenses before they do.',
  },
  {
    name: 'Blue Team',
    image: '/cyber/images/teams/blue.jpg',
    description:
      'Specializes in defense — maintaining robust protections, monitoring for intrusions and responding to breaches so your digital assets remain secure.',
  },
  {
    name: 'Purple Team',
    image: '/cyber/images/teams/purple.jpg',
    description:
      'Merges Red Team offense with Blue Team defense — a holistic, continuously improving approach to organizational security and resilience.',
  },
]

export interface Value {
  title: string
  body: string
}

export const VALUES: Value[] = [
  {
    title: 'Take care of our environment',
    body: 'Look after our planet on behalf of the next generation.',
  },
  {
    title: 'Integrate with our communities',
    body: 'We embed ourselves, integrating and adopting new ways of working.',
  },
  {
    title: 'Invest in our staff',
    body: 'Promoting wellbeing and creating an inclusive culture so everyone feels safe and can be themselves.',
  },
  {
    title: 'Put values ahead of commercial',
    body: 'Earn respect through honesty and integrity, even when it means a poorer commercial outcome for Rothian.',
  },
]
