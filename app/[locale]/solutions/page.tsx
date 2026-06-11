import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

const solutionImages: Record<string, string> = {
  'government-excellence': '/images/about-leadership.png',
  'military-protocol': '/images/ceremony.png',
  'executive-presence': '/images/executive-presence.png',
  'customer-experience': '/images/about-leadership.png',
  'hospitality-excellence': '/images/hospitality.png',
  'corporate-service-culture': '/images/hospitality.png',
  'international-protocol': '/images/ceremony.png',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('solutions')
  const tCommon = await getTranslations('common')

  const items = t.raw('items') as {
    id: string; number: string; title: string; summary: string;
    capabilities: string[]; outcome: string
  }[]

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/ceremony.png"
        imageAlt="Formal Saudi state ceremony"
      />

      <section className="bg-background">
        {items.map((solution, i) => (
          <div key={solution.id} id={solution.id} className="scroll-mt-24 border-b border-border">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
              <div className="reveal lg:col-span-5">
                <span className="font-mono text-sm text-gold">{solution.number}</span>
                <h2 className="mt-4 font-heading text-3xl font-medium text-primary sm:text-4xl">{solution.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{solution.summary}</p>
                <div className="mt-8 border-s-2 border-gold ps-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">{tCommon('outcome')}</p>
                  <p className="mt-2 text-base font-medium text-primary">{solution.outcome}</p>
                </div>
                <div className="mt-8 overflow-hidden border border-border">
                  <img src={solutionImages[solution.id] ?? '/images/about-leadership.png'} alt={solution.title} className="w-full aspect-[16/9] object-cover opacity-80" />
                </div>
              </div>
              <div className="reveal lg:col-span-6 lg:col-start-7">
                <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">{tCommon('coreCapabilities')}</p>
                <ul className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  {solution.capabilities.map((cap) => (
                    <li key={cap} className="bg-card px-6 py-5 text-sm font-medium text-primary">{cap}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ConsultationCTA />
    </main>
  )
}
