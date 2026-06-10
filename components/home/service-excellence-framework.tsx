import { SectionHeading } from '@/components/section-primitives'

const pillars = [
  {
    key: 'values',
    label: 'Values',
    desc: 'Rooted in Saudi identity, Islamic hospitality, and global professional standards.',
  },
  {
    key: 'behavior',
    label: 'Behavior',
    desc: 'Translating values into observable, repeatable professional conduct and presence.',
  },
  {
    key: 'experience',
    label: 'Experience',
    desc: 'Crafting interactions that are dignified, memorable, and consistently excellent.',
  },
  {
    key: 'trust',
    label: 'Trust',
    desc: 'Earning the confidence of guests, principals, and stakeholders through reliability.',
  },
  {
    key: 'excellence',
    label: 'Excellence',
    desc: 'A sustained institutional standard — not an event, but a way of operating.',
  },
]

export function ServiceExcellenceFramework() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          {/* Left: heading */}
          <div className="lg:w-[38%] lg:pt-2">
            <SectionHeading
              eyebrow="Proprietary Methodology"
              title="The Saudi Service Excellence Framework"
              intro="A structured model developed by EHP to build institutional excellence from the inside out — from organisational values through to the guest experience that the world sees."
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Every EHP engagement is anchored in this framework. It ensures
              that development is not superficial, but systemic — changing how
              institutions think, behave, and serve at every level.
            </p>
          </div>

          {/* Right: framework chain */}
          <div className="flex-1">
            <ol className="relative">
              {pillars.map((pillar, i) => (
                <li
                  key={pillar.key}
                  className="reveal relative flex gap-8 pb-10 last:pb-0"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Connector line */}
                  {i < pillars.length - 1 && (
                    <span
                      className="absolute left-[1.375rem] top-10 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  {/* Index bubble */}
                  <span className="relative flex size-11 shrink-0 items-center justify-center border border-gold/40 bg-background font-mono text-xs font-semibold text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-heading text-2xl font-medium text-primary">
                      {pillar.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pillar.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
