'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navigation, personal } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const allSectionIds = [
  ...navigation.primary.map((n) => n.id),
  ...navigation.more.map((n) => n.id),
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function Navbar() {
  const [active, setActive] = useState<string>('hero')
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    allSectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const go = useCallback((id: string) => {
    scrollToSection(id)
    setMoreOpen(false)
    setMobileOpen(false)
  }, [])

  const isActive = (id: string) => active === id

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <nav
          aria-label="Primary"
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-full border border-border px-2 py-2 pl-4 transition-all duration-500',
            scrolled
              ? 'bg-background/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl'
              : 'bg-background/30 backdrop-blur-md',
          )}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 rounded-full px-1 text-sm font-semibold tracking-tight"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/5 font-mono text-xs text-cyan transition-colors group-hover:bg-cyan/10">
              {personal.monogram}
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.primary.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  isActive(item.id)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive(item.id) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan/20 bg-cyan/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}

            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={cn(
                  'flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  moreOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                More
                <ChevronDown
                  className={cn('h-3.5 w-3.5 transition-transform', moreOpen && 'rotate-180')}
                />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
                  >
                    {navigation.more.map((item) => (
                      <button
                        key={item.id}
                        role="menuitem"
                        onClick={() => go(item.id)}
                        className={cn(
                          'flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors',
                          isActive(item.id)
                            ? 'bg-cyan/10 text-foreground'
                            : 'text-muted-foreground hover:bg-elevated hover:text-foreground',
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/5 font-mono text-xs text-cyan">
                  {personal.monogram}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
                {navigation.primary.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={cn(
                      'rounded-xl px-4 py-3.5 text-left text-lg transition-colors',
                      isActive(item.id)
                        ? 'bg-cyan/10 text-foreground'
                        : 'text-muted-foreground hover:bg-elevated',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="my-3 h-px bg-border" />
                <p className="px-4 pb-1 font-mono text-xs tracking-[0.2em] text-subtle">MORE</p>
                {navigation.more.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-left text-base transition-colors',
                      isActive(item.id)
                        ? 'bg-cyan/10 text-foreground'
                        : 'text-muted-foreground hover:bg-elevated',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
