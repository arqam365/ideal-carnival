import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'EHP Academy solutions: Government Excellence, Military Protocol, Executive Presence, Customer Experience, Hospitality Excellence, Corporate Service Culture, and International Protocol.',
}

type Solution = {
  id: string
  number: string
  title: string
  summary: string
  capabilities: string[]
  outcome: string
}

const solutionDetails: Solution[] = [
  {
    id: 'government-excellence',
    number: '01',
    title: 'Government Excellence',
    summary:
      'Elevating the service standards of ministries, authorities, and public-facing institutions to match the expectations of citizens and global partners.',
    capabilities: [
      'Citizen experience design',
      'Official reception and visit protocol',
      'Public service conduct standards',
      'Inter-ministerial coordination etiquette',
    ],
    outcome:
      'Consistent, dignified public service that reinforces institutional trust.',
  },
  {
    id: 'military-protocol',
    number: '02',
    title: 'Military Protocol',
    summary:
      'Ceremonial precision and command-level conduct for defense institutions, honor formations, and official military engagements.',
    capabilities: [
      'Ceremonial sequencing and honors',
      'Rank precedence and address',
      'Visiting delegation protocol',
      'Commemorative event command',
    ],
    outcome:
      'Flawless ceremonial execution worthy of national significance.',
  },
  {
    id: 'executive-presence',
    number: '03',
    title: 'Executive Presence',
    summary:
      'Developing the gravitas, composure, and bearing that define credible leadership in high-stakes environments.',
    capabilities: [
      'Personal conduct and poise',
      'High-stakes communication',
      'Boardroom and stage presence',
      'Cross-cultural executive etiquette',
    ],
    outcome:
      'Leaders who command respect and represent with confidence.',
  },
  {
    id: 'customer-experience',
    number: '04',
    title: 'Customer Experience',
    summary:
      'Designing memorable, dignified service journeys that turn every touchpoint into an expression of excellence.',
    capabilities: [
      'Journey mapping and moments of truth',
      'Service recovery mastery',
      'Frontline behavioral standards',
      'Experience measurement frameworks',
    ],
    outcome:
      'Service experiences that build loyalty and reputation.',
  },
  {
    id: 'hospitality-excellence',
    number: '05',
    title: 'Hospitality Excellence',
    summary:
      'World-class hospitality standards rooted in the warmth and generosity of authentic Saudi tradition.',
    capabilities: [
      'Five-star service sequencing',
      'VIP and royal guest handling',
      'Banquet and event hospitality',
      'Cultural hosting traditions',
    ],
    outcome:
      'Hospitality that distinguishes the institution and the Kingdom.',
  },
  {
    id: 'corporate-service-culture',
    number: '06',
    title: 'Corporate Service Culture',
    summary:
      'Embedding a sustainable culture of service excellence across every level of an organization.',
    capabilities: [
      'Service values and standards design',
      'Leadership role-modeling programs',
      'Internal service ecosystems',
      'Culture measurement and reinforcement',
    ],
    outcome:
      'A self-sustaining culture where excellence becomes the norm.',
  },
  {
    id: 'international-protocol',
    number: '07',
    title: 'International Protocol',
    summary:
      'Diplomatic conduct and cross-border etiquette for engagements on the global stage.',
    capabilities: [
      'Diplomatic precedence and flags',
      'State visit and summit protocol',
      'Gift and correspondence etiquette',
      'Cross-cultural negotiation conduct',
    ],
    outcome:
      'Confident, correct conduct in any international setting.',
  },
]

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Strategic capabilities for institutions that represent the Kingdom"
        intro="We engage with ministries, commands, authorities, and enterprises as a partner in excellence \u2014 not a vendor of courses. Each solution is a capability area, tailored to your mandate."
        image="/images/ceremony.png"
        imageAlt="Formal Saudi state ceremony"
      />

      <section className="bg-background">
        {solutionDetails.map((solution, i) => (
          <div
            key={solution.id}
            id={solution.id}
            className="scroll-mt-24 border-b border-border"
          >
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
              <div className="reveal lg:col-span-5">
                <span className="font-mono text-sm text-gold">
                  {solution.number}
                </span>
                <h2 className="mt-4 font-heading text-3xl font-medium text-primary sm:text-4xl">
                  {solution.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {solution.summary}
                </p>
                <div className="mt-8 border-l-2 border-gold pl-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                    Outcome
                  </p>
                  <p className="mt-2 text-base font-medium text-primary">
                    {solution.outcome}
                  </p>
                </div>
              </div>
              <div className="reveal lg:col-span-6 lg:col-start-7">
                <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  Core Capabilities
                </p>
                <ul className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  {solution.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="bg-card px-6 py-5 text-sm font-medium text-primary"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ConsultationCTA />
    </main>
  )
}
