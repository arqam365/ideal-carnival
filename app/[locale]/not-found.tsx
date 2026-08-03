import Image from 'next/image'
import { ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary pt-20">
      {/* Background image */}
      <Image
        src="/images/ceremony.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" aria-hidden />

      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        {/* 404 number */}
        <p className="font-mono text-[6rem] font-semibold leading-none tracking-tighter text-gold/30 sm:text-[9rem] lg:text-[12rem]">
          404
        </p>

        {/* Divider */}
        <div className="mx-auto mb-8 mt-6 h-px w-16 bg-gold/40" aria-hidden />

        {/* Headline */}
        <h1 className="text-balance font-heading text-3xl font-medium leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          This page has not been arranged
        </h1>

        {/* Body */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/60">
          The page you are looking for does not exist, has been moved, or is no longer available. Our advisory team remains at your disposal.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-primary-foreground/20 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <Home className="size-4" />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-gold px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-gold/90"
          >
            Request Consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  )
}
