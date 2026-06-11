import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export async function ConsultationCTA({
  title,
  body,
}: {
  title?: string
  body?: string
}) {
  const t = await getTranslations('cta')
  const tCommon = await getTranslations('common')

  const displayTitle = title ?? t('defaultTitle')
  const displayBody = body ?? t('defaultBody')

  return (
    <section className="bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative isolate overflow-hidden border border-gold/30 bg-primary px-8 py-16 lg:px-16 lg:py-20">
          <img
            src="/images/executive-presence.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full object-cover opacity-15"
          />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="text-balance font-heading text-3xl font-medium leading-tight text-primary-foreground sm:text-4xl">
                {displayTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
                {displayBody}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-gold/90"
              >
                {tCommon('requestConsultation')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
