'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch devices: system cursor unchanged
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!

    document.documentElement.classList.add('custom-cursor')

    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.1,  ease: 'power2.out' })
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.1,  ease: 'power2.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.52, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.52, ease: 'power3.out' })

    let visible = false

    function onMove(e: MouseEvent) {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
      }
      xDot(e.clientX - 4)
      yDot(e.clientY - 4)
      xRing(e.clientX - 18)
      yRing(e.clientY - 18)
    }

    function onEnter() {
      gsap.to(ring, { scale: 1.85, opacity: 0.9, duration: 0.3, ease: 'power3.out' })
      gsap.to(dot,  { scale: 0,    duration: 0.3, ease: 'power3.out' })
    }

    function onLeave() {
      gsap.to(ring, { scale: 1, opacity: 0.65, duration: 0.4, ease: 'power3.out' })
      gsap.to(dot,  { scale: 1, duration: 0.4, ease: 'power3.out' })
    }

    function onLeaveWindow() {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
      visible = false
    }

    function onEnterWindow() {
      // opacity restored on next mousemove
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onEnterWindow)

    // Track interactive elements — re-query on DOM changes
    let interactives: NodeListOf<Element>
    function bindInteractives() {
      interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindInteractives()

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
      interactives?.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--gold)',
          pointerEvents: 'none', zIndex: 9999,
          opacity: 0, willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(184,153,93,0.65)',
          pointerEvents: 'none', zIndex: 9998,
          opacity: 0, willChange: 'transform',
        }}
      />
    </>
  )
}