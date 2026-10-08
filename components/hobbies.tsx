'use client'

import { motion } from 'motion/react'
import { Dumbbell, Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, Stagger, staggerItem } from '@/components/reveal'
import { hobbies } from '@/data/portfolio'

// Simple, recognizable icons per hobby id.
const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  cricket: Sparkles,
  fitness: Dumbbell,
}

export function Hobbies() {
  return (
    <section id="hobbies" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="08"
          label="HOBBIES"
          title="Life beyond the terminal"
          description="Consistency, discipline, and a competitive edge — the habits I build outside of work shape how I work."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {hobbies.map((h, i) => {
            const Icon = iconFor[h.id] ?? Sparkles
            return (
              <Reveal key={h.id} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-cyan/25">
                  <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet/5 blur-3xl transition-opacity duration-500 group-hover:bg-cyan/10" />
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-elevated text-cyan">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-2xl font-medium text-foreground">{h.title}</h3>
                  </div>

                  <p className="relative mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                    {h.summary}
                  </p>

                  <Stagger className="relative mt-6 flex flex-wrap gap-2">
                    {h.themes.map((theme) => (
                      <motion.span
                        key={theme}
                        variants={staggerItem}
                        className="rounded-full border border-border bg-elevated px-3 py-1 text-xs text-muted-foreground"
                      >
                        {theme}
                      </motion.span>
                    ))}
                  </Stagger>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
