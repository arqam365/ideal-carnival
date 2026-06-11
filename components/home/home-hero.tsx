"use client"

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/section-primitives'
import { Link } from '@/i18n/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HomeHero() {
  const t = useTranslations('home.hero')

  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(imageRef.current, { scale: 1.08 }, { scale: 1, duration: 1.8 })
        .fromTo(
          [eyebrowRef.current, headingRef.current, bodyRef.current, ctaRef.current],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=1.2'
        )

      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '55% top', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-primary"
    >
      <img
        ref={imageRef}
        src="/images/hero-protocol.png"
        alt="EHP Academy diplomatic reception hall with hospitality staff in formal poise"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/30" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/80 to-transparent rtl:bg-gradient-to-l" aria-hidden="true" />

      <div ref={contentRef} className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          <div ref={eyebrowRef}>
            <Eyebrow light>{t('eyebrow')}</Eyebrow>
          </div>
          <h1
            ref={headingRef}
            className="mt-6 text-balance font-heading text-4xl font-medium leading-[1.05] text-primary-foreground sm:text-5xl lg:text-[4.25rem]"
          >
            {t('heading')}
          </h1>
          <p
            ref={bodyRef}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/75"
          >
            {t('body')}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-gold/90"
            >
              {t('cta1')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-0" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {t('cta2')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
