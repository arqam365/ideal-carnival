'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Program = {
  id: string
  title: string
  category: string
  level: 'Foundation' | 'Professional' | 'Executive'
  duration: string
  format: string
  overview: string
  outcomes: string[]
  audience: string
  modules: string[]
  certification: string
  impact: string
}

export const programs: Program[] = [
  {
    id: 'diplomatic-protocol-mastery',
    title: 'Diplomatic Protocol Mastery',
    category: 'International Protocol',
    level: 'Executive',
    duration: '3 days',
    format: 'Residential / On-site',
    overview:
      'A comprehensive immersion in the protocol of state visits, diplomatic receptions, and international summits — designed for officials, aides-de-camp, and senior government professionals.',
    outcomes: [
      'Master precedence, titles, and forms of address in diplomatic contexts',
      'Manage state visits and official receptions with precision',
      'Navigate cross-cultural protocol with confidence',
      'Design and oversee formal ceremonies at ministerial level',
    ],
    audience: 'Government officials, protocol officers, ministerial aides, heads of office',
    modules: [
      'Principles of diplomatic precedence',
      'State visit sequencing and logistics',
      'Flags, national symbols, and honors',
      'Table placement and seating hierarchy',
      'Forms of address and correspondence',
      'Managing the unexpected with composure',
    ],
    certification: 'EHP Certificate in Diplomatic Protocol',
    impact: 'Participants leave equipped to manage any official engagement with flawless confidence.',
  },
  {
    id: 'executive-presence-leadership',
    title: 'Executive Presence & Leadership Bearing',
    category: 'Executive Presence',
    level: 'Executive',
    duration: '2 days',
    format: 'Workshop / Coaching',
    overview:
      'Developing the gravitas, composure, and physical authority that define credible senior leadership — in boardrooms, on stages, and across international settings.',
    outcomes: [
      'Project authority and calm in high-stakes environments',
      'Refine personal conduct, posture, and professional appearance',
      'Command meetings, presentations, and formal engagements',
      'Manage cross-cultural executive etiquette with ease',
    ],
    audience: 'C-suite executives, senior directors, government ministers, military commanders',
    modules: [
      'The anatomy of executive presence',
      'Posture, movement, and composure under pressure',
      'Professional appearance and dress standards',
      'High-stakes communication and listening',
      'Cross-cultural business etiquette',
      'Personal brand and institutional representation',
    ],
    certification: 'EHP Certificate in Executive Presence',
    impact: 'Leaders who command respect and represent their institutions with distinction.',
  },
  {
    id: 'military-ceremonial-protocol',
    title: 'Military Ceremonial Protocol',
    category: 'Military Protocol',
    level: 'Professional',
    duration: '4 days',
    format: 'On-site / Drill-based',
    overview:
      'The definitive programme for military and defense professionals responsible for ceremonial events, visiting delegations, and state-level occasions.',
    outcomes: [
      'Execute ceremonial formations with precision and timing',
      'Manage military honors, flags, and national observances',
      'Handle visiting delegation protocol at command level',
      'Brief and rehearse ceremonial teams with authority',
    ],
    audience: 'Military officers, ceremonial warrant officers, defense protocol units',
    modules: [
      'Principles of military ceremonial',
      'Rank structure and forms of address',
      'National anthem, flags, and honors sequencing',
      'Escort and arrival procedures',
      'Visiting delegation management',
      'Rehearsal planning and briefing',
    ],
    certification: 'EHP Certificate in Military Ceremonial Protocol',
    impact: 'Defense teams capable of delivering national ceremonies worthy of the occasion.',
  },
  {
    id: 'hospitality-excellence-certification',
    title: 'Hospitality Excellence Certification',
    category: 'Hospitality Excellence',
    level: 'Professional',
    duration: '5 days',
    format: 'Immersive / Practical',
    overview:
      'A comprehensive certification programme for hospitality professionals seeking to deliver world-class service grounded in Saudi cultural generosity and international five-star standards.',
    outcomes: [
      'Apply five-star service sequencing across all hospitality touchpoints',
      'Handle VIP, royal, and UHNWI guests with confidence',
      'Design and manage formal dining experiences',
      'Embed a culture of anticipatory service in teams',
    ],
    audience: 'Hotel managers, F&B leads, guest relations teams, hospitality supervisors',
    modules: [
      'The philosophy of exceptional hospitality',
      'Saudi cultural hosting traditions',
      'Five-star service standards and sequencing',
      'VIP and royal guest protocols',
      'Formal dining and banquet service',
      'Anticipatory service and service recovery',
    ],
    certification: 'EHP Certified Hospitality Professional',
    impact: 'Hospitality teams that distinguish their property through consistently excellent service.',
  },
  {
    id: 'customer-experience-design',
    title: 'Customer Experience Design',
    category: 'Customer Experience',
    level: 'Professional',
    duration: '3 days',
    format: 'Workshop / Consultative',
    overview:
      'A strategic programme for service leaders who want to design and embed experiences that are consistently dignified, memorable, and aligned with institutional values.',
    outcomes: [
      'Map customer journeys and identify moments of truth',
      'Define and communicate behavioural service standards',
      'Build service recovery frameworks that rebuild trust',
      'Measure and improve experience through structured feedback',
    ],
    audience: 'Customer experience leads, service managers, operations directors',
    modules: [
      'What exceptional experience actually means',
      'Journey mapping and touchpoint analysis',
      'Defining institutional service standards',
      'Frontline behavioral excellence',
      'Service recovery and complaint resolution',
      'Measurement and continuous improvement',
    ],
    certification: 'EHP Certificate in Customer Experience Design',
    impact: 'Service leaders who can design and sustain excellence at scale.',
  },
  {
    id: 'business-etiquette-international',
    title: 'International Business Etiquette',
    category: 'International Protocol',
    level: 'Foundation',
    duration: '1 day',
    format: 'Workshop',
    overview:
      'An essential programme for professionals engaging in international business — covering conduct, correspondence, meetings, dining, and cross-cultural interaction.',
    outcomes: [
      'Conduct business meetings with protocol-correct confidence',
      'Navigate formal dining and entertainment with ease',
      'Apply cultural intelligence in cross-border engagements',
      'Correspond formally with appropriate titles and forms of address',
    ],
    audience: 'Business professionals, government representatives, emerging leaders',
    modules: [
      'Introduction to business protocol',
      'Meetings, introductions, and exchange of credentials',
      'Formal and informal dining etiquette',
      'Cross-cultural awareness and conduct',
      'Professional correspondence and forms of address',
    ],
    certification: 'EHP Certificate in International Business Etiquette',
    impact: 'Professionals who move with confidence in any international business context.',
  },
  {
    id: 'government-service-excellence',
    title: 'Government Service Excellence',
    category: 'Government Excellence',
    level: 'Professional',
    duration: '3 days',
    format: 'Workshop / On-site',
    overview:
      'A transformation programme for public sector teams — building the conduct, communication, and service standards that define a world-class government institution.',
    outcomes: [
      'Establish consistent citizen-facing conduct standards',
      'Manage official receptions and high-profile visits',
      'Develop a service mindset aligned with Vision 2030',
      'Build internal capability for ongoing excellence',
    ],
    audience: 'Ministry staff, government authority teams, public sector service leads',
    modules: [
      'Service excellence in public institutions',
      'Citizen experience design and conduct standards',
      'Official visit and reception protocols',
      'Communication and professional correspondence',
      'Building a culture of service within government',
    ],
    certification: 'EHP Certificate in Government Service Excellence',
    impact: 'Public institutions that citizens, partners, and guests experience with confidence.',
  },
  {
    id: 'vip-relations-management',
    title: 'VIP Relations & Guest Management',
    category: 'Hospitality Excellence',
    level: 'Executive',
    duration: '2 days',
    format: 'Workshop / Scenario-based',
    overview:
      'A focused programme for professionals responsible for managing royalty, heads of state, dignitaries, and high-value guests — where every detail matters and there is no margin for error.',
    outcomes: [
      'Plan and execute VIP arrival, escort, and hosting protocols',
      'Anticipate and manage the preferences and needs of principal guests',
      'Brief teams and manage the unexpected with composure',
      'Maintain discretion and composure under pressure',
    ],
    audience: 'Chief of staff, event leads, concierge teams, protocol officers, hospitality managers',
    modules: [
      'Understanding the VIP mindset',
      'Arrival, escort, and room preparation protocols',
      'Preference management and anticipatory service',
      'Team briefing and communication',
      'Managing incidents with discretion',
      'Departure and follow-through',
    ],
    certification: 'EHP Certificate in VIP Relations Management',
    impact: 'Teams that handle the most demanding guests with precision, warmth, and professionalism.',
  },
]

const levels = ['All', 'Foundation', 'Professional', 'Executive'] as const
const categories = ['All', ...Array.from(new Set(programs.map((p) => p.category)))]

type Level = (typeof levels)[number]

function ProgramCard({ program }: { program: Program }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-8 text-left"
        aria-expanded={open}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.68rem] font-semibold uppercase tracking-luxury text-gold">
              {program.category}
            </span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
              {program.level}
            </span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
              {program.duration}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-2xl font-medium text-primary">
            {program.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {program.overview}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="border-t border-border px-8 pb-8 pt-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                Learning Outcomes
              </p>
              <ul className="mt-4 space-y-2">
                {program.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 bg-gold" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                Programme Modules
              </p>
              <ul className="mt-4 space-y-2">
                {program.modules.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 bg-border" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  Target Audience
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {program.audience}
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  Delivery
                </p>
                <p className="mt-2 text-sm text-foreground/80">{program.format}</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-gold">
                  Business Impact
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {program.impact}
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  Certification
                </p>
                <p className="mt-2 text-sm font-medium text-primary">
                  {program.certification}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
              >
                Enquire about this programme
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProgramCatalog() {
  const [level, setLevel] = useState<Level>('All')
  const [category, setCategory] = useState('All')

  const filtered = programs.filter(
    (p) =>
      (level === 'All' || p.level === level) &&
      (category === 'All' || p.category === category),
  )

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={cn(
                'px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-luxury transition-colors',
                level === l
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary hover:text-primary',
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-luxury transition-colors',
                category === c
                  ? 'bg-gold text-gold-foreground'
                  : 'border border-border text-muted-foreground hover:border-gold hover:text-gold',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-xs uppercase tracking-luxury text-muted-foreground">
        {filtered.length} programme{filtered.length !== 1 ? 's' : ''}
      </p>
      <div className="flex flex-col gap-3">
        {filtered.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </div>
  )
}
