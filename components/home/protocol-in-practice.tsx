'use client'

import { useState } from 'react'
import { SectionHeading } from '@/components/section-primitives'
import { cn } from '@/lib/utils'

type Stage = {
  key: string
  label: string
  title: string
  body: string
  image: string
  imageAlt: string
}

const stages: Stage[] = [
  {
    key: 'arrival',
    label: 'Arrival',
    title: 'The first impression is formed before a word is spoken',
    body: 'From the choreography of the welcome line to the placement of the host, arrival sets the tone of the entire engagement. Precision in greeting order, escort etiquette, and spatial awareness signals respect and readiness.',
    image: '/images/ceremony.png',
    imageAlt: 'Ceremonial arrival with red carpet and honor formation',
  },
  {
    key: 'greeting',
    label: 'Greeting',
    title: 'Warmth governed by form',
    body: 'Saudi generosity meets international protocol. Titles, precedence, and cultural courtesies are observed instinctively, making every guest feel both honored and at ease.',
    image: '/images/hospitality.png',
    imageAlt: 'Host presenting Arabic coffee from a dallah pot',
  },
  {
    key: 'meeting',
    label: 'Meeting',
    title: 'Composure that commands the room',
    body: 'Seating hierarchy, attentive listening, and disciplined timing turn a meeting into a demonstration of institutional excellence. Every gesture reinforces credibility.',
    image: '/images/about-leadership.png',
    imageAlt: 'Executive leadership meeting in a refined boardroom',
  },
  {
    key: 'dining',
    label: 'Dining',
    title: 'The table as a stage for diplomacy',
    body: 'From cover settings to service sequence and conversational grace, formal dining is where relationships deepen. We train teams to make the complex appear effortless.',
    image: '/images/dining.png',
    imageAlt: 'Formal state banquet table impeccably set',
  },
  {
    key: 'ceremony',
    label: 'Ceremony',
    title: 'Moments of national significance',
    body: 'Honors, signings, and state observances demand flawless sequencing. Our protocol officers rehearse the dignified pace that defines memorable ceremonies.',
    image: '/images/ceremony.png',
    imageAlt: 'Formal state ceremonial moment with honor guard',
  },
  {
    key: 'departure',
    label: 'Departure',
    title: 'A lasting impression, gracefully sealed',
    body: 'The farewell is as deliberate as the welcome. Escort, acknowledgement, and follow-through ensure the guest leaves with the institution\u2019s excellence top of mind.',
    image: '/images/hero-protocol.png',
    imageAlt: 'Elegant departure corridor in a diplomatic hall',
  },
]

export function ProtocolInPractice() {
  const [active, setActive] = useState(0)
  const stage = stages[active]

  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          light
          eyebrow="A Signature Experience"
          title="Protocol in Practice"
          intro="Excellence is not a single moment \u2014 it is a continuum. Follow a VIP engagement through six defining stages, and see how protocol shapes every interaction."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Stage rail */}
          <div className="lg:col-span-4">
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {stages.map((s, i) => (
                <li key={s.key} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'group flex w-full items-center gap-4 border-b border-gold/15 px-4 py-4 text-left transition-colors lg:px-0',
                      active === i
                        ? 'text-gold'
                        : 'text-primary-foreground/55 hover:text-primary-foreground',
                    )}
                  >
                    <span className="font-mono text-xs">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading text-xl">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Stage content */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden border border-gold/20">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  key={stage.image + active}
                  src={stage.image || '/placeholder.svg'}
                  alt={stage.imageAlt}
                  className="size-full animate-in fade-in duration-700 object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="bg-primary p-8 lg:p-10">
                <span className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                  {stage.label}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-medium text-primary-foreground lg:text-3xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
                  {stage.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
