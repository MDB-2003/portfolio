'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { AnimatedDataBackground } from '@/components/animated-data-background'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { personal, socialLinks } from '@/data/portfolio'

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  linkedin: LinkedinIcon,
  github: GithubIcon,
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 -z-10">
        <AnimatedDataBackground className="absolute inset-0 h-full w-full opacity-40" />
        <div className="grid-fade absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/8 blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            LET&apos;S CONNECT
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s build something{' '}
            <span className="text-cyan text-glow-cyan">intelligent</span> together
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I&apos;m always open to conversations about data, machine learning, and new
            opportunities. Reach out through any of the channels below.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconFor[link.id] ?? Mail
              const available = Boolean(link.href)
              const content = (
                <>
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {available ? (
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  ) : (
                    <span className="font-mono text-[0.6rem] text-subtle">SOON</span>
                  )}
                </>
              )
              const cls =
                'group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-all duration-300'

              return available ? (
                <motion.a
                  key={link.id}
                  href={link.href as string}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`${cls} border-border bg-card text-foreground hover:border-cyan/40`}
                >
                  {content}
                </motion.a>
              ) : (
                <span
                  key={link.id}
                  className={`${cls} cursor-default border-dashed border-border/70 bg-card/40 text-muted-foreground`}
                  title={`${link.label} — ${link.handle ?? 'coming soon'}`}
                >
                  {content}
                </span>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-12 font-mono text-xs tracking-[0.3em] text-subtle">{personal.motto}</p>
        </Reveal>
      </div>
    </section>
  )
}
