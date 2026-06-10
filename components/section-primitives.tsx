import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: ReactNode
  className?: string
  light?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-luxury',
        light ? 'text-gold' : 'text-gold',
        className,
      )}
    >
      <span
        className={cn(
          'h-px w-8',
          light ? 'bg-gold/60' : 'bg-gold/60',
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          'mt-5 text-pretty font-heading text-3xl font-medium leading-[1.12] sm:text-4xl lg:text-[2.75rem]',
          light ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            'mt-5 text-pretty text-base leading-relaxed sm:text-lg',
            light ? 'text-primary-foreground/70' : 'text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string
  title: ReactNode
  intro: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary pt-20">
      <img
        src={image || '/placeholder.svg'}
        alt={imageAlt}
        className="absolute inset-0 -z-10 size-full object-cover opacity-30"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/85 via-primary/80 to-primary"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-3xl reveal">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance font-heading text-4xl font-medium leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
            {intro}
          </p>
        </div>
      </div>
    </section>
  )
}
