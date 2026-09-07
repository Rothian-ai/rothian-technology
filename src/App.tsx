import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollManager } from './components/layout/ScrollManager'
import { useLenis } from './hooks/useLenis'
import { SERVICE_MAP } from './data/services'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const SubServiceDetail = lazy(() => import('./pages/SubServiceDetail'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const CapabilityDetail = lazy(() => import('./pages/CapabilityDetail'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SocialValues = lazy(() => import('./pages/SocialValues'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Group brands. Each ships its own navbar, footer and theme scope, so they are
// mounted beside the main site's shell rather than inside it.
const CyberApp = lazy(() => import('./brands/cyber/CyberApp'))
const DigitalApp = lazy(() => import('./brands/digital/DigitalApp'))

/** /services/:slug serves both the 5 category pages and the 31 sub-service post pages (live-site URL parity). */
function ServiceRoute() {
  const { slug } = useParams()
  return slug && SERVICE_MAP.has(slug) ? <ServiceDetail /> : <SubServiceDetail />
}

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper" role="status" aria-label="Loading">
      <div className="size-10 animate-spin rounded-full border-2 border-ink-900/10 border-t-brand-red" />
    </div>
  )
}

/** Rothian Technology — the main rothian.com site, with its own chrome. */
function MainSite() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceRoute />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/capabilities/:slug" element={<CapabilityDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/social-values" element={<SocialValues />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

/**
 * rothian.com hosts the main Technology site plus the group brands at /digital,
 * /cyber and /data.
 *
 * Each brand renders its own navbar and footer, so the brand routes sit
 * alongside MainSite rather than inside it. What stays here at the root is
 * everything there must only ever be one of: the Lenis smooth-scroll instance,
 * MotionConfig and the scroll-restoration manager. Each brand shipped its own
 * copy of all three as a standalone site; mounting those would leave several
 * Lenis instances fighting over the same scroll.
 */
export default function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-gradient focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/cyber/*" element={<CyberApp />} />
          <Route path="/digital/*" element={<DigitalApp />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}
