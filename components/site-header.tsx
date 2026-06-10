'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { primaryNav, solutions, industries } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/wordmark'
import { gsap } from 'gsap'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  // Entrance animation on mount
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  // Mega menu fade-slide in
  useEffect(() => {
    if (openMenu && megaRef.current) {
      gsap.fromTo(
        megaRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
      )
    }
  }, [openMenu])

  // Mobile nav link stagger on open
  useEffect(() => {
    if (mobileOpen && mobileNavRef.current) {
      const links = mobileNavRef.current.querySelectorAll('a')
      gsap.fromTo(
        links,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.25 }
      )
    }
  }, [mobileOpen])

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
        <Link
          href="/"
          className="relative z-10 flex items-center"
          aria-label="EHP Academy home"
        >
          <Wordmark className="text-primary-foreground" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[0.72rem] font-medium uppercase tracking-luxury transition-colors',
                    isActive ? 'text-gold' : 'text-primary-foreground/85 hover:text-gold',
                  )}
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      className={cn(
                        'size-3 transition-transform duration-200',
                        openMenu === item.label ? 'rotate-180' : '',
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      'absolute bottom-0.5 left-2 right-2 h-px origin-left bg-gold transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-transparent hover:text-gold"
          >
            Request Consultation
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="relative z-10 inline-flex items-center justify-center p-2 text-primary-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mega menu panel */}
      {primaryNav.map((item) =>
        item.columns && openMenu === item.label ? (
          <div
            key={`panel-${item.label}`}
            ref={megaRef}
            className="absolute inset-x-0 top-full hidden border-t border-gold/20 bg-primary/98 backdrop-blur-md lg:block"
            onMouseEnter={() => setOpenMenu(item.label)}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-10 py-10">
              <div className="col-span-4 border-r border-gold/15 pr-8">
                <p className="font-heading text-2xl text-primary-foreground">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">
                  {item.label === 'Solutions'
                    ? 'Strategic capability areas engaged by ministries, commands, and enterprises.'
                    : 'Sector-specific protocol and service transformation programs.'}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-gold hover:text-gold/80"
                >
                  View all <ChevronRight className="size-3.5" />
                </Link>
              </div>
              <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
                {(item.label === 'Solutions' ? solutions : industries).map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpenMenu(null)}
                    className="group rounded-sm px-4 py-3 transition-colors hover:bg-primary-foreground/5"
                  >
                    <span className="block text-sm font-medium text-primary-foreground group-hover:text-gold">
                      {sub.label}
                    </span>
                    {sub.description ? (
                      <span className="mt-0.5 block text-xs leading-relaxed text-primary-foreground/50">
                        {sub.description}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-primary transition-transform duration-500 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-20 items-center justify-between px-6">
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
          className="flex h-[calc(100%-5rem)] flex-col gap-1 overflow-y-auto px-6 pb-10"
        >
          {primaryNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'border-b border-gold/15 py-4 font-heading text-2xl transition-colors',
                  isActive ? 'text-gold' : 'text-primary-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-gold px-5 py-4 text-sm font-semibold uppercase tracking-luxury text-gold-foreground"
          >
            Request Consultation
          </Link>
        </nav>
      </div>
    </header>
  )
}
