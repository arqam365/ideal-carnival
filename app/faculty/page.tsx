import type { Metadata } from 'next'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'Faculty & Experts',
  description:
    'EHP Academy faculty are practising protocol officers, diplomatic advisors, and hospitality leaders who have operated at the highest levels of government, defense, and international service.',
}

type Faculty = {
  name: string
  title: string
  specialisation: string[]
  bio: string
  credentials: string[]
}

const faculty: Faculty[] = [
  {
    name: 'Dr. Noura Al-Harbi',
    title: 'Director of Protocol Studies',
    specialisation: ['Diplomatic Protocol', 'State Ceremonies', 'International Relations'],
    bio: 'Dr. Al-Harbi served for over two decades as a senior protocol advisor to three Saudi government ministries, managing state visits, diplomatic receptions, and international summits at the highest level. She holds a doctorate in International Relations from Sciences Po Paris and has trained protocol officers across the GCC.',
    credentials: [
      'PhD International Relations, Sciences Po Paris',
      'Former Senior Protocol Advisor, Council of Ministers',
      'Certified Diplomatic Protocol Specialist, CPD London',
    ],
  },
  {
    name: 'Brigadier (Ret.) Khalid Al-Otaibi',
    title: 'Head of Military Protocol',
    specialisation: ['Military Ceremonial', 'Defense Protocol', 'Command Conduct'],
    bio: 'Following a distinguished 30-year career in the Saudi Armed Forces, Brigadier Al-Otaibi led the development of ceremonial standards for national events, royal visits, and international defense forums. He brings an uncompromising standard of precision to every program he delivers.',
    credentials: [
      'Brigadier General, Royal Saudi Land Forces (Ret.)',
      'Graduate, Higher Defense Studies College, Riyadh',
      'Former Chief of Ceremonial, Joint Command HQ',
    ],
  },
  {
    name: 'Sophia Laurent',
    title: 'Senior Faculty, Hospitality Excellence',
    specialisation: ['Five-Star Service', 'VIP & Royal Guest Protocol', 'Luxury Hospitality'],
    bio: 'A graduate of École Hôtelière de Lausanne, Sophia spent fifteen years leading guest experience at three Michelin-recommended properties across Europe and the Middle East, including a seven-year tenure as Director of Guest Relations at a leading Riyadh luxury hotel. She trains hospitality teams to the highest international standards.',
    credentials: [
      'Bachelor of Science in Hospitality, EHL Lausanne',
      'Certified Hotel Professional, Leading Hotels of the World',
      'Former Director of Guest Relations, Ritz-Carlton Riyadh',
    ],
  },
  {
    name: 'Eng. Tariq Al-Mansouri',
    title: 'Faculty Lead, Customer Experience & Service Design',
    specialisation: ['Customer Experience Strategy', 'Service Culture Transformation', 'Government Excellence'],
    bio: 'Tariq has led large-scale service transformation programs for four Saudi government authorities and two international airlines, integrating behavioural science, journey design, and cultural values into measurable service standards. His methodology underpins the EHP Service Excellence Framework.',
    credentials: [
      'MSc Service Design, Royal College of Art, London',
      'Certified Customer Experience Professional (CCXP)',
      'Former VP Customer Experience, Saudi National Airlines',
    ],
  },
  {
    name: 'H.E. (Ret.) Ambassador Faisal Al-Ghamdi',
    title: 'Distinguished Faculty, International Protocol',
    specialisation: ['Diplomatic Etiquette', 'International Summits', 'Bilateral Relations'],
    bio: 'Ambassador Al-Ghamdi served in five diplomatic postings across Europe, Asia, and North America during a 28-year diplomatic career. He brings direct experience from G20 summits, bilateral state visits, and international treaty ceremonies, providing our participants with insight no textbook can offer.',
    credentials: [
      'Former Saudi Ambassador to France and UNESCO',
      'MA Diplomatic Studies, Fletcher School, Tufts University',
      'Fellow, Diplomatic Academy of Vienna',
    ],
  },
  {
    name: 'Lina Al-Zahrani',
    title: 'Faculty, Executive Presence & Professional Image',
    specialisation: ['Executive Presence', 'Professional Conduct', 'Leadership Bearing'],
    bio: 'Lina specialises in developing the physical and behavioural dimensions of executive presence — posture, movement, dress, voice, and composure under pressure. She has coached over 400 senior Saudi executives and government officials, and is a certified practitioner in executive coaching and personal brand strategy.',
    credentials: [
      'Executive Coaching Certification, ICF-Accredited Program',
      'Certified Image Consultant, AICI (Association of Image Consultants International)',
      'BA Communications, King Saud University',
    ],
  },
]

const disciplines = [
  'Diplomatic Protocol',
  'Military Ceremonial',
  'Hospitality Excellence',
  'Executive Presence',
  'Customer Experience',
  'International Etiquette',
  'Government Service Excellence',
  'VIP Relations',
]

export default function FacultyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Faculty & Experts"
        title="Practitioners who have operated at the highest levels"
        intro="Every EHP faculty member has served in the field — as a protocol officer, diplomat, military commander, or hospitality director. They teach mastery earned in practice, not theory."
        image="/images/about-leadership.png"
        imageAlt="EHP Academy faculty in formal consultation"
      />

      {/* Philosophy */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal lg:col-span-5">
            <SectionHeading
              eyebrow="Our Faculty Philosophy"
              title="Excellence is taught only by those who have lived it"
            />
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7">
            <p>
              At EHP, we do not appoint academics to teach protocol. We engage
              the people who have managed state visits, commanded ceremonial
              formations, and hosted royalty — the professionals for whom
              excellence was not a concept but a daily operational requirement.
            </p>
            <p>
              Our faculty bring decades of real-world authority to every
              programme. They teach with the quiet confidence of those who have
              performed flawlessly in the moments that define institutions.
            </p>
            <p>
              Every engagement is personally supervised by a senior faculty
              member who has practised at the level our participants aspire to
              reach.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty grid */}
      <section className="bg-accent/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="Senior Faculty"
              title="The people behind EHP programmes"
            />
          </div>

          <div className="space-y-px overflow-hidden border border-border">
            {faculty.map((member, i) => (
              <article
                key={member.name}
                className="reveal grid gap-8 bg-card p-8 lg:grid-cols-12 lg:gap-12 lg:p-10"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="lg:col-span-4">
                  <div className="mb-4 h-px w-10 bg-gold" aria-hidden="true" />
                  <h3 className="font-heading text-2xl font-medium text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold">
                    {member.title}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.specialisation.map((s) => (
                      <span
                        key={s}
                        className="border border-sand px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-luxury text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-base leading-relaxed text-foreground/80">
                    {member.bio}
                  </p>
                  <div className="mt-8">
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                      Credentials
                    </p>
                    <ul className="space-y-2">
                      {member.credentials.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/75"
                        >
                          <span
                            className="mt-1.5 size-1.5 shrink-0 bg-gold"
                            aria-hidden="true"
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="bg-primary py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <Eyebrow light>Disciplines Covered</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl font-medium text-primary-foreground sm:text-4xl">
              Collective expertise across every dimension of service excellence
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-3 lg:grid-cols-4">
            {disciplines.map((d) => (
              <div
                key={d}
                className="bg-primary px-6 py-5 text-sm font-medium text-primary-foreground/85"
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        title="Engage our faculty for your institution"
        body="All EHP programmes are designed and delivered by senior practitioners. Speak to our advisory team about the right faculty for your engagement."
      />
    </main>
  )
}
