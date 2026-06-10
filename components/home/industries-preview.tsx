import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-primitives'
import { industries } from '@/lib/site-data'

export function IndustriesPreview() {
  return (
    <section className="bg-accent/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Sectors We Serve"
            title="Deep sector expertise across the Kingdom"
            intro="EHP designs and delivers capability programmes for every institution that serves people. Our experience spans the full breadth of Saudi Arabia's transformation."
          />
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary transition-colors hover:text-gold"
          >
            All Industries <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          {industries.map((industry, i) => (
            <Link
              key={industry.href}
              href={industry.href}
              className="reveal group inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              style={{ transitionDelay: `${(i % 5) * 50}ms` }}
            >
              {industry.label}
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
