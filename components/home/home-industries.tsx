import { getTranslations } from 'next-intl/server'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-primitives'
import { Link } from '@/i18n/navigation'

export async function HomeIndustries() {
  const t = await getTranslations('home.industries')
  const tInd = await getTranslations('industries')

  type IndustryItem = { id: string; label: string }
  const industryItems = tInd.raw('items') as IndustryItem[]

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            intro={t('intro')}
          />
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
          >
            {t('explore')} <ArrowUpRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          {industryItems.map((industry) => (
            <Link
              key={industry.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={`/industries#${industry.id}` as any}
              className="border border-border bg-card px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-gold hover:bg-primary hover:text-primary-foreground"
            >
              {industry.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
