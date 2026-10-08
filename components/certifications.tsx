'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Award, BadgeCheck, ChevronDown, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/reveal'
import { certifications, type Certification } from '@/data/portfolio'
import { cn } from '@/lib/utils'

/** Number of certifications shown before the "More" button. */
const FEATURED_COUNT = 6

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan/30">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-elevated text-cyan">
          <BadgeCheck className="h-5 w-5" />
        </span>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle transition-colors hover:text-cyan"
            aria-label={`View ${cert.name} credential`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      <h3 className="mt-4 text-base font-medium text-foreground">{cert.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{cert.organization}</p>
      {cert.date && <p className="mt-3 font-mono text-xs text-subtle">{cert.date}</p>}
    </div>
  )
}

export function Certifications() {
  const hasCerts = certifications.length > 0
  const [expanded, setExpanded] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const featured = certifications.slice(0, FEATURED_COUNT)
  const remaining = certifications.slice(FEATURED_COUNT)

  const toggle = () => {
    setExpanded((v) => {
      if (v) {
        // keep the button in view once the extra cards collapse
        requestAnimationFrame(() =>
          buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        )
      }
      return !v
    })
  }

  return (
    <section id="certifications" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="06"
          label="CERTIFICATIONS"
          title="Verified credentials"
          description="Professional certifications and completed programs."
        />

        {hasCerts ? (
          <>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((cert, i) => (
                <Reveal key={`${cert.name}-${i}`} delay={(i % 3) * 0.06}>
                  <CertCard cert={cert} />
                </Reveal>
              ))}

              <AnimatePresence initial={false}>
                {expanded &&
                  remaining.map((cert, i) => (
                    <motion.div
                      key={`${cert.name}-more`}
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <CertCard cert={cert} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {remaining.length > 0 && (
              <Reveal className="mt-10 flex justify-center">
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={toggle}
                  aria-expanded={expanded}
                  className="cert-more-btn group inline-flex items-center justify-center gap-2 rounded-full bg-elevated/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(34,211,238,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="relative z-10">{expanded ? 'Show Less' : 'More'}</span>
                  {!expanded && (
                    <span className="relative z-10 font-mono text-[0.65rem] text-cyan">
                      +{String(remaining.length).padStart(2, '0')}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      'relative z-10 h-4 w-4 text-cyan transition-transform duration-300',
                      expanded && 'rotate-180',
                    )}
                  />
                </button>
              </Reveal>
            )}
          </>
        ) : (
          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
              <div className="grid-fade absolute inset-0 opacity-25" aria-hidden="true" />
              <div className="relative flex flex-col items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-elevated text-cyan">
                  <Award className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-medium text-foreground">Coming soon</h3>
                <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                  Certifications are on the way. As I complete new programs and credentials,
                  they&apos;ll be showcased right here.
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
