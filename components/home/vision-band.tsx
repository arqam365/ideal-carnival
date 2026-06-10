import Link from 'next/link'
import { Eyebrow } from '@/components/section-primitives'

export function VisionBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/images/hospitality.png"
        alt="Saudi hospitality service with traditional Arabic coffee"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-primary/85"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="reveal lg:col-span-7">
          <Eyebrow light>Aligned with Vision 2030</Eyebrow>
          <blockquote className="mt-6 font-heading text-2xl font-medium leading-snug text-primary-foreground sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">
            &ldquo;The standard of a nation is reflected in how it welcomes the
            world. We prepare the people who carry that responsibility.&rdquo;
          </blockquote>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            EHP Academy advances the human-capability ambitions of Saudi Vision
            2030 &mdash; building a workforce whose conduct, hospitality, and
            protocol meet the expectations of a global Kingdom.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
          >
            Our philosophy
          </Link>
        </div>
      </div>
    </section>
  )
}
