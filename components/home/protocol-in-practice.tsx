'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/section-primitives'
import { cn } from '@/lib/utils'

type Stage = { key: string; label: string; title: string; body: string }

const stageImages = [
  { image: '/images/ceremony.png', imageAlt: 'Ceremonial arrival with red carpet and honor formation' },
  { image: '/images/hospitality.png', imageAlt: 'Host presenting Arabic coffee from a dallah pot' },
  { image: '/images/about-leadership.png', imageAlt: 'Executive leadership meeting in a refined boardroom' },
  { image: '/images/dining.png', imageAlt: 'Formal state banquet table impeccably set' },
  { image: '/images/ceremony.png', imageAlt: 'Formal state ceremonial moment with honor guard' },
  { image: '/images/hero-protocol.png', imageAlt: 'Elegant departure corridor in a diplomatic hall' },
]

export function ProtocolInPractice() {
  const t = useTranslations('home.protocol')
  const stages = t.raw('stages') as Stage[]
  const [active, setActive] = useState(0)
  const stage = stages[active]
  const { image, imageAlt } = stageImages[active] ?? stageImages[0]

  return (
    <section className="overflow-x-hidden bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          light
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ol className="grid grid-cols-3 lg:flex lg:flex-col lg:gap-0">
              {stages.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'group flex w-full flex-col gap-1 border-b border-gold/15 px-2 py-3 text-start transition-colors lg:flex-row lg:items-center lg:gap-3 lg:px-0 lg:py-4',
                      active === i ? 'text-gold' : 'text-primary-foreground/55 hover:text-primary-foreground',
                    )}
                  >
                    <span className="shrink-0 font-mono text-[0.65rem]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-heading text-base lg:text-xl">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden border border-gold/20">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  key={image + active}
                  src={image}
                  alt={imageAlt}
                  className="size-full animate-in fade-in duration-700 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden="true" />
              </div>
              <div className="bg-primary p-8 lg:p-10">
                <span className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">{stage.label}</span>
                <h3 className="mt-3 font-heading text-2xl font-medium text-primary-foreground lg:text-3xl">{stage.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70">{stage.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
