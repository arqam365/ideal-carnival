import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#2b124c', fontFamily: 'system-ui, sans-serif' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '4rem 1.5rem',
            color: '#faf8f5',
          }}
        >
          <p style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', fontWeight: 600, lineHeight: 1, color: 'rgba(184,153,93,0.25)', letterSpacing: '-0.04em', margin: 0 }}>
            404
          </p>
          <div style={{ width: 64, height: 1, background: 'rgba(184,153,93,0.4)', margin: '1.5rem auto 2rem' }} />
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 500, margin: '0 0 1rem' }}>
            This page has not been arranged
          </h1>
          <p style={{ color: 'rgba(250,248,245,0.55)', maxWidth: 480, lineHeight: 1.7, margin: '0 0 3rem' }}>
            The page you are looking for does not exist or has been moved. Our advisory team remains at your disposal.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/en"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(250,248,245,0.2)', padding: '1rem 1.75rem',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#faf8f5', textDecoration: 'none',
              }}
            >
              <Home size={14} /> Return Home
            </Link>
            <Link
              href="/en/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#b8995d', padding: '1rem 1.75rem',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#1e1e1e', textDecoration: 'none',
              }}
            >
              Request Consultation <ArrowRight size={14} />
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
