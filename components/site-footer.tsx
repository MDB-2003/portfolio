'use client'

import { ArrowUp } from 'lucide-react'
import { navigation, personal } from '@/data/portfolio'

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function SiteFooter() {
  const links = [...navigation.primary, ...navigation.more]

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/5 font-mono text-xs text-cyan">
                {personal.monogram}
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {personal.name}
              </span>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {personal.role}. {personal.motto}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-cyan"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-subtle">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
