import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import { ProgramCatalog } from '@/components/programs/program-catalog'

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'EHP Academy programmes in diplomatic protocol, executive presence, military ceremonial, hospitality excellence, government service excellence, and customer experience design. Foundation to executive level.',
}

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Programmes"
        title="A premium curriculum for every level and every institution"
        intro="From one-day intensives to multi-day residential certifications, every EHP programme is designed with the rigour of executive education and the precision of institutional protocol."
        image="/images/about-leadership.png"
        imageAlt="EHP Academy programme delivery session"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 reveal">
            <SectionHeading
              eyebrow="Programme Catalogue"
              title="Select a programme to explore the curriculum"
              intro="Filter by level, category, or format. Every programme can be delivered on-site at your institution, customised to your context, and combined into a bespoke development pathway."
            />
          </div>
          <ProgramCatalog />
        </div>
      </section>

      {/* Delivery modes */}
      <section className="bg-accent/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="Delivery Modes"
              title="Designed to fit your institution"
            />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                mode: 'On-site',
                desc: 'Delivered at your institution by EHP faculty — fully customised to your environment, culture, and team.',
                image: '/images/about-leadership.png',
              },
              {
                mode: 'Residential',
                desc: 'Immersive multi-day programmes at our Riyadh facility, combining deep learning with peer interaction.',
                image: '/images/hospitality.png',
              },
              {
                mode: 'Workshop',
                desc: 'Focused half-day or full-day interventions targeting a specific skill, behaviour, or capability area.',
                image: '/images/ceremony.png',
              },
              {
                mode: 'Bespoke Pathway',
                desc: "A fully custom programme sequence designed around your organisation's mandate, culture, and ambition.",
                image: '/images/executive-presence.png',
              },
            ].map((item, i) => (
              <div
                key={item.mode}
                className="reveal flex flex-col bg-background"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[16/9] overflow-hidden bg-accent">
                  <img
                    src={item.image}
                    alt={item.mode}
                    className="size-full object-cover opacity-70"
                  />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <span className="font-mono text-xs text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-xl font-medium text-primary">
                    {item.mode}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        title="Build a custom development pathway for your institution"
        body="Our advisors will combine the right programmes into a coherent, sustained journey — aligned with your objectives and your people."
      />
    </main>
  )
}
