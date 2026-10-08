import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  index: string
  label: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground">
          <span className="text-cyan">{index}</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-xl text-pretty leading-relaxed text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
