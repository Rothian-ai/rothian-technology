import { useEffect, useRef } from 'react'

const COLOURS = ['#fbbf24', '#ee8722', '#f43f5e', '#a8187a', '#7c3aed', '#22d3ee']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  sprite: number
}

interface ColourBurstCanvasProps {
  className?: string
  /** Multiplies the particle budget. 1 = full hero density. */
  density?: number
  /** Emit on pointer move / click. Disable for decorative background use. */
  interactive?: boolean
}

/**
 * The signature "festival of colour" moment — a GPU-friendly 2D canvas of
 * drifting colour powder that bursts on load and reacts to the cursor.
 *
 * Performance notes:
 * - Particles are drawn from six pre-rendered radial-gradient sprites rather than
 *   building a gradient per particle per frame.
 * - The loop is suspended when the canvas leaves the viewport or the tab is hidden.
 * - Respects `prefers-reduced-motion` by painting a single static composition.
 */
export function ColourBurstCanvas({
  className = '',
  density = 1,
  interactive = true,
}: ColourBurstCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    // ── Pre-rendered sprites: one soft radial blob per brand colour ──
    const SPRITE_SIZE = 128
    const sprites = COLOURS.map((colour) => {
      const s = document.createElement('canvas')
      s.width = s.height = SPRITE_SIZE
      const sctx = s.getContext('2d')!
      const g = sctx.createRadialGradient(
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2,
        0,
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2,
      )
      g.addColorStop(0, colour)
      g.addColorStop(0.35, `${colour}b0`)
      g.addColorStop(1, `${colour}00`)
      sctx.fillStyle = g
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
      return s
    })

    const isSmall = window.innerWidth < 640
    const MAX = Math.floor((isSmall ? 260 : 620) * density)
    const particles: Particle[] = []

    const spawn = (x: number, y: number, power: number, spread = Math.PI * 2) => {
      if (particles.length >= MAX) return
      const angle = Math.random() * spread
      const speed = (0.25 + Math.random() * 1.5) * power
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.15,
        size: (isSmall ? 40 : 70) + Math.random() * (isSmall ? 70 : 150),
        // A small random head-start so particles are never all invisible on the
        // same frame (life 0 sits at the very bottom of the fade-in curve).
        life: Math.random() * 14,
        maxLife: 140 + Math.random() * 160,
        sprite: Math.floor(Math.random() * sprites.length),
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        const t = p.life / p.maxLife
        // Ease in quickly, fade out slowly.
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85
        ctx.globalAlpha = Math.max(0, alpha) * 0.5
        const s = p.size
        ctx.drawImage(sprites[p.sprite], p.x - s / 2, p.y - s / 2, s, s)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    // ── Reduced motion: one static painted composition, no loop, no listeners ──
    if (reduced) {
      for (let i = 0; i < Math.min(MAX, 90); i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          size: (isSmall ? 60 : 120) + Math.random() * 180,
          life: 30,
          maxLife: 140,
          sprite: Math.floor(Math.random() * sprites.length),
        })
      }
      paint()
      const ro = new ResizeObserver(() => {
        resize()
        paint()
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    // ── Opening bloom ──
    // Distributed across the frame rather than fired from a single point: with
    // additive blending, a single origin saturates to a white core.
    for (let i = 0; i < Math.min(MAX * 0.5, 200); i++) {
      spawn(
        width / 2 + (Math.random() - 0.5) * width * 0.7,
        height * 0.52 + (Math.random() - 0.5) * height * 0.6,
        1.5,
      )
    }
    // Paint the first frame synchronously so the canvas is never briefly blank
    // while we wait for the first animation frame.
    paint()

    let raf = 0
    let running = true
    let frame = 0
    const pointer = { x: width / 2, y: height / 2, active: false }

    const tick = () => {
      frame++
      // Gentle ambient emission so the field never fully empties.
      if (frame % 3 === 0) {
        spawn(
          width * (0.15 + Math.random() * 0.7),
          height * (0.3 + Math.random() * 0.6),
          0.7,
        )
      }
      if (pointer.active && frame % 2 === 0) spawn(pointer.x, pointer.y, 1.1)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.985
        p.vy = p.vy * 0.985 - 0.006 // slow upward float, like powder in air
      }

      paint()
      if (running) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      for (let i = 0; i < 70; i++) spawn(x, y, 2.8)
    }

    const parent = canvas.parentElement
    if (interactive && parent) {
      parent.addEventListener('pointermove', onPointerMove)
      parent.addEventListener('pointerleave', onPointerLeave)
      parent.addEventListener('pointerdown', onPointerDown)
    }

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) start()
      else stop()
    })
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (interactive && parent) {
        parent.removeEventListener('pointermove', onPointerMove)
        parent.removeEventListener('pointerleave', onPointerLeave)
        parent.removeEventListener('pointerdown', onPointerDown)
      }
    }
  }, [density, interactive])

  return <canvas ref={canvasRef} aria-hidden className={`size-full ${className}`} />
}
