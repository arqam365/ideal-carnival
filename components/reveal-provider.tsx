'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Split element text into clipped word spans for the slide-up reveal
// Falls back gracefully when element has child elements
function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.children.length > 0) return []
  const original = el.dataset.rvOrig ?? el.textContent ?? ''
  el.dataset.rvOrig = original
  el.innerHTML = original.trim().split(/\s+/).map((w) =>
    `<span class="rv-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.08em">`
    + `<span class="rv-w" style="display:inline-block">${w}</span></span>`
  ).join(' ')
  return Array.from(el.querySelectorAll<HTMLElement>('.rv-w'))
}

export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {

        // ── 1. Word-split headings ('.reveal-words') ─────────────────────
        document.querySelectorAll<HTMLElement>('.reveal-words:not(.rv-done)').forEach((el) => {
          el.classList.add('rv-done')
          const staggerDelay = parseFloat(el.dataset.rvDelay ?? '0')
          const words = splitWords(el)
          if (!words.length) return

          gsap.set(words, { yPercent: 115 })

          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => gsap.to(words, {
              yPercent: 0,
              duration: 0.55,
              stagger: 0.035,
              ease: 'power3.out',
              delay: staggerDelay,
            }),
          })
        })

        // ── 2. Simple fade + rise ('.reveal') ────────────────────────────
        document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
          const cssDelay = parseFloat(el.style.transitionDelay || '0') / 1000
          gsap.set(el, { opacity: 0, y: 16, willChange: 'opacity, transform' })

          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => gsap.to(el, {
              opacity: 1, y: 0,
              duration: 0.5, delay: cssDelay,
              ease: 'power2.out',
              clearProps: 'willChange',
              onComplete: () => el.classList.add('is-visible'),
            }),
          })
        })

        // ── 3. Scrub reveal ('.reveal-scrub') ────────────────────────────
        document.querySelectorAll<HTMLElement>('.reveal-scrub:not(.rv-s-done)').forEach((el) => {
          el.classList.add('rv-s-done')
          gsap.fromTo(el,
            { opacity: 0, y: 56 },
            {
              opacity: 1, y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                end: 'top 52%',
                scrub: 1,
              },
            }
          )
        })

        // ── 4. Horizontal line expand ('.reveal-line') ───────────────────
        document.querySelectorAll<HTMLElement>('.reveal-line:not(.rv-l-done)').forEach((el) => {
          el.classList.add('rv-l-done')
          gsap.fromTo(el,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.4,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          )
        })

        // ── 5. Stagger children ('.reveal-stagger > *') ──────────────────
        document.querySelectorAll<HTMLElement>('.reveal-stagger:not(.rv-st-done)').forEach((el) => {
          el.classList.add('rv-st-done')
          const children = Array.from(el.children) as HTMLElement[]
          gsap.set(children, { opacity: 0, y: 16 })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => gsap.to(children, {
              opacity: 1, y: 0,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
            }),
          })
        })

        // ── 6. Parallax images ('[data-parallax]') ───────────────────────
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? '20')
          gsap.to(el, {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

      })

      return () => ctx.revert()
    })

    // Reduced-motion: just fade in instantly
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-words, .reveal-scrub, .reveal-stagger')
      gsap.set(els, { opacity: 1, y: 0 })
    })

    return () => mm.revert()
  }, [pathname])

  return null
}
