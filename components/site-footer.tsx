'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Wordmark } from '@/components/wordmark'

export function SiteFooter() {
  const t = useTranslations('footer')
  const tSolutions = useTranslations('solutions')
  const tIndustries = useTranslations('industries')

  type SolutionItem = { id: string; title: string }
  type IndustryItem = { id: string; label: string }

  const solutionItems = (tSolutions.raw('items') as SolutionItem[]).slice(0, 6).map((s) => ({
    label: s.title,
    href: `/solutions#${s.id}` as const,
  }))
  const industryItems = (tIndustries.raw('items') as IndustryItem[]).slice(0, 6).map((ind) => ({
    label: ind.label,
    href: `/industries#${ind.id}` as const,
  }))

  const company = [
    { label: t('aboutEhp'), href: '/about' as const },
    { label: t('programs'), href: '/programs' as const },
    { label: t('faculty'), href: '/faculty' as const },
    { label: t('partnerships'), href: '/partnerships' as const },
    { label: t('caseStudies'), href: '/case-studies' as const },
    { label: t('insights'), href: '/insights' as const },
    { label: t('contact'), href: '/contact' as const },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 border-b border-gold/15 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark className="text-primary-foreground" showTagline />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              {t('tagline')}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border border-gold bg-gold px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              {t('requestConsultation')}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title={t('solutions')} items={solutionItems} />
            <FooterColumn title={t('industries')} items={industryItems} />
            <FooterColumn title={t('institution')} items={company} />
            <div>
              <h4 className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                {t('riyadh')}
              </h4>
              <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-primary-foreground/60">
                <p>{t('address')}</p>
                <p>
                  <a href="mailto:engage@ehpacademy.sa" className="hover:text-gold">{t('email')}</a>
                </p>
                <p>
                  <a href="tel:+966112000000" className="hover:text-gold">{t('phone')}</a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-primary-foreground/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
          <p className="uppercase tracking-luxury">{t('vision2030')}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">{title}</h4>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Link
              href={item.href as any}
              className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
