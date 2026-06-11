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
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            intro={t('intro')}
          />
          <Link
            href="/solutions"
            className="inline-flex shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
          >
            {t('allSolutions')} <ArrowUpRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {solutionItems.map((solution, i) => (
            <Link
              key={solution.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={`/solutions#${solution.id}` as any}
              className="reveal group flex min-h-[14rem] flex-col justify-between bg-card p-8 transition-colors hover:bg-primary"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-heading text-2xl font-medium text-primary transition-colors group-hover:text-primary-foreground">
                  {solution.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70 line-clamp-3">
                  {solution.summary}
                </p>
              </div>
            </Link>
          ))}
          <div className="flex min-h-[14rem] flex-col justify-center gap-4 bg-primary p-8">
            <p className="font-heading text-xl text-primary-foreground">{t('designedFor')}</p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
            >
              {t('startConversation')} <ArrowUpRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
