import { Suspense, lazy, useEffect } from 'react'
import { BrandTheme } from '../../components/layout/BrandTheme'
import { SiteHeader } from '@ui4ai/components/chrome/SiteHeader'
import { SiteFooter } from '@ui4ai/components/chrome/SiteFooter'
import { AgentRail } from '@ui4ai/components/chrome/AgentRail'
import { SceneProvider } from '@ui4ai/components/scene/SceneProvider'
import { Hero } from '@ui4ai/components/sections/Hero'
import { Premise } from '@ui4ai/components/sections/Premise'
import { AgentChapter } from '@ui4ai/components/sections/AgentChapter'
import { AgentTransition } from '@ui4ai/components/sections/AgentTransition'
import { Inspiration } from '@ui4ai/components/sections/Inspiration'
import { Together } from '@ui4ai/components/sections/Together'
import { Diagnostic } from '@ui4ai/components/sections/Diagnostic'
import { FinalSelection } from '@ui4ai/components/sections/FinalSelection'
import { AGENT_MAP } from '@ui4ai/lib/agents'

/**
 * The demonstrations are the heaviest interactive pieces on the page and none
 * of them is above the fold, so each is code-split and mounted on approach.
 * (React.lazy here, where the standalone site used next/dynamic.)
 */
const AmeliaDemo = lazy(() =>
  import('@ui4ai/components/demos/AmeliaDemo').then((m) => ({ default: m.AmeliaDemo })),
)
const AlbertDemo = lazy(() =>
  import('@ui4ai/components/demos/AlbertDemo').then((m) => ({ default: m.AlbertDemo })),
)
const IsaacDemo = lazy(() =>
  import('@ui4ai/components/demos/IsaacDemo').then((m) => ({ default: m.IsaacDemo })),
)
const MarieDemo = lazy(() =>
  import('@ui4ai/components/demos/MarieDemo').then((m) => ({ default: m.MarieDemo })),
)

const TITLE = 'Rothian App — Four specialists. One intelligence ecosystem.'
const DESCRIPTION =
  'Amelia, Albert, Isaac and Marie: four specialized AI agents built for property intelligence, product architecture, social growth and talent — designed around the way each kind of work actually behaves.'

/**
 * Rothian App (UI4AI), mounted at /ui4ai.
 *
 * The standalone site was a Next.js app whose root layout owned the document —
 * fonts, metadata and a <SmoothScroll>. Here the shell belongs to rothian.com:
 * the fonts load from index.html, the metadata is set below, and scrolling is
 * the root App's single Lenis instance rather than a second one.
 *
 * `grain` sits on the wrapper because it was a body class on the original site;
 * its fixed ::before overlay covers the viewport either way.
 */
export default function Ui4aiApp() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = TITLE

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    if (meta) meta.content = DESCRIPTION

    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [])

  return (
    <BrandTheme brand="ui4ai">
      <div className="grain">
        <SceneProvider>
          <SiteHeader />
          <AgentRail />
          <main id="main-content" className="relative z-10">
            <Hero />
            <Premise />

            <div id="agents" className="scroll-mt-[var(--nav-h)]">
              <Suspense fallback={null}>
                <AgentChapter agent={AGENT_MAP.amelia} index={1} demo={<AmeliaDemo />} />
                <AgentTransition from="amelia" to="albert" />

                <AgentChapter agent={AGENT_MAP.albert} index={2} demo={<AlbertDemo />} flip />
                <AgentTransition from="albert" to="isaac" />

                <AgentChapter agent={AGENT_MAP.isaac} index={3} demo={<IsaacDemo />} />
                <AgentTransition from="isaac" to="marie" />

                <AgentChapter agent={AGENT_MAP.marie} index={4} demo={<MarieDemo />} flip />
              </Suspense>
            </div>

            <Inspiration />
            <Together />
            <Diagnostic />
            <FinalSelection />
          </main>
          <SiteFooter />
        </SceneProvider>
      </div>
    </BrandTheme>
  )
}
