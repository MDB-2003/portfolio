'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Thin gradient bar pinned to the top edge that tracks page scroll. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-cyan via-cyan to-violet shadow-[0_0_12px_rgba(34,211,238,0.6)]"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
