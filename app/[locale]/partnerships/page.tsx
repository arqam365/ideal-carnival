import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import { Link } from '@/i18n/navigation'

type PartnerProfile = { number: string; title: string; body: string }
const partnerProfiles: PartnerProfile[] = [
  { number: '01', title: 'Hospitality Schools', body: 'Accredited hotel management and hospitality institutions offering internationally recognised certifications that we can deliver to Saudi graduates and working professionals.' },
  { number: '02', title: 'Protocol & Diplomatic Bodies', body: 'International protocol academies and diplomatic training institutes whose curriculum standards elevate and validate our programme delivery.' },
  { number: '03', title: 'Professional Certification Bodies', body: 'Accreditation organisations in customer experience, service design, and executive presence — enabling us to offer co-branded qualifications with international currency.' },
  { number: '04', title: 'Executive Education Providers', body: 'Business schools and leadership development institutions bringing management excellence benchmarks to our senior faculty and executive programmes.' },
  { number: '05', title: 'Research & Standards Bodies', body: 'Institutions engaged in service excellence research, protocol standards development, and professional practice frameworks relevant to the Gulf context.' },
  { number: '06', title: 'Luxury Service Institutes', body: 'Recognised centres of excellence in five-star hospitality, VIP service, and luxury guest experience whose standards we embed in our hospitality programmes.' },
]

type WhatWeOffer = { title: string; body: string }
const whatWeOffer: WhatWeOffer[] = [
  { title: 'Saudi Market Access', body: 'Direct access to government ministries, defense commands, leading hospitality groups, and major Saudi enterprises — through institutional relationships built over years of delivery.' },
  { title: 'Vision 2030 Alignment', body: 'Every programme we develop is anchored in Saudi Arabia\'s national transformation agenda — giving international partners direct relevance to one of the world\'s most ambitious development programmes.' },
  { title: 'Operational Bridge', body: 'We serve as your cultural and operational bridge into the Saudi market — handling curriculum adaptation, Arabic delivery, institutional engagement, and logistical coordination on your behalf.' },
  { title: 'Prestige Co-branding', body: 'Association with a serious, government-adjacent Saudi institution that carries credibility in the professional, public sector, and luxury hospitality communities of the Kingdom.' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partnerships.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function PartnershipsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('partnerships')
  const tCommon = await getTranslations('common')

  return (
    <main>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} image="/images/ceremony.png" imageAlt="Formal institutional partnership ceremony" />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal lg:col-span-5">
            <SectionHeading eyebrow={t('whyEyebrow')} title={t('whyTitle')} />
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7">
            <p>{t('whyP1')}</p>
            <p>{t('whyP2')}</p>
            <p>{t('whyP3')}</p>
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading eyebrow={t('partnersEyebrow')} title={t('partnersTitle')} intro={t('partnersIntro')} />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {partnerProfiles.map((profile, i) => (
              <div key={profile.number} className="reveal flex flex-col bg-card p-8 lg:p-10" style={{ transitionDelay: `${i * 30}ms` }}>
                <span className="font-mono text-xs text-gold">{profile.number}</span>
                <h3 className="mt-4 font-heading text-xl font-medium text-primary">{profile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading light eyebrow={t('benefitsEyebrow')} title={t('benefitsTitle')} />
          </div>
          <div className="grid gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-2">
            {whatWeOffer.map((item, i) => (
              <div key={item.title} className="reveal bg-primary p-8 lg:p-10" style={{ transitionDelay: `${i * 30}ms` }}>
                <h3 className="font-heading text-2xl font-medium text-primary-foreground">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative isolate overflow-hidden border border-sand bg-accent px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="reveal lg:col-span-8">
                <Eyebrow>{t('inquiryEyebrow')}</Eyebrow>
                <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-tight text-primary sm:text-4xl">{t('inquiryTitle')}</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('inquiryBody')}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">
                  {tCommon('startConversation')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA title={t('ctaTitle')} body={t('ctaBody')} />
    </main>
  )
}
