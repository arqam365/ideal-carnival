'use client'

import { useTranslations } from 'next-intl'

export function TrustBar() {
  const t = useTranslations('home.trust')
  const partners = t.raw('partners') as string[]
  // Triplicate for a long seamless strip at any viewport width
  const items = [...partners, ...partners, ...partners]

  return (
    <div className="border-y border-border bg-background py-6 overflow-hidden">
      <p className="mb-5 text-center text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
        {t('label')}
      </p>
      <div className="relative">
        {/* Marquee track — single row, twice the content, translateX(-50%) loops seamlessly */}
        <div className="marquee-track flex w-max items-center gap-14">
          {items.map((p, i) => (
            <span
              key={i}
              className="flex items-center gap-14 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/55"
            >
              {p}
              <span className="size-1 shrink-0 rounded-full bg-gold/30" aria-hidden />
            </span>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" aria-hidden />
      </div>
    </div>
  )
}
