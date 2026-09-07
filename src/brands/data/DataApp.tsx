import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BrandTheme } from '../../components/layout/BrandTheme';
import { Navbar } from '@data/components/layout/Navbar';
import { Footer } from '@data/components/layout/Footer';
import { ScrollProgress } from '@data/components/layout/ScrollProgress';
import { useSeo } from '@data/lib/seo';
import Home from '@data/pages/Home';

const About = lazy(() => import('@data/pages/About'));
const Services = lazy(() => import('@data/pages/Services'));
const ServiceDetail = lazy(() => import('@data/pages/ServiceDetail'));
const Blog = lazy(() => import('@data/pages/Blog'));
const BlogPost = lazy(() => import('@data/pages/BlogPost'));
const Work = lazy(() => import('@data/pages/Work'));
const WorkDetail = lazy(() => import('@data/pages/WorkDetail'));
const Contact = lazy(() => import('@data/pages/Contact'));
const NotFound = lazy(() => import('@data/pages/NotFound'));

function RouteFallback() {
  return (
    <div className="grid min-h-svh place-items-center" role="status" aria-live="polite">
      <span className="font-mono text-label uppercase tracking-[0.24em] text-mist">Loading…</span>
    </div>
  );
}

/**
 * Rothian Data, mounted at /data.
 *
 * The standalone site wrapped everything in its own <SmoothScroll> (a second
 * Lenis instance); that is gone, because the root App owns scrolling for the
 * whole of rothian.com. ScrollProgress and the page transitions stay — both
 * are part of this brand's design rather than site-wide chrome.
 *
 * useSeo keeps <head> in step during client-side navigation. Note that Data's
 * build-time prerender does not run in this app yet, so its routes currently
 * ship the shell's metadata to non-JS crawlers; see the merge notes.
 */
export default function DataApp() {
  const location = useLocation();

  useSeo();

  return (
    <BrandTheme brand="data">
      <ScrollProgress />
      <Navbar />

      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="" element={<Home />} />
            <Route path="about-us" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="portfolio" element={<Work />} />
            <Route path="portfolio/:slug" element={<WorkDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Footer />
    </BrandTheme>
  );
}
