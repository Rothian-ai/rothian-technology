import {
  AppWindow,
  Code2,
  FileSearch,
  KeyRound,
  Scan,
  ScrollText,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export interface Capability {
  title: string
  body: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Access Control',
    body: 'Processes and technologies that control individuals’ access to critical business information and services.',
    icon: KeyRound,
  },
  {
    title: 'Rights Management',
    body: 'Enabling rights owners to exert precise control over their information — wherever it travels.',
    icon: ScrollText,
  },
  {
    title: 'Security Testing',
    body: 'Expert testing of infrastructure and applications, including source code, across your whole estate.',
    icon: ShieldCheck,
  },
  {
    title: 'Infrastructure',
    body: 'Testing infrastructure for vulnerabilities in the configuration of hardware and software.',
    icon: Server,
  },
  {
    title: 'Application',
    body: 'Testing applications for vulnerabilities in software configurations — in development and pre-release.',
    icon: AppWindow,
  },
  {
    title: 'Code',
    body: 'Source code testing that looks deep into native vulnerabilities affecting the confidentiality, integrity and availability of your services.',
    icon: Code2,
  },
  {
    title: 'SAST',
    body: 'Static application security testing that analyzes source code at rest to uncover flaws before they ship.',
    icon: FileSearch,
  },
  {
    title: 'DAST',
    body: 'Dynamic application security testing that probes running applications the way a real attacker would.',
    icon: Scan,
  },
  {
    title: 'OWASP Alignment',
    body: 'Testing capability aligned to the Open Web Application Security Project for web applications and services.',
    icon: Workflow,
  },
]
