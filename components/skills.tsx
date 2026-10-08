'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, Stagger, staggerItem } from '@/components/reveal'
import { skills, skillNotes } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function Skills() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [note, setNote] = useState<string | null>(null)

  const categories = [{ id: 'all', label: 'All' }, ...skills.map((s) => ({ id: s.id, label: s.label }))]
  const visible = activeCat === 'all' ? skills : skills.filter((s) => s.id === activeCat)

  return (
    <section id="skills" className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="03"
          label="SKILLS"
          title="A broad, growing technical toolkit"
          description="Spanning data science, machine learning, generative AI, MLOps, data engineering, and the cloud — organized by domain."
        />

        {/* Category filter */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300',
                  activeCat === c.id
                    ? 'border-cyan/50 bg-cyan/10 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Hover note bar */}
        <div className="mt-6 h-6">
          <motion.p
            key={note ?? 'empty'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: note ? 1 : 0, y: 0 }}
            className="font-mono text-xs text-cyan"
          >
            {note}
          </motion.p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan/25">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-medium text-foreground">{cat.label}</h3>
                  <span className="font-mono text-[0.65rem] text-subtle">
                    {String(cat.skills.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <Stagger className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => {
                    const hasNote = Boolean(skillNotes[skill])
                    return (
                      <motion.span
                        key={skill}
                        variants={staggerItem}
                        onMouseEnter={() => hasNote && setNote(`${skill} — ${skillNotes[skill]}`)}
                        onMouseLeave={() => hasNote && setNote(null)}
                        className={cn(
                          'rounded-lg border border-transparent bg-elevated px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground',
                          hasNote && 'cursor-default hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan',
                        )}
                      >
                        {skill}
                      </motion.span>
                    )
                  })}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
