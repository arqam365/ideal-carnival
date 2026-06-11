import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import { IndustryExplorer } from '@/components/industries/industry-explorer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industries.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('industries')

  const items = t.raw('items') as {
    id: string; label: string; challenge: string; solution: string; outcome: string
  }[]

  const labels = {
    challenge: t('challengeLabel'),
    solution: t('solutionLabel'),
    outcome: t('outcomeLabel'),
  }

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/hospitality.png"
        imageAlt="Luxury hospitality service in Saudi Arabia"
      />
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow={t('sectionEyebrow')}
            title={t('sectionTitle')}
            intro={t('sectionIntro')}
            className="mb-14"
          />
          <IndustryExplorer industries={items} labels={labels} />
        </div>
      </section>
      <ConsultationCTA />
    </main>
  )
}
