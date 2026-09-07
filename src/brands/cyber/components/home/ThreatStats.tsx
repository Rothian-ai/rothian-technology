import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const STATS = [
  {
    to: 69,
    suffix: '%',
    label: 'of large businesses in the UAE reported attacks in the past 12 months',
  },
  {
    to: 4.4,
    prefix: '$',
    suffix: 'M',
    decimals: 1,
    label: 'average annual cost of cybercrime per victim — phishing leads the pack',
  },
  {
    to: 21,
    suffix: '%',
    label: 'of businesses have a formal incident response plan in place',
  },
  {
    to: 24,
    suffix: '/7',
    label: 'continuous monitoring, detection and response from our SOC',
  },
]

/** Animated threat-landscape statistics — why security is not discretionary. */
export function ThreatStats() {
  return (
    <section className="bg-abyss-900 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="The Threat Landscape"
          title="Security is not discretionary. It is undeniably crucial."
          highlight={['crucial.']}
          description="Attacks are growing in volume and sophistication. With hybrid work and rapid technology adoption, small and medium businesses face heightened risk — compounded by budget limits and scarce security expertise."
          className="mb-16 sm:mb-20"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="border-t border-white/15 pt-6"
            >
              <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {stat.decimals ? (
                  <span className="text-gradient">
                    {stat.prefix}
                    {stat.to}
                    {stat.suffix}
                  </span>
                ) : (
                  <CountUp
                    to={stat.to}
                    prefix={stat.prefix ?? ''}
                    suffix={stat.suffix}
                    className="text-gradient"
                  />
                )}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
