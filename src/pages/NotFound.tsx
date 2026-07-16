import { Button } from '../components/ui/Button'
import { usePageMeta } from '../lib/seo'

export default function NotFound() {
  usePageMeta('Page Not Found | Rothian')

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black_30%,transparent_100%)]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(224,49,64,0.55), transparent 70%)',
        }}
      />
      <div className="container-site relative z-10 py-40 text-center">
        <p className="eyebrow text-brand-ice">Error 404 — signal lost</p>
        <h1 className="heading-display mt-6 text-7xl text-white sm:text-9xl">
          4<span className="text-gradient">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/60">
          This page has been decommissioned or never made it past design review.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button to="/" size="lg" withArrow>
            Back to Home
          </Button>
          <Button
            to="/contact"
            size="lg"
            variant="ghost"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
