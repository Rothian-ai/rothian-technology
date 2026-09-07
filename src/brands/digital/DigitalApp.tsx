import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BrandTheme } from '../../components/layout/BrandTheme'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import Home from './pages/Home'

const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const Showcase = lazy(() => import('./pages/Showcase'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const Insights = lazy(() => import('./pages/Insights'))

function PageFallback() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-ink-950"
      role="status"
      aria-label="Loading"
    >
      <div className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-festival-orange" />
    </div>
  )
}

/**
 * Rothian Digital, mounted at /digital.
 *
 * Route paths are relative to the /digital/* parent; link targets in the
 * markup are absolute and already carry the prefix. The unknown-route
 * fallback returns to the section home rather than the site root, so a bad
 * /digital URL keeps the visitor inside Digital.
 *
 * The wrapper carries the brand's dark ground: as a standalone site this came
 * from a body rule, which now belongs to whichever brand is active.
 */
export default function DigitalApp() {
  return (
    <BrandTheme brand="digital">
      <div className="bg-ink-950">
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="work" element={<Work />} />
              <Route path="work/:slug" element={<WorkDetail />} />
              <Route path="showcase" element={<Showcase />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
              <Route path="insights" element={<Insights />} />
              <Route path="*" element={<Navigate to="/digital" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </BrandTheme>
  )
}
