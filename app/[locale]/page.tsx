import { useTranslations } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  return { title: t('title'), description: t('description') }
}
import { HomeHero } from '@/components/home/home-hero'
import { TrustBar } from '@/components/home/trust-bar'
import { PartnersStrip } from '@/components/partners-strip'
import { HomeSolutions } from '@/components/home/home-solutions'
import { ProtocolInPractice } from '@/components/home/protocol-in-practice'
import { ExcellenceFramework } from '@/components/home/excellence-framework'
import { VisionBand } from '@/components/home/vision-band'
import { HomeIndustries } from '@/components/home/home-industries'
import { ImpactStats } from '@/components/home/impact-stats'
import { ConsultationCTA } from '@/components/consultation-cta'
import { Reveal } from '@/components/reveal'

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'EHP Academy',
  alternateName: 'House of Etiquette, Hospitality & Protocol',
  url: 'https://ehpacademy.com',
  logo: 'https://ehpacademy.com/ehp-logo.png',
  description: 'EHP Academy develops Saudi Arabia\'s next generation of service leaders through executive education in protocol, etiquette, and hospitality excellence.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SA',
  },
  email: 'info@ehpacademy.com',
  foundingDate: '2026',
  areaServed: 'SA',
  educationalCredentialAwarded: 'Diploma',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeHero />
      <Reveal><TrustBar /></Reveal>
      <Reveal><PartnersStrip /></Reveal>
      <Reveal><HomeSolutions /></Reveal>
      <Reveal><ProtocolInPractice /></Reveal>
      <Reveal><ExcellenceFramework /></Reveal>
      <Reveal><VisionBand /></Reveal>
      <Reveal><HomeIndustries /></Reveal>
      <Reveal><ImpactStats /></Reveal>
      <Reveal><ConsultationCTA /></Reveal>
    </main>
  )
}
