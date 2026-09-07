import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT, SOCIALS } from '../../lib/nav'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SOCIAL_ICON_MAP } from '../ui/SocialIcons'
import { SplitText } from '../ui/SplitText'

const OVERVIEW_LINKS = [
  { label: 'Home', to: '/cyber' },
  { label: 'About Us', to: '/cyber/about' },
  { label: 'Services', to: '/cyber/services' },
  { label: 'Capabilities', to: '/cyber/capabilities' },
  { label: 'Solutions', to: '/cyber/solutions' },
  { label: 'Insights', to: '/cyber/insights' },
]

const QUICK_LINKS = [
  { label: 'Contact Us', to: '/cyber/contact' },
  { label: 'FAQ', to: '/cyber/faq' },
  { label: 'What We Do', to: '/cyber/what-we-do' },
  { label: 'Our Experts', to: '/cyber/about/experts' },
]

const CAPABILITY_LINKS = [
  { label: 'Application', href: 'https://rothian.com/category/capabilities/application/' },
  { label: 'Cloud', href: 'https://rothian.com/category/capabilities/cloud/' },
  { label: 'Cyber', href: 'https://rothian.com/category/capabilities/cyber/' },
  { label: 'Data', href: 'https://rothian.com/category/capabilities/data/' },
  { label: 'Digital', href: 'https://rothian.com/category/capabilities/digital/' },
]

/** Dark cinematic footer: marquee tagline, huge CTA, sitemap columns — the Rothian family footer. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-abyss-950 text-white">
      {/* Ambient bioluminescent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.55), rgba(45,212,238,0.35) 55%, transparent 75%)',
        }}
      />

      {/* Marquee tagline — the brand's rallying cry */}
      <div className="border-b border-white/10 py-8">
        <Marquee className="select-none">
          {['Discover.', 'Adapt.', 'Evolve.'].map((word, i) => (
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
              text="Safeguarding your business."
              highlight={['business.']}
              as="h2"
              className="heading-display text-5xl text-white sm:text-7xl"
            />
            <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-lg text-white/60">
              Safeguarding your digital world with cutting-edge cybersecurity. Reach out and we'll
              get back to you shortly.
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand-cyan"
              >
                <Mail className="size-4" aria-hidden /> {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand-cyan"
              >
                <Phone className="size-4" aria-hidden /> {CONTACT.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p className="eyebrow mb-4 text-brand-cyan">Secure by Nature</p>
            <Link
              to="/cyber/contact"
              className="group flex items-center justify-between gap-4 rounded-3xl border border-white/15 bg-white/5 px-7 py-6 backdrop-blur-sm transition-colors hover:border-brand-violet/60"
            >
              <span>
                <span className="block font-display text-xl font-bold text-white">
                  Book a security assessment
                </span>
                <span className="mt-1 block text-sm text-white/55">
                  Free consultation — tailored to your organization.
                </span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-gradient text-white transition-transform group-hover:scale-105">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </Link>
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
            <Link to="/cyber" aria-label="Rothian Cyber — Home">
              <img
                src="/cyber/logos/rothian-cyber-logo-white.png"
                alt="Rothian Cyber"
                className="h-9 w-auto"
                loading="lazy"
                width={125}
                height={36}
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Secure by Nature — cybersecurity inspired by natural defenses, safeguarding
              businesses across the UK and UAE.
            </p>
          </div>
          {(
            [
              ['Overview', OVERVIEW_LINKS, false],
              ['Quick Links', QUICK_LINKS, false],
              ['Capabilities', CAPABILITY_LINKS, true],
            ] as const
          ).map(([title, links, external]) => (
            <nav key={title} aria-label={title}>
              <h3 className="eyebrow mb-5 text-white/40">{title}</h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {external ? (
                      <a
                        href={(link as { href: string }).href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/70 transition-colors hover:text-brand-cyan"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={(link as { to: string }).to}
                        className="text-sm text-white/70 transition-colors hover:text-brand-cyan"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {title === 'Overview' && (
                  <li>
                    <a
                      href="https://people.rothian.com/careers"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-white/70 transition-colors hover:text-brand-cyan"
                    >
                      Careers
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rothian Cyber. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Friendly when you reach out. Hardened when it matters.
          </p>
        </div>
      </div>
    </footer>
  )
}
