'use client'

import { motion } from 'motion/react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, Stagger, staggerItem } from '@/components/reveal'
import { personal } from '@/data/portfolio'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="01"
          label="ABOUT"
          title={personal.about.heading}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            {personal.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="mt-2">
                <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle">FOCUS AREAS</p>
                <Stagger className="flex flex-wrap gap-2">
                  {personal.about.interests.map((interest) => (
                    <motion.span
                      key={interest}
                      variants={staggerItem}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </Stagger>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-2">
                <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle">INTERESTED ROLES</p>
                <Stagger className="flex flex-wrap gap-2">
                  {personal.about.roles.map((role) => (
                    <motion.span
                      key={role}
                      variants={staggerItem}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground"
                    >
                      {role}
                    </motion.span>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
