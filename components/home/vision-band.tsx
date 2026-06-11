import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/section-primitives'
import { Link } from '@/i18n/navigation'

export async function VisionBand() {
  const t = await getTranslations('home.vision')

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/images/hospitality.png"
        alt="Saudi hospitality service with traditional Arabic coffee"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-primary/85" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="reveal lg:col-span-7">
          <Eyebrow light>{t('eyebrow')}</Eyebrow>
          <blockquote className="mt-6 font-heading text-2xl font-medium leading-snug text-primary-foreground sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">
            &ldquo;{t('title')}&rdquo;
          </blockquote>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            {t('body')}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
