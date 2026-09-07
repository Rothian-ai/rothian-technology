import { Button } from '../components/ui/Button'
import { SplitText } from '../components/ui/SplitText'
import { Reveal } from '../components/ui/Reveal'
import { usePageMeta } from '../lib/seo'

export default function NotFound() {
  usePageMeta('Page Not Found | Rothian Cyber')

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-abyss-950 bg-cyber-grid">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.7), rgba(45,212,238,0.4) 55%, transparent 78%)',
        }}
      />
      <div className="container-site relative z-10 py-32 text-center">
        <p className="heading-display text-gradient text-8xl sm:text-9xl">404</p>
        <SplitText
          text="This perimeter is secure. Nothing here."
          as="h1"
          className="heading-section mx-auto mt-6 max-w-2xl text-3xl text-white sm:text-5xl"
        />
        <Reveal as="p" delay={0.2} className="mx-auto mt-6 max-w-md text-white/60">
          The page you're looking for doesn't exist — or it's very well hidden. Let's get you back
          to safety.
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button to="/cyber" size="lg" withArrow>
            Back to Home
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
