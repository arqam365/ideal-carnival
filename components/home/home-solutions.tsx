import { getTranslations } from 'next-intl/server'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-primitives'
import { Link } from '@/i18n/navigation'

export async function HomeSolutions() {
  const t = await getTranslations('home.solutions')
  const tSolutions = await getTranslations('solutions')

  type SolutionItem = { id: string; title: string; summary: string }
  const solutionItems = tSolutions.raw('items') as SolutionItem[]

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
          <Link
            href="/solutions"
            className="inline-flex shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
          >
            {t('allSolutions')} <ArrowUpRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-16 border-t border-border">
          {solutionItems.map((solution, i) => (
            <Link
              key={solution.id}
              href={`/solutions#${solution.id}` as any}
              className="reveal group flex items-start gap-6 border-b border-border py-8 transition-colors hover:border-gold/40 lg:items-center lg:gap-12 lg:py-10"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="w-10 shrink-0 font-mono text-xs text-gold/60 transition-colors group-hover:text-gold lg:w-14">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-12">
                <h3 className="font-heading text-xl font-medium text-primary transition-colors group-hover:text-gold lg:w-72 lg:shrink-0 lg:text-2xl">
                  {solution.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground lg:flex-1">
                  {solution.summary}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold rtl:rotate-180" />
            </Link>
          ))}

          <div className="reveal flex flex-col gap-3 border-b border-border py-8 lg:flex-row lg:items-center lg:gap-12 lg:py-10">
            <span className="w-10 shrink-0 lg:w-14" />
            <p className="font-heading text-lg text-primary lg:w-72 lg:shrink-0">{t('designedFor')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
            >
              {t('startConversation')} <ArrowUpRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
