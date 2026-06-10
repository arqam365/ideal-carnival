import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/section-primitives'

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-primary">
      <img
        src="/images/hero-protocol.png"
        alt="EHP Academy diplomatic reception hall with hospitality staff in formal poise"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/80 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          <Eyebrow light>House of Etiquette, Hospitality &amp; Protocol</Eyebrow>
          <h1 className="mt-6 text-balance font-heading text-4xl font-medium leading-[1.05] text-primary-foreground sm:text-5xl lg:text-[4.25rem]">
            Developing Saudi Arabia&apos;s Next Generation of Service Leaders
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/75">
            Global standards. Saudi values. Exceptional service. An executive
            institution shaping how the Kingdom is represented &mdash; in
            government, defense, hospitality, and on the world stage.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-gold/90"
            >
              Request Consultation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
