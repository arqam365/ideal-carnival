'use client'

import { useEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/section-primitives'

type Stat = {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 240, suffix: '+', label: 'Organizations Trained' },
  { value: 18500, suffix: '+', label: 'Professionals Developed' },
  { value: 96000, suffix: '+', label: 'Training Hours Delivered' },
  { value: 10, suffix: '', label: 'Industries Served' },
  { value: 24, suffix: '', label: 'Countries Connected' },
]

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return value
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const value = useCountUp(stat.value, run)
  return (
    <div className="flex flex-col gap-3 border-l border-gold/25 pl-6">
      <span className="font-heading text-4xl font-medium text-primary-foreground lg:text-5xl">
        {value.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="text-[0.74rem] uppercase tracking-luxury text-primary-foreground/60">
        {stat.label}
      </span>
    </div>
  )
}

export function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-primary py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow light>EHP Impact</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-medium text-primary-foreground sm:text-4xl">
            Measured excellence, national scale
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  )
}
