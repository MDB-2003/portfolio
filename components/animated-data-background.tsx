'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * Subtle data-network visualization: slow-drifting glowing nodes with
 * proximity-based connecting lines. GPU-light (single 2D canvas), pauses when
 * offscreen, respects prefers-reduced-motion, and thins out on small screens.
 */
export function AnimatedDataBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let raf = 0
    let running = true
    const mouse = { x: -9999, y: -9999 }

    const CONNECT_DIST = mobile ? 110 : 150

    function makeNodes() {
      const area = width * height
      const density = mobile ? 26000 : 18000
      const count = Math.min(mobile ? 34 : 80, Math.floor(area / density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    function resize() {
      const parent = canvas!.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeNodes()
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // gentle mouse attraction
        const dxm = mouse.x - n.x
        const dym = mouse.y - n.y
        const dm = Math.hypot(dxm, dym)
        if (dm < 140) {
          n.x += dxm * 0.0016
          n.y += dym * 0.0016
        }
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.16
            ctx!.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx!.lineWidth = 0.6
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 140
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fillStyle = near ? 'rgba(139, 92, 246, 0.9)' : 'rgba(34, 211, 238, 0.55)'
        ctx!.fill()
      }

      if (running) raf = requestAnimationFrame(draw)
    }

    function renderStatic() {
      // one frame only for reduced motion
      draw()
      running = false
      cancelAnimationFrame(raf)
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()

    if (reduce) {
      renderStatic()
    } else {
      raf = requestAnimationFrame(draw)
      if (!mobile) {
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
      }
    }

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduce) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block' }}
    />
  )
}
