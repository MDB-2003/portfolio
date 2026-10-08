'use client'

import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { education } from '@/data/portfolio'
import { MapPin } from 'lucide-react'

function formatRange(start: string | null, end: string | null, current?: boolean) {
  if (!start && !end) return current ? 'In progress' : null
  return `${start ?? '—'} — ${current ? 'Present' : end ?? '—'}`
}

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          label="EDUCATION"
          title="Academic foundation"
          description="The formal training behind the work — from computer science fundamentals to advanced engineering data science."
        />

        <div className="relative mt-16 pl-8 sm:pl-12">
          {/* timeline spine */}
          <span
            className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan/50 via-border to-transparent sm:left-4"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {education.map((edu, i) => {
              const range = formatRange(edu.start, edu.end, edu.current)
              return (
                <Reveal key={edu.id} delay={i * 0.1}>
                  <div className="relative">
                    {/* node */}
                    <span
                      className="absolute -left-[1.6rem] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[2.1rem]"
                      aria-hidden="true"
                    >
                      <span className="h-3 w-3 rounded-full border-2 border-cyan bg-background shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]" />
                    </span>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-medium text-foreground sm:text-2xl">
                          {edu.institution}
                        </h3>
                        {edu.current && (
                          <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-cyan">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <p className="text-base text-muted-foreground">
                        {edu.degree} in{' '}
                        <span className="text-foreground">{edu.field}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-subtle">
                        {range && <span>{range}</span>}
                        {edu.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </span>
                        )}
                        {edu.gpa && <span>GPA {edu.gpa}</span>}
                      </div>

                      {edu.coursework && edu.coursework.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {edu.coursework.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
