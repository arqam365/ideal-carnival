import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Thought leadership from EHP Academy on protocol, hospitality excellence, executive presence, and service leadership — for government, defense, hospitality, and corporate institutions.',
}

const categoryImages: Record<string, string> = {
  'Diplomatic Protocol': '/images/ceremony.png',
  'Government Excellence': '/images/about-leadership.png',
  'Executive Presence': '/images/executive-presence.png',
  'Military Protocol': '/images/hero-protocol.png',
  'Hospitality Excellence': '/images/hospitality.png',
  'VIP Relations': '/images/hospitality.png',
}

type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  featured?: boolean
}

const articles: Article[] = [
  {
    slug: 'protocol-soft-power',
    category: 'Diplomatic Protocol',
    title: 'Protocol is not ceremony — it is soft power',
    excerpt:
      'How a nation conducts a state visit signals its values to the world more durably than any communiqué. The discipline of protocol is, at its core, a discipline of strategic communication.',
    readTime: '6 min read',
    date: 'April 2025',
    featured: true,
  },
  {
    slug: 'vision-2030-service-imperative',
    category: 'Government Excellence',
    title: 'Vision 2030 and the service imperative: Why conduct is a national competency',
    excerpt:
      'As Saudi Arabia positions itself as a global destination for business, tourism, and diplomacy, the quality of human interaction becomes a strategic variable — not a soft skill.',
    readTime: '8 min read',
    date: 'March 2025',
  },
  {
    slug: 'executive-presence-misunderstood',
    category: 'Executive Presence',
    title: 'Executive presence is misunderstood — and that is why it is rarely developed',
    excerpt:
      'Most organisations mistake confidence for presence, and appearance for authority. The truth is more nuanced, more teachable, and more consequential than is commonly understood.',
    readTime: '5 min read',
    date: 'February 2025',
  },
  {
    slug: 'military-protocol-global-stage',
    category: 'Military Protocol',
    title: 'Saudi defense on the global stage: The case for ceremonial precision',
    excerpt:
      'When foreign military delegations visit the Kingdom, the quality of their ceremonial reception is observed and remembered. It reflects command culture more than any formal statement.',
    readTime: '7 min read',
    date: 'January 2025',
  },
  {
    slug: 'hospitality-culture-not-training',
    category: 'Hospitality Excellence',
    title: 'Hospitality excellence is a culture, not a training outcome',
    excerpt:
      'You cannot train your way to a five-star service culture in a week. Culture is built over time, through leadership role-modeling, consistent reinforcement, and the patient refinement of behaviour.',
    readTime: '6 min read',
    date: 'December 2024',
  },
  {
    slug: 'vip-guest-management-principles',
    category: 'VIP Relations',
    title: 'Six principles for managing high-consequence guests without error',
    excerpt:
      'When there is no margin for error, preparation is not enough. The highest standard of VIP guest management requires a specific mindset — anticipatory, discrete, and composed.',
    readTime: '5 min read',
    date: 'November 2024',
  },
  {
    slug: 'dining-as-diplomacy',
    category: 'Diplomatic Protocol',
    title: 'The formal table as a diplomatic instrument',
    excerpt:
      'Who sits where, who is served first, how a conversation is steered — formal dining is one of the oldest and most reliable mechanisms for managing relationships between institutions.',
    readTime: '6 min read',
    date: 'October 2024',
  },
  {
    slug: 'customer-experience-public-sector',
    category: 'Government Excellence',
    title: 'Citizen experience is not a private sector concept',
    excerpt:
      'Saudi Arabia\'s public sector is being challenged to operate with the service consciousness of the best private institutions. Understanding why that shift matters is the first step toward making it happen.',
    readTime: '7 min read',
    date: 'September 2024',
  },
]

const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))]

export default function InsightsPage() {
  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Thought leadership on service, protocol, and institutional excellence"
        intro="EHP faculty and advisors publish perspectives on the disciplines that define how organisations represent themselves — drawing on decades of practice at the highest levels."
        image="/images/about-leadership.png"
        imageAlt="EHP Academy thought leadership"
      />

      {/* Featured article */}
      {featured && (
        <section className="bg-primary py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                  Featured — {featured.category}
                </span>
                <h2 className="mt-5 text-pretty font-heading text-3xl font-medium text-primary-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <span className="text-xs uppercase tracking-luxury text-primary-foreground/50">
                    {featured.date}
                  </span>
                  <span className="h-3 w-px bg-primary-foreground/20" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-luxury text-primary-foreground/50">
                    {featured.readTime}
                  </span>
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 border border-gold/40 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold/80">
                    Available in print — Request a copy via consultation
                  </span>
                </div>
              </div>
              <div className="hidden overflow-hidden border border-gold/20 lg:col-span-5 lg:block">
                <img
                  src="/images/insights-feature.png"
                  alt="Protocol and soft power"
                  className="size-full object-cover opacity-70"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="All Perspectives"
              title="From the EHP faculty"
            />
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <article
                key={article.slug}
                className="reveal flex flex-col bg-card"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-accent">
                  <img
                    src={categoryImages[article.category] ?? '/images/about-leadership.png'}
                    alt={article.title}
                    className="size-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-4 text-[0.65rem] font-semibold uppercase tracking-luxury text-gold">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-heading text-xl font-medium text-primary leading-[1.25] flex-1">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-luxury text-muted-foreground/70">
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-accent/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10">
            <Eyebrow>Topics We Cover</Eyebrow>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {categories.slice(1).map((cat) => (
              <div
                key={cat}
                className="reveal flex flex-col gap-3 bg-card p-5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-accent">
                  <img
                    src={categoryImages[cat] ?? '/images/about-leadership.png'}
                    alt={cat}
                    className="size-full object-cover opacity-60"
                  />
                </div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-luxury text-primary leading-tight">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe / contact to receive */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal relative isolate overflow-hidden border border-sand bg-accent px-8 py-14 lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow>EHP Intelligence Briefing</Eyebrow>
                <h2 className="mt-5 font-heading text-2xl font-medium text-primary sm:text-3xl">
                  Receive EHP perspectives directly
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Senior leaders engaged with EHP receive our quarterly
                  Intelligence Briefing — in-depth perspectives on protocol,
                  service excellence, and institutional representation. Available
                  exclusively to consultation enquirers and programme alumni.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 border border-primary bg-primary px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                >
                  Request Access
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA
        title="Engage the institution that thinks deeply about excellence"
        body="These perspectives emerge from practice, not research alone. Speak to our advisors about how they apply to your institution."
      />
    </main>
  )
}
