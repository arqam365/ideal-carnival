import type { Metadata } from 'next'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'Partnerships',
  description:
    'EHP Academy partners with leading international hospitality schools, protocol bodies, and certification institutes to deliver globally benchmarked standards in Saudi Arabia.',
}

type Partner = {
  category: string
  name: string
  location: string
  relationship: string
}

const partners: Partner[] = [
  {
    category: 'Hospitality Education',
    name: 'École Hôtelière de Lausanne (EHL)',
    location: 'Lausanne, Switzerland',
    relationship: 'Curriculum benchmarking and faculty exchange for hospitality excellence programmes.',
  },
  {
    category: 'Protocol & Diplomacy',
    name: 'Diplomatic Academy of Vienna',
    location: 'Vienna, Austria',
    relationship: 'Certification alignment and resource sharing for diplomatic protocol programmes.',
  },
  {
    category: 'Certification',
    name: 'Customer Experience Professionals Association (CXPA)',
    location: 'International',
    relationship: 'Aligned accreditation pathway for EHP Customer Experience programmes.',
  },
  {
    category: 'Luxury Service',
    name: 'Leading Hotels of the World — Service Academy',
    location: 'New York / Global',
    relationship: 'Delivery of internationally recognised hospitality standards and certification.',
  },
  {
    category: 'Professional Development',
    name: 'Association of Image Consultants International (AICI)',
    location: 'International',
    relationship: 'Accreditation for executive presence and professional image faculty.',
  },
  {
    category: 'Government Excellence',
    name: 'Mohammed bin Salman College of Business & Entrepreneurship',
    location: 'NEOM, Saudi Arabia',
    relationship: 'Collaborative research on public sector service transformation and leadership.',
  },
]

const partnerBenefits = [
  {
    title: 'Shared Standards',
    body: 'Access to internationally benchmarked curriculum frameworks and delivery standards that elevate the credibility of every EHP programme.',
  },
  {
    title: 'Faculty Exchange',
    body: 'Collaborative faculty arrangements that bring world-class expertise directly into Saudi Arabia and build lasting institutional relationships.',
  },
  {
    title: 'Joint Certification',
    body: 'Co-branded certification pathways that hold value in international professional communities and government institutions.',
  },
  {
    title: 'Research Collaboration',
    body: 'Shared research initiatives on service excellence, protocol evolution, and hospitality standards in the Arabian context.',
  },
]

export default function PartnershipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships"
        title="Global standards, delivered through trusted institutional alliances"
        intro="EHP does not operate in isolation. We build enduring partnerships with the world's leading institutions in hospitality, protocol, and executive education to ensure our programmes carry international authority."
        image="/images/ceremony.png"
        imageAlt="Formal institutional partnership ceremony"
      />

      {/* Partnership philosophy */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal lg:col-span-5">
            <SectionHeading
              eyebrow="Why We Partner"
              title="Excellence has no single origin"
            />
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7">
            <p>
              Saudi Arabia's ambition is global. The institutions and
              professionals we develop will be measured against international
              standards — by foreign heads of state, international partners, and
              global guests. Our responsibility is to ensure those standards are
              embedded in every programme we deliver.
            </p>
            <p>
              Our partnerships are carefully curated to bring the world's most
              credible hospitality, protocol, and executive education institutions
              into collaborative relationship with EHP. Every alliance is chosen
              for its direct relevance to the Saudi context and Vision 2030
              ambitions.
            </p>
            <p>
              We do not collect logos. We build working partnerships that enrich
              our curriculum, validate our faculty, and strengthen the
              credentials of every participant we develop.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-accent/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="Our Partners"
              title="Institutions that shape global standards"
            />
          </div>

          <div className="space-y-px overflow-hidden border border-border">
            {partners.map((partner, i) => (
              <div
                key={partner.name}
                className="reveal grid gap-6 bg-card p-8 lg:grid-cols-12 lg:gap-10 lg:p-10"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="lg:col-span-4">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-luxury text-gold">
                    {partner.category}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-medium text-primary">
                    {partner.name}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-luxury text-muted-foreground">
                    {partner.location}
                  </p>
                </div>
                <div className="flex items-center lg:col-span-8">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {partner.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner benefits */}
      <section className="bg-primary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              light
              eyebrow="What Partnerships Deliver"
              title="The value of international alliance"
            />
          </div>
          <div className="grid gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-2">
            {partnerBenefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="reveal bg-primary p-8 lg:p-10"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3 className="font-heading text-2xl font-medium text-primary-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership enquiry */}
      <section className="bg-background py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative isolate overflow-hidden border border-sand bg-accent px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="reveal lg:col-span-8">
                <Eyebrow>Institutional Partnership</Eyebrow>
                <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-tight text-primary sm:text-4xl">
                  Interested in a strategic alliance with EHP?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  We welcome conversations with international institutions
                  whose expertise aligns with our mission. All partnership
                  discussions begin with a confidential conversation.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                >
                  Start the Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA
        title="Strengthen your institution through EHP"
        body="Whether you are a government authority, a hospitality group, or an international institution, there may be a meaningful role for partnership with EHP Academy."
      />
    </main>
  )
}
