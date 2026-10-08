'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, staggerContainer } from '@/components/reveal'
import { ProjectCard } from '@/components/project-card'
import { ProjectModal } from '@/components/project-modal'
import { projects, type Project, type ProjectCategory } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const filters: { id: ProjectCategory | 'all'; label: string; hint: string }[] = [
  { id: 'all', label: 'All', hint: 'Everything' },
  { id: 'academic', label: 'Academic', hint: 'Coursework & research' },
  { id: 'interest', label: 'Personal', hint: 'Built for curiosity' },
]

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="04"
          label="PROJECTS"
          title="Things I've built and explored"
          description="A living archive of flagship work, academic projects, and personal experiments. It grows as I do."
        />

        <Reveal className="mt-12">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const count =
                f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300',
                    filter === f.id
                      ? 'border-cyan/50 bg-cyan/10 text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground',
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      'font-mono text-[0.65rem]',
                      filter === f.id ? 'text-cyan' : 'text-subtle',
                    )}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.div
          key={filter}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
