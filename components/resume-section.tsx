'use client'

import { FileText } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/reveal'
import { ResumeButton } from '@/components/resume-button'
import { resume } from '@/data/portfolio'

export function ResumeSection() {
  return (
    <section id="resume" className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader index="09" label="RESUME" title="The full story, on one page" />

        <Reveal className="mt-12">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-border bg-elevated text-cyan">
                <FileText className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-medium text-foreground">Download my resume</h3>
                <p className="mt-1 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                  {resume.available
                    ? 'A concise summary of my education, skills, and projects — ready to download.'
                    : 'My resume is being finalized and will be available here shortly.'}
                </p>
              </div>
            </div>
            <div className="relative flex flex-wrap gap-3">
              <ResumeButton mode="view" variant="secondary" />
              <ResumeButton mode="download" variant="primary" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
