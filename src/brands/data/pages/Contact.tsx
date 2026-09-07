import { PageTransition } from '@data/components/layout/PageTransition';
import { PageHero } from '@data/components/sections/PageHero';
import { ContactForm } from '@data/components/sections/ContactForm';
import { Reveal } from '@data/components/ui/Reveal';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { SplitText } from '@data/components/ui/SplitText';
import { site, socials } from '@data/data/site';
import { services } from '@data/data/services';

export default function Contact() {

  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact Us"
        titleLines={['Enriching Your', 'Business with Data']}
        lead="From data management to advanced analytics, we help businesses harness the full potential of their information for strategic advantage."
        crumbs={[{ label: 'Home', href: '/data' }, { label: 'Contact' }]}
        media="/data/images/site/data-helix.webp"
      />

      <section className="pb-28 lg:pb-40" aria-label="Get in touch">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Detail rail */}
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Direct</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-bold tracking-tight transition-colors duration-300 hover:text-brand-green"
              >
                {site.email}
              </a>
            </Reveal>

            <div className="rule my-10" />

            <Reveal delay={0.12}>
              <div>
                <p className="font-mono text-label uppercase tracking-[0.22em] text-mist">Where</p>
                <p className="mt-4 text-paper/60">{site.locationLine}</p>
              </div>
            </Reveal>

            <div className="rule my-10" />

            <Reveal delay={0.16}>
              <div>
                <p className="font-mono text-label uppercase tracking-[0.22em] text-mist">Follow</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-paper/60 transition-colors hover:text-brand-green"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="rule my-10" />

            <Reveal delay={0.2}>
              <div>
                <p className="font-mono text-label uppercase tracking-[0.22em] text-mist">
                  We can help with
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li
                      key={s.slug}
                      className="rounded-full border border-ink-700 px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/50"
                    >
                      {s.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>Send a message</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              lines={['We’d love to hear', 'from you.']}
              className="mb-12 mt-6 text-h2"
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
