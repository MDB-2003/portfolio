'use client'

import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react'

const STORAGE_KEY = 'fx-intro-seen'
const MIN_MS = 1100
const MAX_MS = 2600
const EASE = [0.76, 0, 0.24, 1] as const

/**
 * Full-screen intro shown once per session. When it lifts, the page subtree is
 * remounted so the hero's own entrance animation plays as it is revealed.
 */
export function IntroLoader({ children, monogram }: { children: ReactNode; monogram: string }) {
  const [show, setShow] = useState(true)
  const [pageKey, setPageKey] = useState(0)
  const progress = useMotionValue(0)
  const scaleX = useTransform(progress, (v) => v / 100)
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'))

  useEffect(() => {
    const root = document.documentElement
    if (root.hasAttribute('data-intro-seen')) {
      setShow(false)
      return
    }

    root.style.overflow = 'hidden'
    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    window.addEventListener('load', onLoad)

    const start = performance.now()
    let value = 0
    let raf = 0

    const tick = (now: number) => {
      const t = now - start
      const ready = (loaded && t >= MIN_MS) || t >= MAX_MS
      const target = ready ? 100 : Math.min(90, (t / MIN_MS) * 90)
      value += (target - value) * (ready ? 0.2 : 0.08)
      if (ready && value > 99.5) value = 100
      progress.set(value)

      if (value >= 100) {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1')
        } catch {}
        setPageKey(1)
        setShow(false)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
      root.style.overflow = ''
    }
  }, [progress])

  return (
    <>
      <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = '')}>
        {show && (
          <motion.div
            key="fx-intro"
            aria-hidden="true"
            className="fx-intro fixed inset-0 z-[100] items-center justify-center bg-background"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <div className="grid-fade absolute inset-0 opacity-40" />
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px]" />

            <motion.div
              className="relative flex flex-col items-center gap-6"
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeIn' }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fx-intro-mark flex h-14 w-14 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/5 font-mono text-sm text-cyan"
              >
                {monogram}
              </motion.span>

              <div className="h-px w-48 overflow-hidden bg-border">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-cyan to-violet"
                  style={{ scaleX }}
                />
              </div>

              <motion.span className="font-mono text-xs tracking-[0.3em] text-subtle tabular-nums">
                {counter}
              </motion.span>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <Fragment key={pageKey}>{children}</Fragment>
    </>
  )
}
