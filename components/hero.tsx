'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { AnimatedDataBackground } from '@/components/animated-data-background'
import { ResumeButton } from '@/components/resume-button'
import { personal } from '@/data/portfolio'

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const nameLines = personal.name.split(' ')

export function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-start overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <AnimatedDataBackground className="absolute inset-0 h-full w-full opacity-70" />
        <div className="grid-fade absolute inset-0 opacity-40" />
        {/* soft radial glows */}
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-violet/10 blur-[120px]" />
        {/* bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:gap-3">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
                {personal.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="flex flex-col text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            >
              {nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl font-light text-muted-foreground sm:text-2xl"
            >
              <span className="text-foreground">Aspiring </span>
              <span className="text-cyan text-glow-cyan">Data Engineer</span>
              {/* <span className="text-foreground"> &amp; </span>
              <span className="text-violet"> </span> */}
            </motion.p>

            <motion.p
              variants={item}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {personal.statement}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => goTo('projects')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(34,211,238,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <ResumeButton mode="view" variant="secondary" />
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3 pt-2 font-mono text-xs tracking-[0.3em] text-subtle">
              {['BUILD', 'MAKE MISTAKES', 'LEARN', 'IMPROVE'].map((w, i) => (
                <span key={w} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-subtle" aria-hidden="true" />}
                  <span>{w}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative h-[26rem] w-[19rem] shrink-0 overflow-hidden rounded-[30px] sm:h-[30rem] sm:w-[22rem] lg:h-[39.8rem] lg:w-[29rem]"
          >
            <Image
              src={personal.photo}
              alt={`${personal.name} portrait`}
              fill
              priority
              sizes="(min-width: 1024px) 464px, (min-width: 640px) 352px, 304px"
              className="object-cover object-[center_14%]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => goTo('about')}
        aria-label="Scroll to explore"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-muted-foreground sm:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em]">SCROLL TO EXPLORE</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </button>
    </section>
  )
}
