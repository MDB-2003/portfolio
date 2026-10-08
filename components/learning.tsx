'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { currentlyLearning } from '@/data/portfolio'

export function Learning() {
  const reduce = useReducedMotion()
  const row = [...currentlyLearning, ...currentlyLearning]

  return (
    <section id="learning" className="relative scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="05"
          label="CURRENTLY LEARNING"
          title="Always leveling up"
          description="Learning never stops. These are the areas I'm actively deepening right now."
        />
      </div>

      <div className="relative mt-14">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

        <motion.div
          className="flex w-max gap-3"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((topic, i) => (
            <span
              key={`${topic}-${i}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan" />
              {topic}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
