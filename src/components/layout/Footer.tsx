import type { CSSProperties, ElementType } from 'react'
import { ArrowUpRight, CalendarClock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT, GROUP_NETWORK, SOCIALS } from '../../lib/nav'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SOCIAL_ICON_MAP } from '../ui/SocialIcons'
import { SplitText } from '../ui/SplitText'

const SERVICE_LINKS = [
  { label: 'Strategy', to: '/services/strategy' },
  { label: 'Design', to: '/services/design' },
  { label: 'Development', to: '/services/development' },
  { label: 'Delivery', to: '/services/delivery' },
  { label: 'Operations', to: '/services/operations' },
]

const CAPABILITY_LINKS = [
  { label: 'Application', to: '/capabilities/application' },
  { label: 'Cloud', to: '/capabilities/cloud' },
  { label: 'Cyber', to: '/capabilities/cyber' },
  { label: 'Data', to: '/capabilities/data' },
  { label: 'Digital', to: '/capabilities/digital' },
]

const COMPANY_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Social Values', to: '/social-values' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

const POLICY_LINKS = [
  { label: 'Privacy Policy', href: 'https://rothian.com/privacy-policy/' },
  { label: 'Modern Slavery', href: 'https://rothian.com/modern-slavery-policy/' },
  { label: 'Anti-Money Laundering', href: 'https://rothian.com/anti-money-laundering-policy/' },
  { label: 'Anti-Bribery & Corruption', href: 'https://rothian.com/anti-bribery-corruption-policy/' },
]

/** Dark cinematic footer: lifecycle marquee, huge CTA, group network, sitemap and compliance. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      {/* Ambient power-red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,106,94,0.55), rgba(43,57,144,0.45) 55%, transparent 75%)',
        }}
      />

      {/* Lifecycle marquee — the brand line */}
      <div className="border-b border-white/10 py-8">
        <Marquee className="select-none">
          {['Design.', 'Develop.', 'Deliver.', 'Operate.'].map((word, i) => (
            <span
              key={i}
              className={`px-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl ${
                i % 2 ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]' : 'text-white'
              }`}
            >
              {word}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Big CTA */}
      <div className="container-site relative py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <SplitText
              text="Empowering your business."
              highlight={['Empowering']}
              as="h2"
              className="heading-display text-5xl text-white sm:text-7xl"
            />
            <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-lg text-white/60">
              Fresh ideas and agile solutions — tell us where you want to go and we'll bring the
              capability to get you there.
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand-coral"
              >
                <Mail className="size-4" aria-hidden /> {CONTACT.email}
              </a>
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand-coral"
              >
                <CalendarClock className="size-4" aria-hidden /> Book a consultation
              </a>
            </Reveal>
          </div>

          {/* Group network */}
          <Reveal delay={0.25}>
            <p className="eyebrow mb-5 text-brand-ice">Explore our network</p>
            <ul className="flex flex-col gap-3">
              {GROUP_NETWORK.map((company) => {
                // Digital, Cyber and Data are sections of this site; Apps is
                // still a separate property.
                const internal = company.href.startsWith('/')
                const Tag: ElementType = internal ? Link : 'a'
                const linkProps: Record<string, unknown> = internal
                  ? { to: company.href }
                  : { href: company.href, target: '_blank', rel: 'noreferrer' }

                return (
                <li key={company.name}>
                  <Tag
                    {...linkProps}
                    style={{ '--accent': company.accent } as CSSProperties}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-6 pr-5 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--accent)] hover:bg-white/10"
                  >
                    {/* Brand accent bar */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {/* Monochrome white logo with the sub-brand label knocked out, so it reads
                        as a dark cut-out on the dark footer — no colour, but the name stays visible */}
                    <img
                      src={company.logoMono}
                      alt={company.name}
                      loading="lazy"
                      className="h-[34px] w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                      height={34}
                    />
                    <ArrowUpRight
                      className="size-4 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--accent)]"
                      aria-hidden
                    />
                  </Tag>
                </li>
                )
              })}
            </ul>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map(({ label, href }) => {
                const Icon = SOCIAL_ICON_MAP[label as keyof typeof SOCIAL_ICON_MAP]
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-transparent hover:bg-brand-gradient hover:text-white"
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Link columns */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-white/10 pt-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" aria-label="Rothian — Home">
              <img
                src="/logos/rothian-tech-logo-white.png"
                alt="Rothian — Empowering Business"
                className="h-9 w-auto"
                loading="lazy"
                width={117}
                height={36}
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              A technology consultancy that chooses agility over scale and capability over
              resources. Design. Develop. Deliver. Operate.
            </p>
          </div>
          {(
            [
              ['Services', SERVICE_LINKS],
              ['Capabilities', CAPABILITY_LINKS],
              ['Company', COMPANY_LINKS],
            ] as const
          ).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="eyebrow mb-5 text-white/40">{title}</h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 transition-colors hover:text-brand-coral"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Compliance + legal */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {POLICY_LINKS.map((policy) => (
              <li key={policy.label}>
                <a
                  href={policy.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white/70"
                >
                  {policy.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Rothian. All rights reserved.</p>
            <p className="font-mono">
              Company No. {CONTACT.companyNo} · VAT Reg. {CONTACT.vatNo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
