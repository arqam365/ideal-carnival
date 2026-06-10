import type { Metadata } from 'next'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'About EHP Academy',
  description:
    'The story, vision, mission, and leadership philosophy of EHP Academy \u2014 the House of Etiquette, Hospitality & Protocol, advancing Saudi service excellence in alignment with Vision 2030.',
}

const values = [
  {
    title: 'Honor',
    body: 'We treat every interaction as a representation of the Kingdom\u2019s dignity and reputation.',
  },
  {
    title: 'Generosity',
    body: 'Authentic Saudi hospitality is the heart of everything we teach and practice.',
  },
  {
    title: 'Precision',
    body: 'Protocol is exact. We pursue flawless execution in every detail and sequence.',
  },
  {
    title: 'Discretion',
    body: 'We operate with the confidentiality and composure expected at the highest levels.',
  },
  {
    title: 'Excellence',
    body: 'We benchmark against the finest institutions in the world \u2014 and aim higher.',
  },
  {
    title: 'Stewardship',
    body: 'We build lasting national capability, not short-term training outcomes.',
  },
]

const timeline = [
  {
    year: '2018',
    title: 'Founding vision',
    body: 'EHP is established to professionalize service, hospitality, and protocol across Saudi institutions.',
  },
  {
    year: '2020',
    title: 'International alignment',
    body: 'Partnerships formed with global hospitality and protocol bodies to benchmark standards.',
  },
  {
    year: '2022',
    title: 'Government & defense mandate',
    body: 'Programs expand to ministries, authorities, and military commands at national scale.',
  },
  {
    year: '2024',
    title: 'Vision 2030 acceleration',
    body: 'EHP becomes a recognized partner in the Kingdom\u2019s human-capability ambitions.',
  },
  {
    year: 'Today',
    title: 'The institution',
    body: 'A respected house of excellence shaping how Saudi Arabia is represented to the world.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About the Institution"
        title="An institution built to elevate how Saudi Arabia serves and leads"
        intro="EHP Academy is not a course marketplace. We are a house of excellence \u2014 developing the conduct, hospitality, and protocol competency that defines world-class representation."
        image="/images/about-leadership.png"
        imageAlt="Executive leadership meeting at EHP Academy"
      />

      {/* Story */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal space-y-10 lg:col-span-5">
            <SectionHeading
              eyebrow="Our Story"
              title="Founded to professionalize service at a national level"
            />
            <div className="overflow-hidden border border-border">
              <img
                src="/images/about-leadership.png"
                alt="EHP Academy leadership"
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-4">
            <p>
              EHP Academy was established with a singular conviction: that the
              way a nation welcomes, hosts, and represents itself is a strategic
              asset. As Saudi Arabia opens to the world, the demand for refined,
              consistent, and culturally rooted service excellence has never
              been greater.
            </p>
            <p>
              We bring together the discipline of diplomatic protocol, the
              warmth of Saudi hospitality, and the rigor of executive education.
              Our work spans ministries, military commands, airports, hospitals,
              and Fortune 500 enterprises &mdash; each engagement designed
              around the institution it serves.
            </p>
            <p>
              The result is a generation of Saudi professionals who carry
              themselves, and the Kingdom, with quiet confidence on any stage.
            </p>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              {[
                { value: '240+', label: 'Institutions Served' },
                { value: '18,500+', label: 'Professionals Developed' },
                { value: '10', label: 'Industries' },
                { value: '24', label: 'Countries' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card px-6 py-5">
                  <span className="block font-heading text-3xl font-medium text-primary">{stat.value}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-luxury text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-primary py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-gold/20 bg-gold/20 px-0 lg:grid-cols-2">
          <div className="bg-primary p-10 lg:p-14">
            <Eyebrow light>Vision</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground lg:text-3xl">
              To be the defining institution for service, hospitality, and
              protocol excellence in the Kingdom and the region.
            </p>
          </div>
          <div className="bg-primary p-10 lg:p-14">
            <Eyebrow light>Mission</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground lg:text-3xl">
              To develop Saudi professionals whose conduct meets global
              standards while honoring Saudi values \u2014 in every interaction,
              at every level.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Values"
            title="The principles behind every engagement"
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-8">
                <h3 className="font-heading text-xl font-medium text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-accent py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Journey"
            title="A measured path to becoming an institution"
          />
          <ol className="mt-14 border-l border-sand">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="reveal relative pb-12 pl-10 last:pb-0"
              >
                <span
                  className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-gold"
                  aria-hidden="true"
                />
                <span className="font-mono text-sm text-gold">
                  {item.year}
                </span>
                <h3 className="mt-2 font-heading text-2xl font-medium text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership philosophy */}
      <section className="relative isolate overflow-hidden">
        <img
          src="/images/executive-presence.png"
          alt="Composed Saudi executive embodying leadership presence"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-primary/85" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-3xl reveal">
            <Eyebrow light>Leadership Philosophy</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">
              We believe excellence is taught by example, sustained by culture,
              and proven in the moments that matter most.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
              Our faculty are practitioners \u2014 protocol officers,
              hospitality leaders, and diplomats who have operated at the
              highest levels. They teach not theory, but mastery earned in
              service to nations and institutions.
            </p>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </main>
  )
}
