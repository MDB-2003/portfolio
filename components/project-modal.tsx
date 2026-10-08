'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { GithubIcon } from '@/components/brand-icons'

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-xs tracking-[0.2em] text-cyan">{label}</p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card sm:rounded-3xl"
          >
            {/* header */}
            <div className="relative overflow-hidden border-b border-border p-6 sm:p-8">
              <div className="grid-fade absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan/10 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-subtle">
                    {project.category === 'main'
                      ? 'FLAGSHIP PROJECT'
                      : project.category === 'academic'
                        ? 'ACADEMIC PROJECT'
                        : 'PERSONAL PROJECT'}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium text-foreground text-balance">
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {project.technologies.length > 0 && (
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-elevated px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* body */}
            <div className="flex flex-col gap-6 overflow-y-auto p-6 sm:p-8">
              <p className="text-base leading-relaxed text-foreground">{project.description}</p>

              {project.problem && <DetailBlock label="PROBLEM">{project.problem}</DetailBlock>}
              {project.approach && <DetailBlock label="APPROACH">{project.approach}</DetailBlock>}
              {project.features && project.features.length > 0 && (
                <DetailBlock label="KEY FEATURES">
                  <ul className="flex flex-col gap-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}
              {project.results && <DetailBlock label="RESULTS">{project.results}</DetailBlock>}
              {project.lessonsLearned && (
                <DetailBlock label="LESSONS LEARNED">{project.lessonsLearned}</DetailBlock>
              )}

              {(project.github || project.demo) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-elevated px-4 py-2 text-sm text-foreground transition-colors hover:border-cyan/40"
                    >
                      <GithubIcon className="h-4 w-4" /> View Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
