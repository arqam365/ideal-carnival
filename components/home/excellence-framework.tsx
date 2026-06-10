import { SectionHeading } from '@/components/section-primitives'

const pillars = [
  {
    step: 'I',
    title: 'Values',
    body: 'Rooted in Saudi generosity, honor, and respect \u2014 the cultural foundation of authentic service.',
  },
  {
    step: 'II',
    title: 'Behavior',
    body: 'Values translated into observable, repeatable conduct that meets international protocol standards.',
  },
  {
    step: 'III',
    title: 'Experience',
    body: 'Behavior orchestrated into seamless, dignified journeys at every point of contact.',
  },
  {
    step: 'IV',
    title: 'Trust',
    body: 'Consistent experience builds the confidence of citizens, guests, and global partners.',
  },
  {
    step: 'V',
    title: 'Excellence',
    body: 'Trust compounded over time becomes reputation \u2014 the hallmark of a leading institution.',
  },
]

export function ExcellenceFramework() {
  return (
    <section className="relative overflow-hidden bg-accent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Our Methodology"
          title="The Saudi Service Excellence Framework"
          intro="A proprietary progression that turns cultural values into world-class, measurable excellence. Every EHP engagement is built on these five stages."
        />

        <div className="mt-16">
          <div className="grid gap-px overflow-hidden border border-sand bg-sand md:grid-cols-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="reveal flex flex-col gap-4 bg-background p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-heading text-3xl text-gold">
                  {p.step}
                </span>
                <h3 className="font-heading text-xl font-medium text-primary">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-luxury text-muted-foreground">
            Values &rarr; Behavior &rarr; Experience &rarr; Trust &rarr;
            Excellence
          </p>
        </div>
      </div>
    </section>
  )
}
