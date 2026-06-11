'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Eyebrow } from '@/components/section-primitives'

type StatData = { value: string; label: string }

function parseStatValue(valueStr: string): { number: number; prefix: string; suffix: string } {
  const clean = valueStr.replace(/,/g, '').replace(/\s/g, '')
  const match = clean.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/)
  if (!match) return { number: 0, prefix: '', suffix: '' }
  return { number: parseInt(match[2], 10), prefix: match[1], suffix: match[3] }
}

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return value
}

function StatItem({ stat, run }: { stat: StatData; run: boolean }) {
  const { number, prefix, suffix } = parseStatValue(stat.value)
  const animatedValue = useCountUp(number, run)
  return (
    <div className="flex flex-col gap-3 border-s border-gold/25 ps-6">
      <span className="font-heading text-4xl font-medium text-primary-foreground lg:text-5xl">
        {prefix}{animatedValue.toLocaleString()}{suffix}
      </span>
      <span className="text-[0.74rem] uppercase tracking-luxury text-primary-foreground/60">
        {stat.label}
      </span>
    </div>
  )
}

export function ImpactStats() {
  const t = useTranslations('home.impact')
  const stats = t.raw('stats') as StatData[]

  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRun(true); observer.disconnect() } },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-primary py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow light>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-medium text-primary-foreground sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  )
}
