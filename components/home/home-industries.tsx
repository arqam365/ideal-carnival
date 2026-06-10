import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-primitives'
import { industries } from '@/lib/site-data'

export function HomeIndustries() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Sectors We Serve"
            title="Trusted across the institutions that represent the Kingdom"
            intro="From government and defense to aviation, healthcare, and luxury retail, our programs are tailored to the protocol realities of each sector."
          />
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
          >
            Explore Industries <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          {industries.map((industry) => (
            <Link
              key={industry.href}
              href={industry.href}
              className="border border-border bg-card px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-gold hover:bg-primary hover:text-primary-foreground"
            >
              {industry.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
