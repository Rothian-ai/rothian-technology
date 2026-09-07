import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { footerCapabilities, footerOverview, site, socials } from '@data/data/site';
import { services } from '@data/data/services';
import { SplitText } from '@data/components/ui/SplitText';
import { Reveal } from '@data/components/ui/Reveal';
import { Eyebrow } from '@data/components/ui/Eyebrow';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink-700 bg-ink-900">
      <div className="bloom -left-40 bottom-0 size-[34rem] opacity-25" aria-hidden />

      <div className="container-site relative py-20 lg:py-28">
        {/* Signature block — the brand's own footer line, set as a statement. */}
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{site.signature}</Eyebrow>
            <SplitText
              as="h2"
              className="mt-7 text-h1"
              lines={[
                'Enriching',
                <span key="accent" className="text-brand-green">
                  Your Business.
                </span>,
              ]}
            />
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-lead text-paper/55">{site.locationLine}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-10 inline-flex items-baseline gap-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-paper transition-colors duration-300 hover:text-brand-green"
              >
                {site.email}
                <ArrowUpRight className="size-6 self-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Reveal>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 sm:grid-cols-3 lg:col-span-5 lg:pt-3"
          >
            <FooterColumn title="Overview">
              {footerOverview.map((l) => (
                <FooterLink key={l.href} to={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Services">
              {services.slice(0, 6).map((s) => (
                <FooterLink key={s.slug} to={`/data/services/${s.slug}`}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Capabilities">
              {footerCapabilities.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.9375rem] text-paper/55 transition-colors duration-300 hover:text-brand-green"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </FooterColumn>
          </nav>
        </div>

        <div className="rule my-14" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* The brand's own rebrand logo animation, used once, quietly. */}
          <video
            // The source WebM carries an opaque black background rather than an
            // alpha channel; screen-blending drops it out against the dark footer.
            className="h-12 w-auto mix-blend-screen"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          >
            <source src={site.logo.animation} type="video/webm" />
          </video>

          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-label uppercase tracking-[0.18em] text-mist transition-colors duration-300 hover:text-brand-green"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-mono text-label uppercase tracking-[0.18em] text-mist">
            &copy; {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-label uppercase tracking-[0.22em] text-mist">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-[0.9375rem] text-paper/55 transition-colors duration-300 hover:text-brand-green"
      >
        {children}
      </Link>
    </li>
  );
}
