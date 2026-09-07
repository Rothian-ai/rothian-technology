import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Maximize2, Wand2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EASE } from '../lib/motion'
import { SHOWCASE, SHOWCASE_FILTERS, type ShowcaseAsset } from '../data/showcase'

/**
 * Plays automatically, click to open the lightbox.
 *
 * Playback is tied to viewport visibility rather than simply setting `autoplay`,
 * so off-screen cards are not decoding video in the background — with six clips
 * in the grid that matters on mid-range devices. Users who prefer reduced motion
 * get a still first frame instead.
 */
function AssetCard({ asset, onOpen }: { asset: ShowcaseAsset; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduced) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(video)

    // Browsers throttle background tabs; make sure we resume cleanly.
    const onVisibility = () => {
      if (document.hidden) video.pause()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE }}
      onClick={onOpen}
      className="group relative block overflow-hidden rounded-3xl bg-ink-800 text-left focus-brand"
      aria-label={`${asset.title} — open details`}
    >
      <video
        ref={videoRef}
        src={asset.video}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
        aria-hidden
      />

      {/* Expand, not play — the clip is already running */}
      <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="size-4" aria-hidden />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
          {asset.category}
        </span>
        <h3 className="font-display text-xl font-bold text-white">{asset.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/55">{asset.brief}</p>
      </div>
    </motion.button>
  )
}

function Lightbox({
  asset,
  onClose,
  onPrev,
  onNext,
}: {
  asset: ShowcaseAsset
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${asset.title} — creative showcase detail`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="grid max-h-full w-full max-w-5xl gap-8 overflow-y-auto rounded-3xl border border-white/10 bg-ink-900 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr]"
      >
        <video
          src={asset.video}
          autoPlay
          muted
          loop
          controls
          playsInline
          className="w-full rounded-2xl bg-ink-950"
        />

        <div className="flex flex-col">
          <span className="mb-3 inline-block w-fit rounded-full bg-festival-gradient px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
            {asset.category}
          </span>
          <h2 className="heading-section text-3xl text-white sm:text-4xl">{asset.title}</h2>

          <dl className="mt-7 flex flex-col gap-6">
            <div>
              <dt className="eyebrow mb-2 text-festival-yellow">The brief</dt>
              <dd className="leading-relaxed text-white/70">{asset.brief}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2 text-festival-rose">The result</dt>
              <dd className="leading-relaxed text-white/70">{asset.result}</dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm sm:grid-cols-2">
            <p className="flex items-start gap-2 text-white/55">
              <Wand2 className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
              {asset.tool}
            </p>
            <p className="flex items-start gap-2 text-white/55">
              <Clock className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
              <span>
                {asset.turnaround}
                <span className="block text-white/30 line-through">{asset.traditional}</span>
              </span>
            </p>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-8">
            <button
              onClick={onPrev}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-brand"
              aria-label="Previous asset"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              onClick={onNext}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-brand"
              aria-label="Next asset"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-brand"
            >
              <X className="size-4" aria-hidden />
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface ShowcaseGalleryProps {
  /** Limit the grid (used for the Home teaser). */
  limit?: number
  showFilters?: boolean
}

export function ShowcaseGallery({ limit, showFilters = true }: ShowcaseGalleryProps) {
  const [filter, setFilter] = useState<(typeof SHOWCASE_FILTERS)[number]>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = (
    filter === 'All' ? SHOWCASE : SHOWCASE.filter((a) => a.category === filter)
  ).slice(0, limit)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  )

  return (
    <>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter creative work">
          {SHOWCASE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-brand ${
                filter === f
                  ? 'bg-festival-gradient text-white shadow-lg shadow-brand-magenta/25'
                  : 'border border-white/15 text-white/60 hover:border-white/35 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} onOpen={() => setOpenIndex(i)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <Lightbox asset={visible[openIndex]} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  )
}
