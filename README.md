# Rothian Technology — Website Rebuild

A premium, cinematic rebuild of [rothian.com](https://rothian.com) — the technology consultancy
at the heart of the Rothian Group. Same services, same voice, same compliance footprint;
presented as part of the group's shared design language established by the Rothian Digital
prototype (`../rothian-digital`).

## Family DNA vs. own identity

Shared with Rothian Digital (the group design system):

- Glass-pill fixed navbar, pill CTAs, rounded-3xl cards, `container-site` 80rem grid
- Masked split-text reveals, fade-rise scroll reveals, sticky card deck, count-up stats
- Signature ease `cubic-bezier(0.16, 1, 0.3, 1)`, Lenis smooth scrolling, scroll progress bar
- Dark cinematic footer with brand-line marquee and huge CTA

Technology's own personality (extracted from the live logo — navy `#283078` wordmark, red
power-button `#c02828 → #f06870`):

| Token | Value |
| --- | --- |
| Accent gradient | `137deg, #FF6A5E → #B41E30` (power red) |
| Ink scale | Navy-tinted darks `#05060E … #1A2038` (vs. Digital's warm purple) |
| Secondary accent | Electric blue `#6B7DFF` / ice `#A9B6FF` (dark sections) |
| Display + body | Inter |
| Labels / numerals | IBM Plex Mono (`// eyebrow` engineering voice) |
| Texture | Blueprint grid backdrops, phase numerals, stack chips |

## Stack

React 19 + Vite + TypeScript · Tailwind CSS v4 (`@theme` tokens in `src/index.css`) ·
Framer Motion · Lenis · React Router (per-route code splitting) · Lucide icons

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint
```

## Structure

```
public/            real brand assets downloaded from rothian.com
  logos/           Rothian Tech logo (color + white) + group company logos
  images/clients/  CST, Concerto, tmc3, Encordia partner logos
  videos/          hero.mp4 — power-red 3D mesh loop (Mixkit free license, id 34302),
                   matching the video heroes on Rothian Digital & Cyber; plus the
                   2026 rebrand logo animation (webm, transparent)
src/
  components/
    layout/        Navbar, Footer, ScrollProgress, ScrollManager
    ui/            Button, Reveal, SplitText, SectionHeading, Marquee, Accordion, CountUp, SocialIcons
    home/          Hero, ClientsMarquee, LifecycleShowcase, CapabilitiesGrid, WhoWeAre, SolutionsStrip, FaqSection
    shared/        PageHero, CtaBand, NetworkSection
  data/            services (5 phases + 31 sub-services), subservices (per-page video,
                   intro copy and deliverables for all 31 posts), capabilities (5 practices),
                   solutions (4), values, faqs + engagement models, clients — all crawled
                   from the live site
  pages/           Home, Services, ServiceDetail, SubServiceDetail, Capabilities,
                   CapabilityDetail, Solutions, SocialValues, Careers, Contact, NotFound
  hooks/ lib/      useLenis, motion variants, nav model, per-page SEO
```

## Routes

`/` · `/services` · `/services/:slug` — serves both the 5 category pages (strategy, design,
development, delivery, operations) **and the 31 sub-service pages** (e.g.
`/services/devsecops-services`, `/services/capacity`), matching the live site's post URLs ·
`/capabilities` · `/capabilities/:slug` (application, cloud, cyber, data, digital) ·
`/solutions` (anchors per solution) · `/social-values` · `/careers` · `/contact`
(`?interest=` deep-linking from every CTA) · 404

Each sub-service page carries the live site's YouTube explainer (click-to-play
`youtube-nocookie` embed — no third-party iframe until requested), the full intro copy and
the deliverables checklist, all crawled into `src/data/subservices.ts`.

## Content model

The five services are presented as the delivery lifecycle behind the brand line
**Design. Develop. Deliver. Operate.** — phase numbers run through the sticky home
showcase, the services rail and the detail pages. Capabilities cross-link to the
services that apply them and to the specialist group company (Rothian Digital / Cyber /
Data / Apps) where one exists.

## Notes

- **Frontend only.** The contact form shows a success state client-side; wire it to the
  CRM in production. The "Book a Consultation" CTA links to the live Outlook Bookings page.
- Policy links (Privacy, Modern Slavery, AML, ABC) point to the live rothian.com pages.
- Careers links to people.rothian.com/careers (external system).
- All copy is preserved or lightly edited from the live site; company/VAT numbers are real.
- Animations respect `prefers-reduced-motion` (CSS + `MotionConfig reducedMotion="user"`).
