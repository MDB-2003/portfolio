'use client'

import { useState } from 'react'
import { Download, FileText, Check } from 'lucide-react'
import { resume } from '@/data/portfolio'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed'

const styles: Record<Variant, string> = {
  primary:
    'bg-cyan text-primary-foreground hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)] hover:-translate-y-0.5',
  secondary:
    'border border-border bg-elevated/40 text-foreground hover:border-cyan/40 hover:bg-elevated hover:-translate-y-0.5',
  ghost: 'text-muted-foreground hover:text-foreground',
}

/**
 * Renders a resume action. When the PDF is not yet available
 * (`resume.available === false`), it degrades to a clearly-labeled,
 * non-navigating state instead of producing a broken link.
 */
export function ResumeButton({
  mode = 'view',
  variant = 'secondary',
  className,
}: {
  mode?: 'view' | 'download'
  variant?: Variant
  className?: string
}) {
  const [notice, setNotice] = useState(false)
  const Icon = mode === 'download' ? Download : FileText
  const label = mode === 'download' ? 'Download Resume' : 'View Resume'

  if (resume.available) {
    return (
      <a
        href={resume.path}
        target="_blank"
        rel="noopener noreferrer"
        download={mode === 'download' ? true : undefined}
        className={cn(base, styles[variant], className)}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-label={`${label} — coming soon`}
      onClick={() => {
        setNotice(true)
        window.setTimeout(() => setNotice(false), 2200)
      }}
      className={cn(base, styles[variant], 'opacity-90', className)}
    >
      {notice ? <Check className="h-4 w-4 text-cyan" /> : <Icon className="h-4 w-4" />}
      {notice ? 'Coming soon' : label}
    </button>
  )
}
