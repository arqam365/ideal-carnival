import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeCtaBanner() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-center gap-10 border border-border bg-card px-8 py-16 text-center lg:px-16">
          <span className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            Ready to elevate your institution?
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </span>
          <h2 className="max-w-3xl text-balance font-heading text-3xl font-medium text-primary sm:text-4xl lg:text-5xl">
            The organisations that lead Saudi Arabia&apos;s future start here.
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            From government ministries to global hotel brands, EHP Academy
            partners with the institutions that define how Saudi Arabia is
            experienced by the world. Begin with a consultation.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request Consultation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
