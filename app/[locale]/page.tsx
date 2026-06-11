import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
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
