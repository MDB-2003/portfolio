'use client'

import { useEffect, useRef } from 'react'

/**
 * Soft cyan glow that trails the pointer. Desktop (fine pointer) only, skipped
 * for reduced motion, and moved with transforms so it never triggers layout.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const target = { x: -9999, y: -9999 }
    const pos = { x: -9999, y: -9999 }
    let raf = 0

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }

    const onMove = (e: PointerEvent) => {
      if (target.x === -9999) {
        pos.x = e.clientX
        pos.y = e.clientY
      }
      target.x = e.clientX
      target.y = e.clientY
      el.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="fx-spotlight" />
}
