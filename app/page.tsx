import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  description:
    'EHP Academy develops Saudi Arabia\u2019s next generation of service leaders. Executive education in protocol, etiquette, hospitality, government and military excellence. Global standards, Saudi values.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'EHP Academy',
  alternateName: 'House of Etiquette, Hospitality & Protocol',
  description:
    'Saudi Arabia-based executive education institution specializing in protocol, etiquette, hospitality excellence, customer experience, military protocol, and government excellence.',
  url: 'https://ehpacademy.sa',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
  areaServed: 'Saudi Arabia',
  sameAs: [],
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomeHero />
      <TrustBar />
      <PartnersStrip />
      <HomeSolutions />
      <ProtocolInPractice />
      <ExcellenceFramework />
      <VisionBand />
      <HomeIndustries />
      <ImpactStats />
      <ConsultationCTA />
    </main>
  )
}
