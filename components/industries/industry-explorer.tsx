'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export type IndustryDetail = {
  id: string
  label: string
  challenge: string
  solution: string
  outcome: string
}

export function IndustryExplorer({
  industries,
}: {
  industries: IndustryDetail[]
}) {
  const [active, setActive] = useState(0)
  const current = industries[active]

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Selector */}
      <div className="lg:col-span-4">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
          {industries.map((industry, i) => (
            <li key={industry.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setActive(i)}
                id={industry.id}
                className={cn(
                  'flex w-full items-center justify-between gap-4 scroll-mt-24 border-b border-border px-4 py-4 text-left font-heading text-xl transition-colors lg:px-0',
                  active === i
                    ? 'text-gold'
                    : 'text-primary/60 hover:text-primary',
                )}
              >
                {industry.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Detail */}
      <div className="lg:col-span-8">
        <div className="border border-border bg-card p-8 lg:p-12">
          <h3 className="font-heading text-3xl font-medium text-primary">
            {current.label}
          </h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <Block label="Challenge" body={current.challenge} />
            <Block label="Our Approach" body={current.solution} />
            <Block label="Outcome" body={current.outcome} accent />
          </div>
        </div>
      </div>
    </div>
  )
}

function Block({
  label,
  body,
  accent = false,
}: {
  label: string
  body: string
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'border-t-2 pt-5',
        accent ? 'border-gold' : 'border-sand',
      )}
    >
      <p
        className={cn(
          'text-[0.72rem] font-semibold uppercase tracking-luxury',
          accent ? 'text-gold' : 'text-muted-foreground',
        )}
      >
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{body}</p>
    </div>
  )
}
