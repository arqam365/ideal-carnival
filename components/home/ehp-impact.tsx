'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '@/components/section-primitives'

type Stat = {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: Stat[] = [
  {
    value: 200,
    suffix: '+',
    label: 'Organisations Trained',
    description:
      'Ministries, commands, hotels, airports, and enterprises across the Kingdom.',
  },
  {
    value: 12000,
    suffix: '+',
    label: 'Professionals Developed',
    description:
      'From front-line staff to C-suite executives and senior government officials.',
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Training Hours Delivered',
    description: 'Structured, rigorous, and tailored to each institution.',
  },
  {
    value: 14,
    suffix: '',
    label: 'Industries Served',
    description:
      'Spanning government, defense, hospitality, aviation, health, and beyond.',
  },
  {
    value: 18,
    suffix: '',
    label: 'Countries Connected',
    description:
      'International partnerships and cross-border protocol engagements.',
  },
]

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active)
  return (
    <div className="reveal flex flex-col gap-4 border-b border-gold/15 pb-8 last:border-0 last:pb-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8 last:lg:border-r-0 last:lg:pr-0">
      <span className="font-heading text-5xl font-medium text-primary-foreground lg:text-6xl">
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
          {stat.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">
          {stat.description}
        </p>
      </div>
    </div>
  )
}

export function EhpImpact() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mb-16">
          <SectionHeading
            light
            eyebrow="Measured Impact"
            title="EHP by the numbers"
            intro="A decade of institutional development across the Kingdom and beyond — measured in outcomes, not enrolments."
          />
        </div>
        <div ref={ref} className="grid gap-8 lg:grid-cols-5">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
