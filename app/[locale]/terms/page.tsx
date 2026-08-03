import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero } from '@/components/section-primitives'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.terms.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('legal.terms')

  return (
    <main>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-sm leading-relaxed text-muted-foreground">{t('placeholder')}</p>
        </div>
      </section>
    </main>
  )
}
