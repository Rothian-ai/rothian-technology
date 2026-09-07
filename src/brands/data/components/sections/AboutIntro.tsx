import { about } from '@data/data/about';
import { Button } from '@data/components/ui/Button';
import { Eyebrow } from '@data/components/ui/Eyebrow';
import { SplitText } from '@data/components/ui/SplitText';
import { Reveal } from '@data/components/ui/Reveal';
import { ParallaxImage } from '@data/components/ui/ParallaxImage';
import { Counter } from '@data/components/ui/Counter';

const metrics = [
  { value: 9, suffix: '', label: 'Service disciplines' },
  { value: 100, suffix: '%', label: 'Cloud-native delivery' },
  { value: 3, suffix: '', label: 'Steps to production' },
];

/** Homepage "About Us" band — asymmetric split with a scroll-parallax portrait. */
export function AboutIntro() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40" aria-label="About Rothian Data">
      <div className="bloom -right-32 top-1/4 size-[30rem] opacity-20" aria-hidden />

      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ParallaxImage
            src={about.image}
            alt="Rothian Data engineering team at work"
            className="aspect-4/5 rounded-2xl border border-ink-700"
            strength={10}
            width={1200}
            height={1500}
          />
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
          </Reveal>

          <SplitText
            as="h2"
            lines={['The New Wave', 'of Data Engineering']}
            className="mt-7 text-h2"
          />

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lead text-paper/60">{about.homeBody}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10">
              <Button href="/data/about-us" variant="outline" arrow>
                Explore More
              </Button>
            </div>
          </Reveal>

          <div className="rule mt-14" />

          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.06 * i}>
                <div>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-none text-brand-green">
                      <Counter to={m.value} suffix={m.suffix} />
                    </span>
                    <span className="mt-3 block font-mono text-label uppercase tracking-[0.2em] text-mist">
                      {m.label}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
