import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BrandTheme } from '../../components/layout/BrandTheme'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Experts = lazy(() => import('./pages/Experts'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const Services = lazy(() => import('./pages/Services'))
const PillarPage = lazy(() => import('./pages/PillarPage'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'))
const Insights = lazy(() => import('./pages/Insights'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-abyss-950" role="status" aria-label="Loading">
      <div className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-brand-violet" />
    </div>
  )
}

/**
 * Rothian Cyber, mounted at /cyber.
 *
 * Paths here are relative: this renders inside the root route `/cyber/*`, so a
 * descendant <Routes> matches against whatever follows the prefix — `services`
 * resolves to /cyber/services. Link targets in the markup are absolute and
 * already carry the /cyber prefix.
 *
 * Lenis, MotionConfig and ScrollManager are deliberately absent — the root App
 * owns them. Mounting a second Lenis instance here would leave two of them
 * fighting over the same scroll.
 */
export default function CyberApp() {
  return (
    <BrandTheme brand="cyber">
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about/experts" element={<Experts />} />
            <Route path="what-we-do" element={<WhatWeDo />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:pillar" element={<PillarPage />} />
            <Route path="services/:pillar/:slug" element={<ServiceDetail />} />
            <Route path="capabilities" element={<Capabilities />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<SolutionDetail />} />
            <Route path="insights" element={<Insights />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
    </BrandTheme>
  )
}
