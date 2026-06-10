'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { primaryNav, solutions, industries } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/wordmark'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(184,153,93,0.25)]'
          : 'bg-transparent',
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link
          href="/"
          className="relative z-10 flex items-center"
          aria-label="EHP Academy home"
        >
          <Wordmark className="text-primary-foreground" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-[0.78rem] font-medium uppercase tracking-luxury text-primary-foreground/85 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            </div>
          ))}
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
            className="absolute inset-x-0 top-20 hidden border-t border-gold/20 bg-primary/98 backdrop-blur-md lg:block"
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
                {(item.label === 'Solutions' ? solutions : industries).map(
                  (sub) => (
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
                  ),
                )}
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
        <nav className="flex h-[calc(100%-5rem)] flex-col gap-1 overflow-y-auto px-6 pb-10">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-gold/15 py-4 font-heading text-2xl text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
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
