import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SOCIAL_ICON_MAP } from '../ui/SocialIcons'
import { SplitText } from '../ui/SplitText'
import { CONTACT, SOCIALS } from '../../lib/nav'
import { METHOD } from '../../data/journey'
import { NAV_ITEMS } from '../../lib/nav'

/** Each capability now leads to the group site that owns it. Cloud has no
 *  sibling brand, so it stays on the main site's own capability page. */
const CAPABILITIES = [
  { label: 'Application', to: '/ui4ai' },
  { label: 'Cloud', to: '/capabilities/cloud' },
  { label: 'Cyber', to: '/cyber' },
  { label: 'Data', to: '/data' },
  { label: 'Digital', to: '/digital' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl animate-drift"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(251,191,36,0.45), rgba(238,135,34,0.4) 35%, rgba(168,24,122,0.35) 65%, transparent 78%)',
        }}
      />

      {/* Method marquee */}
      <div className="border-b border-white/10 py-8">
        <Marquee className="select-none">
          {METHOD.map((word, i) => (
            <span
              key={word}
              className={`px-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl ${
                i % 2
                  ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]'
                  : 'text-white'
              }`}
            >
              {word}.
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-site relative py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <SplitText
              text="Let's reimagine your business."
              highlight={['business.']}
              as="h2"
              className="heading-display text-4xl text-white sm:text-6xl"
            />
            <Reveal as="p" delay={0.15} className="mt-6 max-w-md text-lg text-white/60">
              No upfront costs, no bs. Tell us where you want to be — we'll show you how we get you
              there.
            </Reveal>
            <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/digital/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-festival-gradient px-8 py-4 font-display font-semibold text-white transition-transform duration-300 hover:scale-[1.03] focus-brand"
              >
                Book a discovery call
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-festival-yellow focus-brand"
              >
                <Mail className="size-4" aria-hidden /> {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-festival-yellow focus-brand"
              >
                <Phone className="size-4" aria-hidden /> {CONTACT.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href }) => {
                const Icon = SOCIAL_ICON_MAP[label as keyof typeof SOCIAL_ICON_MAP]
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-transparent hover:bg-festival-gradient hover:text-white focus-brand"
                  >
                    <Icon className="size-4.5" />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Columns */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-white/10 pt-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <img
              src="/digital/logos/rothian-digital-logo-white.png"
              alt="Rothian Digital"
              className="h-9 w-auto"
              loading="lazy"
              width={140}
              height={36}
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              The AI-native creative marketing agency. Human creativity, AI velocity — across the UK
              and UAE.
            </p>
          </div>

          <nav aria-label="Site">
            <h3 className="eyebrow mb-5 text-white/35">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/65 transition-colors hover:text-festival-yellow focus-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://people.rothian.com/careers"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition-colors hover:text-festival-yellow focus-brand"
                >
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Group capabilities">
            <h3 className="eyebrow mb-5 text-white/35">Capabilities</h3>
            <ul className="flex flex-col gap-3">
              {CAPABILITIES.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.to}
                    className="text-sm text-white/65 transition-colors hover:text-festival-yellow focus-brand"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The Rothian group">
            <h3 className="eyebrow mb-5 text-white/35">Rothian Group</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Rothian — Technology', to: '/' },
                { label: 'Rothian — Cyber', to: '/cyber' },
                { label: 'Rothian — Data', to: '/data' },
                { label: 'Rothian — App', to: '/ui4ai' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/65 transition-colors hover:text-festival-yellow focus-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-white/30">Empowering Business.</span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rothian Digital. All rights reserved.</p>
          <p>Reimagining your business.</p>
        </div>
      </div>
    </footer>
  )
}
