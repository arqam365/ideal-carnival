import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'EHP Academy case studies documenting institutional transformation in protocol, hospitality excellence, executive presence, and government service — across Saudi ministries, defense, and hospitality.',
}

type CaseStudy = {
  id: string
  sector: string
  institution: string
  headline: string
  challenge: string
  assessment: string
  strategy: string
  implementation: string
  transformation: string
  results: string[]
  impact: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'ministry-protocol-transformation',
    sector: 'Government',
    institution: 'Saudi Government Ministry',
    headline: 'Elevating reception protocol for a ministry receiving international delegations',
    challenge:
      'A senior Saudi ministry receiving an increasing volume of foreign ministerial visits found that its protocol procedures lacked consistency. Reception sequences varied by team, forms of address were applied incorrectly, and escort procedures were improvised. International partners noticed.',
    assessment:
      'EHP conducted a three-day protocol audit embedded within the ministry\'s official functions. We reviewed sixteen reception procedures, interviewed twelve protocol officers, and observed two live delegation arrivals. The assessment identified seventeen procedural gaps.',
    strategy:
      'A phased protocol standardisation programme was designed: foundational training for all 40+ reception staff, advanced certification for the eight senior protocol officers, and an in-house Protocol Standards Manual tailored to the ministry\'s specific mandate and partner countries.',
    implementation:
      'A five-day residential programme was delivered in two cohorts. Faculty included a former Saudi diplomatic protocol officer and a senior EHL hospitality professional. All participants completed scenario simulations of live delegation arrivals, formal receptions, and state luncheons.',
    transformation:
      'By completion, the ministry had a unified protocol manual, a trained and certified protocol corps, and rehearsed procedures for 22 standard engagement scenarios. Senior officials described the shift as "from improvised to institutionalised."',
    results: [
      'Protocol procedures standardised across all 22 engagement scenarios',
      '100% of senior protocol staff certified to EHP standard',
      'Zero protocol incidents reported in 14 months following delivery',
      'International delegation satisfaction surveys improved markedly',
    ],
    impact:
      'The ministry now hosts international visits with the quiet confidence of an institution that has done it a thousand times. EHP continues to deliver annual refresher programmes and advises on new engagement scenarios.',
  },
  {
    id: 'luxury-hotel-service-culture',
    sector: 'Hospitality',
    institution: 'Five-Star Luxury Hotel, Riyadh',
    headline: 'Building a service culture that matched a world-class property',
    challenge:
      'A newly opened flagship luxury property in Riyadh had invested enormously in architecture and amenity but found that guest experience scores were falling short of the brand\'s international benchmarks. The physical environment communicated luxury; the service interactions did not.',
    assessment:
      'EHP embedded a mystery guest assessment team across four stays over three weeks. We mapped 47 distinct service touchpoints from arrival to departure, graded each interaction against international five-star benchmarks, and identified behavioral patterns — not individual failures — as the root cause.',
    strategy:
      'A full-property service culture transformation programme was designed across three phases: leadership alignment, frontline behavioral excellence, and embedded culture reinforcement. The engagement treated service not as a skill but as an expression of institutional character.',
    implementation:
      'Phase one engaged 18 department heads in a two-day leadership programme. Phase two delivered five-day immersive programmes to 160 frontline staff in six cohorts. Phase three installed service champions in each department, equipped with tools to sustain the culture independently.',
    transformation:
      'Staff moved from performing service rituals to inhabiting a service identity. The distinction was observable: the pace slowed, eye contact became natural, and anticipatory behaviours appeared without instruction. Guest comments began mentioning individual staff members by name.',
    results: [
      'Guest satisfaction score improved from 72 to 91 within six months',
      'TripAdvisor ranking advanced 14 positions in the city category',
      'Repeat guest rate increased by 23%',
      'Staff retention improved — turnover dropped by 18%',
    ],
    impact:
      'The property now consistently benchmarks above the brand\'s international average in service delivery metrics. EHP is engaged annually to develop new joiners and reinforce the culture across expanding staff cohorts.',
  },
  {
    id: 'military-ceremonial-excellence',
    sector: 'Defense',
    institution: 'Defense Command, Saudi Arabia',
    headline: 'Redesigning ceremonial protocol for national and international military occasions',
    challenge:
      'A defense command was tasked with hosting a significant multinational military ceremony involving delegations from 12 countries. The existing ceremonial team had not managed an event of this complexity, and the potential for protocol failures in front of international military leadership was significant.',
    assessment:
      'EHP\'s military protocol faculty conducted a rapid capability assessment over two days. We reviewed existing ceremonial standing orders, observed a training rehearsal, and benchmarked the team\'s capability against international military ceremonial standards. Critical gaps were identified in precedence management, flag protocol, and departure sequencing.',
    strategy:
      'A compressed but comprehensive preparation programme was designed across four weeks. The strategy combined skills training, procedure redesign, and intensive rehearsal — with EHP faculty embedded on-site throughout the preparation period.',
    implementation:
      'Faculty delivered a four-day Ceremonial Protocol intensive for 34 officers and warrant officers. Procedures were rewritten with EHP input. Two full dress rehearsals were conducted and supervised by the EHP military protocol faculty, with detailed debrief and correction at each stage.',
    transformation:
      'The ceremonial team entered the event with procedures they had rehearsed to precision and a command understanding of every contingency. The composure of the team shifted noticeably — from anxiety-driven to quietly authoritative.',
    results: [
      'Zero protocol incidents across a 6-hour multinational ceremony',
      'Commendation from three international delegation commanders',
      'Command issued new standing orders based on EHP-redesigned procedures',
      'Team nominated for internal excellence recognition',
    ],
    impact:
      'The command has since engaged EHP for annual ceremonial protocol refresher training and has recommended the programme to two affiliated defense institutions.',
  },
]

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Studies"
        title="Transformation documented with the rigour of institutional evidence"
        intro="These are not testimonials. They are documented accounts of how EHP engaged with an institution, diagnosed its challenges, designed a strategy, and delivered measurable transformation."
        image="/images/about-leadership.png"
        imageAlt="Institutional transformation at EHP Academy"
      />

      {/* Case study listing */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="Client Engagements"
              title="Select a case to read the full account"
              intro="All case studies are presented with the institution's authorization. Client names are anonymized where confidentiality was requested."
            />
          </div>

          <div className="space-y-3">
            {caseStudies.map((cs, i) => (
              <a
                key={cs.id}
                href={`#${cs.id}`}
                className="reveal group block overflow-hidden border border-border bg-card transition-colors hover:border-primary"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid gap-4 p-8 lg:grid-cols-12 lg:gap-8 lg:p-10">
                  <div className="lg:col-span-2">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-luxury text-gold">
                      {cs.sector}
                    </span>
                    <p className="mt-2 text-xs uppercase tracking-luxury text-muted-foreground">
                      {cs.institution}
                    </p>
                  </div>
                  <div className="flex items-center lg:col-span-9">
                    <h3 className="font-heading text-xl font-medium text-primary transition-colors group-hover:text-primary lg:text-2xl">
                      {cs.headline}
                    </h3>
                  </div>
                  <div className="flex items-center justify-end lg:col-span-1">
                    <ArrowRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Full case studies */}
      {caseStudies.map((cs, idx) => (
        <section
          key={cs.id}
          id={cs.id}
          className="scroll-mt-24 border-t border-border py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal mb-14">
              <span className="font-mono text-sm text-gold">
                Case {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  {cs.sector}
                </span>
                <span className="h-3 w-px bg-border" aria-hidden="true" />
                <span className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                  {cs.institution}
                </span>
              </div>
              <h2 className="mt-5 max-w-4xl text-pretty font-heading text-3xl font-medium text-primary sm:text-4xl lg:text-[2.5rem]">
                {cs.headline}
              </h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-10 lg:col-span-8">
                <CaseBlock label="The Challenge" body={cs.challenge} />
                <CaseBlock label="Assessment" body={cs.assessment} />
                <CaseBlock label="Strategy" body={cs.strategy} />
                <CaseBlock label="Implementation" body={cs.implementation} />
                <CaseBlock label="Transformation" body={cs.transformation} />
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-8">
                  <div className="border border-gold/30 bg-primary p-8">
                    <Eyebrow light>Measured Results</Eyebrow>
                    <ul className="mt-6 space-y-4">
                      {cs.results.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/80"
                        >
                          <span
                            className="mt-1.5 size-1.5 shrink-0 bg-gold"
                            aria-hidden="true"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-border bg-card p-8">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                      Lasting Impact
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                      {cs.impact}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ))}

      <ConsultationCTA
        title="Become the institution your partners expect you to be"
        body="Every one of these engagements began with a conversation. Let us understand your challenge and design the right response."
      />
    </main>
  )
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-l-2 border-sand pl-7">
      <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 text-base leading-relaxed text-foreground/80">{body}</p>
    </div>
  )
}
