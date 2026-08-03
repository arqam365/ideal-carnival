'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
      )

      els.forEach((el) => {
        // Honour existing transitionDelay for stagger groups (set via inline style)
        const cssDelay = parseFloat(el.style.transitionDelay || '0') / 1000

        // Set initial state via GSAP (overrides CSS opacity:0 pre-JS state)
        gsap.set(el, { opacity: 0, y: 28, willChange: 'opacity, transform' })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              delay: cssDelay,
              ease: 'power3.out',
              clearProps: 'willChange',
              onComplete: () => el.classList.add('is-visible'),
            })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [pathname])

  return null
}
