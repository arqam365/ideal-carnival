import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Building2, BookOpen, User, CalendarCheck } from 'lucide-react'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ContactForm } from '@/components/contact/contact-form'

const icons = [Building2, BookOpen, User, CalendarCheck]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  const enquiryTypes = t.raw('enquiryTypes') as { label: string; body: string }[]

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/executive-presence.png"
        imageAlt="EHP Academy advisory consultation"
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading eyebrow={t('howEyebrow')} title={t('howTitle')} intro={t('howIntro')} />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryTypes.map((type, i) => {
              const Icon = icons[i]
              return (
                <div key={type.label} className="reveal flex flex-col gap-5 bg-card p-8" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-gold" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-muted-foreground/50">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-heading text-xl font-medium text-primary">{type.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{type.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <SectionHeading eyebrow={t('formEyebrow')} title={t('formTitle')} intro={t('formIntro')} />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="reveal space-y-10 pt-2">
                <div>
                  <Eyebrow>{t('officeEyebrow')}</Eyebrow>
                  <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-muted-foreground">
                    <p className="font-medium text-foreground">{t('institutionName')}</p>
                    <p>{t('addressLine1')}</p>
                    <p>{t('addressLine2')}</p>
                  </address>
                </div>
                <div className="border-t border-border pt-10">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">{t('directContact')}</p>
                  <div className="mt-5 space-y-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-muted-foreground/70">{t('enquiries')}</p>
                      <a href="mailto:engage@ehpacademy.sa" className="mt-1 block font-medium text-primary transition-colors hover:text-gold">engage@ehpacademy.sa</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-muted-foreground/70">{t('telephone')}</p>
                      <a href="tel:+966112000000" className="mt-1 block font-medium text-primary transition-colors hover:text-gold">+966 11 200 0000</a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-10">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">{t('discretionTitle')}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t('discretionBody')}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
