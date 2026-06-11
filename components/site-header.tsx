'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/wordmark'
import { gsap } from 'gsap'

const NAV_KEYS = [
  { key: 'about', href: '/about' as const },
  { key: 'solutions', href: '/solutions' as const, mega: 'solutions' as const },
  { key: 'industries', href: '/industries' as const, mega: 'industries' as const },
  { key: 'programs', href: '/programs' as const },
  { key: 'faculty', href: '/faculty' as const },
  { key: 'partnerships', href: '/partnerships' as const },
  { key: 'caseStudies', href: '/case-studies' as const },
  { key: 'insights', href: '/insights' as const },
]

export function SiteHeader() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const drawerReady = useRef(false)

  const tSolutions = useTranslations('solutions')
  const tIndustries = useTranslations('industries')

  type SolutionItem = { id: string; title: string }
  type IndustryItem = { id: string; label: string }
  const solutionItems = (tSolutions.raw('items') as SolutionItem[]).map((s) => ({
    label: s.title,
    href: `/solutions#${s.id}`,
  }))
  const industryItems = (tIndustries.raw('items') as IndustryItem[]).map((ind) => ({
    label: ind.label,
    href: `/industries#${ind.id}`,
  }))

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' })
  }

  // Header entrance — clearProps:'transform' after completion so the header's
  // CSS transform doesn't break fixed-position children (mobile drawer)
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1, clearProps: 'transform' }
    )
  }, [])

  // Mega menu fade-slide
  useEffect(() => {
    if (openMenu && megaRef.current) {
      gsap.fromTo(megaRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' })
    }
  }, [openMenu])

  // Mobile drawer open/close with GSAP (no CSS transform classes)
  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer || !drawerReady.current) return

    if (mobileOpen) {
      // slide in from the correct side
      const fromX = locale === 'ar' ? '-100%' : '100%'
      gsap.fromTo(drawer, { x: fromX, display: 'flex' }, { x: '0%', duration: 0.45, ease: 'power3.out' })

      // stagger links after drawer starts sliding
      const links = mobileNavRef.current?.querySelectorAll('a, button')
      if (links?.length) {
        gsap.fromTo(
          links,
          { opacity: 0, x: locale === 'ar' ? -16 : 16 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
        )
      }
    } else {
      const toX = locale === 'ar' ? '-100%' : '100%'
      gsap.to(drawer, {
        x: toX, duration: 0.35, ease: 'power3.in',
        onComplete: () => gsap.set(drawer, { display: 'none' }),
      })
    }
  }, [mobileOpen, locale])

  // Initial hide drawer — must run before open/close effect can fire
  useEffect(() => {
    if (drawerRef.current) {
      gsap.set(drawerRef.current, { x: locale === 'ar' ? '-100%' : '100%', display: 'none' })
      drawerReady.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'h-16 bg-primary/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(184,153,93,0.25)]'
          : 'h-20 bg-transparent',
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" className="relative z-10 flex items-center" aria-label="EHP Academy home">
          <Wordmark className="text-primary-foreground" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_KEYS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.mega ? item.key : null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[0.72rem] font-medium uppercase tracking-luxury transition-colors',
                    isActive ? 'text-gold' : 'text-primary-foreground/85 hover:text-gold',
                  )}
                >
                  {t(item.key)}
                  {item.mega && (
                    <ChevronDown className={cn('size-3 transition-transform duration-200', openMenu === item.key ? 'rotate-180' : '')} />
                  )}
                  <span
                    className={cn(
                      'absolute bottom-0.5 start-2 end-2 h-px bg-gold transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-transparent hover:text-gold"
          >
            {t('requestConsultation')}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={switchLocale}
            className="px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-luxury text-primary-foreground/70 transition-colors hover:text-gold"
          >
            {locale === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="relative z-10 inline-flex items-center justify-center p-2 text-primary-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mega menu panel */}
      {NAV_KEYS.map((item) =>
        item.mega && openMenu === item.key ? (
          <div
            key={`panel-${item.key}`}
            ref={megaRef}
            className="absolute inset-x-0 top-full hidden border-t border-gold/20 bg-primary/98 backdrop-blur-md lg:block"
            onMouseEnter={() => setOpenMenu(item.key)}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-10 py-10">
              <div className="col-span-4 border-e border-gold/15 pe-8">
                <p className="font-heading text-2xl text-primary-foreground">{t(item.key)}</p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">
                  {item.mega === 'solutions' ? t('solutionsDesc') : t('industriesDesc')}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
                >
                  {t('viewAll')} <ChevronRight className="size-3.5 rtl:rotate-180" />
                </Link>
              </div>
              <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
                {(item.mega === 'solutions' ? solutionItems : industryItems).map((sub) => (
                  <Link
                    key={sub.href}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={sub.href as any}
                    onClick={() => setOpenMenu(null)}
                    className="group rounded-sm px-4 py-3 transition-colors hover:bg-primary-foreground/5"
                  >
                    <span className="block text-sm font-medium text-primary-foreground group-hover:text-gold">
                      {sub.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}

      {/* Mobile drawer — GSAP controlled, no CSS transform classes */}
      <div
        ref={drawerRef}
        className="fixed inset-0 z-50 hidden flex-col bg-primary lg:hidden"
      >
        <div className="flex h-20 shrink-0 items-center justify-between px-6">
          <Wordmark className="text-primary-foreground" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 text-primary-foreground"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>
        <nav
          ref={mobileNavRef}
          className="flex flex-col gap-1 overflow-y-auto px-6 pb-10"
        >
          {NAV_KEYS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'border-b border-gold/15 py-4 font-heading text-2xl transition-colors',
                  isActive ? 'text-gold' : 'text-primary-foreground',
                )}
              >
                {t(item.key)}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-gold px-5 py-4 text-sm font-semibold uppercase tracking-luxury text-gold-foreground"
          >
            {t('requestConsultation')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
