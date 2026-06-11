import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import { ProgramCatalog } from '@/components/programs/program-catalog'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'programs.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('programs')

  const modes = t.raw('modes') as { mode: string; desc: string }[]
  const modeImages = ['/images/about-leadership.png', '/images/hospitality.png', '/images/ceremony.png', '/images/executive-presence.png']

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/about-leadership.png"
        imageAlt="EHP Academy programme delivery session"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 reveal">
            <SectionHeading eyebrow={t('catalogEyebrow')} title={t('catalogTitle')} intro={t('catalogIntro')} />
          </div>
          <ProgramCatalog />
        </div>
      </section>

      <section className="bg-accent/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading eyebrow={t('deliveryEyebrow')} title={t('deliveryTitle')} />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((item, i) => (
              <div key={item.mode} className="reveal flex flex-col bg-background" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="aspect-[16/9] overflow-hidden bg-accent">
                  <img src={modeImages[i]} alt={item.mode} className="size-full object-cover opacity-70" />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-xl font-medium text-primary">{item.mode}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA title={t('ctaTitle')} body={t('ctaBody')} />
    </main>
  )
}
