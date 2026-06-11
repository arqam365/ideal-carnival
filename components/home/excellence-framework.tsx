import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/components/section-primitives'

export async function ExcellenceFramework() {
  const t = await getTranslations('home.excellence')

  type Pillar = { key: string; label: string; title: string; body: string }
  const pillars = t.raw('pillars') as Pillar[]

  return (
    <section className="relative overflow-hidden bg-accent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow={t('eyebrow')}
          title={t('title')}
        />

        <div className="mt-16">
          <div className="grid gap-px overflow-hidden border border-sand bg-sand grid-cols-1 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <div
                key={p.key}
                className="reveal flex flex-col gap-4 bg-background p-8 lg:p-10"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-heading text-4xl text-gold">{p.label}</span>
                <h3 className="font-heading text-xl font-medium text-primary">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
