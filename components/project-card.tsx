'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { GithubIcon } from '@/components/brand-icons'
import { staggerItem } from '@/components/reveal'
import { cn } from '@/lib/utils'

function hasDetail(p: Project) {
  return Boolean(
    p.problem || p.approach || (p.features && p.features.length) || p.results || p.lessonsLearned,
  )
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const detail = hasDetail(project)
  const interactive = detail || project.github || project.demo

  if (project.placeholder) {
    return (
      <motion.div
        variants={staggerItem}
        className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border/70 bg-card/40 p-6"
      >
        <div className="grid-fade absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-subtle">
          <Clock className="h-3.5 w-3.5" />
          IN THE PIPELINE
        </div>
        <div className="relative">
          <h3 className="text-lg font-medium text-muted-foreground">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-subtle">{project.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.button
      variants={staggerItem}
      onClick={() => interactive && onOpen(project)}
      className={cn(
        'group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300',
        interactive && 'hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_16px_50px_-24px_rgba(34,211,238,0.5)]',
      )}
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-elevated px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        {interactive && (
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>

      <div className="relative mt-6">
        <h3 className="text-lg font-medium text-foreground text-balance">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-3 font-mono text-[0.65rem] tracking-wide text-subtle">
          {detail && <span className="text-cyan/80">VIEW DETAILS</span>}
          {project.github && (
            <span className="flex items-center gap-1">
              <GithubIcon className="h-3 w-3" /> CODE
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
