'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Hammer, GraduationCap, TrendingUp, RotateCw } from 'lucide-react'

const steps = [
  { label: 'Build', icon: Hammer },
  { label: 'Learn', icon: GraduationCap },
  { label: 'Improve', icon: TrendingUp },
  { label: 'Repeat', icon: RotateCw },
]

export function Philosophy() {
  const reduce = useReducedMotion()
  return (
    <section aria-label="Personal philosophy" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="grid-fade absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[120px]" />
      </div>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6"
        >
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.span
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.12, ease: 'easeOut' }}
                className="flex items-center gap-3 text-2xl font-medium tracking-tight sm:text-4xl"
              >
                <Icon className="h-5 w-5 text-cyan sm:h-7 sm:w-7" aria-hidden="true" />
                <span className={i === 3 ? 'text-muted-foreground' : 'text-foreground'}>
                  {s.label}
                  <span className="text-subtle">.</span>
                </span>
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
