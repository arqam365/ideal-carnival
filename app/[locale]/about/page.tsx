import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  const values = t.raw('values.items') as { title: string; body: string }[]
  const timeline = t.raw('timeline.items') as { year: string; title: string; body: string }[]
  const stats = t.raw('story.stats') as { value: string; label: string }[]

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/about-leadership.png"
        imageAlt="Executive leadership meeting at EHP Academy"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal space-y-10 lg:col-span-5">
            <SectionHeading eyebrow={t('story.eyebrow')} title={t('story.title')} />
            <div className="overflow-hidden border border-border">
              <img src="/images/about-leadership.png" alt="EHP Academy leadership" className="w-full object-cover aspect-[4/3]" />
            </div>
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-4">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
            <p>{t('story.p3')}</p>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card px-6 py-5">
                  <span className="block font-heading text-3xl font-medium text-primary">{stat.value}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-luxury text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-gold/20 bg-gold/20 px-0 lg:grid-cols-2">
          <div className="bg-primary p-10 lg:p-14">
            <Eyebrow light>{t('vision.eyebrow')}</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground lg:text-3xl">{t('vision.text')}</p>
          </div>
          <div className="bg-primary p-10 lg:p-14">
            <Eyebrow light>{t('mission.eyebrow')}</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground lg:text-3xl">{t('mission.text')}</p>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow={t('values.eyebrow')} title={t('values.title')} />
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-8">
                <h3 className="font-heading text-xl font-medium text-primary">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow={t('timeline.eyebrow')} title={t('timeline.title')} />
          <ol className="mt-14 border-s border-sand">
            {timeline.map((item) => (
              <li key={item.year} className="reveal relative pb-12 ps-10 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 size-3 rounded-full bg-gold" aria-hidden="true" />
                <span className="font-mono text-sm text-gold">{item.year}</span>
                <h3 className="mt-2 font-heading text-2xl font-medium text-primary">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src="/images/executive-presence.png" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-primary/85" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-3xl reveal">
            <Eyebrow light>{t('leadership.eyebrow')}</Eyebrow>
            <p className="mt-6 font-heading text-2xl leading-snug text-primary-foreground sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">{t('leadership.quote')}</p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/70">{t('leadership.body')}</p>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </main>
  )
}
