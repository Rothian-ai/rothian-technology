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
    </MotionConfig>
  )
}
