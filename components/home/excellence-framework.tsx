import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/components/section-primitives'

export async function ExcellenceFramework() {
  const t = await getTranslations('home.excellence')

  type Pillar = { key: string; label: string; title: string; body: string }
  const pillars = t.raw('pillars') as Pillar[]

  return (
    <section className="relative overflow-hidden bg-accent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading align="center" eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-0">
          {pillars.map((p, i) => (
            <div
              key={p.key}
              className="reveal sm:px-10 sm:first:pl-0 sm:last:pr-0"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="mb-8 h-px w-10 bg-gold" aria-hidden="true" />
              <span className="font-heading text-4xl font-medium text-gold/30 sm:text-5xl lg:text-6xl">{p.label}</span>
              <h3 className="mt-4 font-heading text-xl font-medium text-primary">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
