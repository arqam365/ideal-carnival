'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { gsap } from 'gsap'

export function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const navigating = useRef(false)
  const mounted = useRef(false) // skip exit anim on first render

  // New page ready — sweep curtain off upward
  useEffect(() => {
    const curtain = curtainRef.current
    const logo = logoRef.current
    if (!curtain) return

    if (!mounted.current) {
      // First render: ensure curtain is hidden below, no animation
      mounted.current = true
      gsap.set(curtain, { yPercent: 100 })
      return
    }

    navigating.current = false

    // Curtain is currently at yPercent: 0 (covering screen from the in-animation)
    // Animate it off upward to reveal the new page
    gsap.timeline()
      .to(logo, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
      .to(curtain, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(curtain, { yPercent: 100 }) // reset below for next use
          gsap.set(logo, { opacity: 0 })
        },
      }, 0.1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Intercept same-origin link clicks
  useEffect(() => {
    const curtain = curtainRef.current
    const logo = logoRef.current
    if (!curtain) return

    function onClick(e: MouseEvent) {
      if (navigating.current) return
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel:') ||
        href === '#' ||
        href.startsWith('#') ||
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download')
      ) return

      e.preventDefault()
      navigating.current = true

      // Curtain sweeps IN from bottom, then navigate after it fully covers screen
      gsap.timeline({
        onComplete: () => router.push(href),
      })
        .set(curtain, { yPercent: 100 })
        .to(curtain, {
          yPercent: 0,
          duration: 0.65,
          ease: 'power3.inOut',
        })
        .to(logo, {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        }, '-=0.2')
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return (
    <div
      ref={curtainRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#1e1b4b',
        zIndex: 9000,
        transform: 'translateY(100%)',
        pointerEvents: 'none',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Image
          src="/images/ehp-icon.png"
          alt=""
          width={52}
          height={52}
          style={{
            filter: 'brightness(0) saturate(100%) invert(70%) sepia(30%) saturate(600%) hue-rotate(5deg) brightness(95%)',
          }}
          priority
        />
      </div>
    </div>
  )
}
