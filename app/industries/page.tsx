import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import {
  IndustryExplorer,
  type IndustryDetail,
} from '@/components/industries/industry-explorer'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'EHP Academy serves government, defense, hospitality, tourism, airports, aviation, healthcare, education, financial services, and luxury retail with sector-specific protocol and service excellence.',
}

const industries: IndustryDetail[] = [
  {
    id: 'government',
    label: 'Government',
    challenge:
      'Public institutions face rising citizen expectations and high-profile official engagements that demand consistency.',
    solution:
      'We standardize reception protocol, citizen experience, and official conduct across departments.',
    outcome:
      'Trusted, dignified public service that strengthens institutional credibility.',
  },
  {
    id: 'defense',
    label: 'Defense',
    challenge:
      'Ceremonial occasions and visiting delegations require absolute precision and command-level discipline.',
    solution:
      'Military protocol programs covering honors, precedence, and ceremonial sequencing.',
    outcome: 'Flawless ceremonies that honor national significance.',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    challenge:
      'Luxury properties must deliver globally benchmarked service while expressing authentic Saudi warmth.',
    solution:
      'Five-star service standards blended with cultural hosting traditions.',
    outcome: 'Distinctive hospitality that earns loyalty and reputation.',
  },
  {
    id: 'tourism',
    label: 'Tourism',
    challenge:
      'A fast-growing sector needs a service workforce ready to represent the Kingdom to the world.',
    solution:
      'Scalable service-culture and guest-experience programs for destinations and operators.',
    outcome: 'Memorable visitor experiences that build destination equity.',
  },
  {
    id: 'airports',
    label: 'Airports',
    challenge:
      'High-volume environments must balance efficiency with VIP and protocol handling.',
    solution:
      'Passenger experience design and VIP/protocol lounge service standards.',
    outcome: 'Seamless journeys with elevated treatment where it matters.',
  },
  {
    id: 'aviation',
    label: 'Aviation',
    challenge:
      'Cabin and ground teams represent the brand at every altitude and touchpoint.',
    solution:
      'In-flight service excellence and premium-cabin etiquette programs.',
    outcome: 'A signature onboard experience worthy of the national carrier.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    challenge:
      'Patient dignity and compassionate communication are as vital as clinical care.',
    solution:
      'Patient-experience and compassionate-service conduct programs.',
    outcome: 'Care environments where patients feel respected and reassured.',
  },
  {
    id: 'education',
    label: 'Education',
    challenge:
      'Institutions shape future leaders and must model professional conduct.',
    solution:
      'Etiquette, presence, and service-leadership curricula for faculty and students.',
    outcome: 'Graduates who carry themselves with confidence and grace.',
  },
  {
    id: 'financial-services',
    label: 'Financial Services',
    challenge:
      'Client trust is built on discretion, composure, and impeccable conduct.',
    solution:
      'Executive presence and high-net-worth client relationship etiquette.',
    outcome: 'Advisor relationships defined by trust and professionalism.',
  },
  {
    id: 'luxury-retail',
    label: 'Luxury Retail',
    challenge:
      'Discerning clients expect a service ritual that matches the brand promise.',
    solution:
      'Clienteling, VIP service, and luxury-floor etiquette programs.',
    outcome: 'Boutique experiences that convert clients into patrons.',
  },
]

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title="Tailored to the realities of every sector we serve"
        intro="Protocol and service excellence look different in a ministry, an airport, and a hospital. Explore how EHP adapts to the challenges of each sector."
        image="/images/hospitality.png"
        imageAlt="Luxury hospitality service in Saudi Arabia"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Sector Experience"
            title="Select a sector to explore the engagement"
            intro="Each sector presents distinct challenges. Our approach is always tailored — here is how the work translates across industries."
            className="mb-14"
          />
          <IndustryExplorer industries={industries} />
        </div>
      </section>

      <ConsultationCTA />
    </main>
  )
}
