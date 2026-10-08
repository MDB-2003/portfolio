'use client'

import { Trophy, Medal } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/reveal'
import { achievements } from '@/data/portfolio'

export function Achievements() {
  if (achievements.length === 0) return null

  return (
    <section id="achievements" className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="07"
          label="ACHIEVEMENTS"
          title="Wins worth remembering"
          description="The same discipline I bring to engineering shows up on the field."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan/5 blur-2xl" />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-elevated text-cyan">
                    <Trophy className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-medium text-foreground">{a.title}</h3>
                </div>
                <ul className="relative mt-6 flex flex-col gap-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-muted-foreground">
                      <Medal className="h-4 w-4 flex-none text-violet" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
