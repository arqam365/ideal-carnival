import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'EHP Academy — House of Etiquette, Hospitality & Protocol'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0a1628',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Gold geometric accent top-right */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 320, height: 320,
          borderLeft: '1px solid rgba(184,140,59,0.25)',
          borderBottom: '1px solid rgba(184,140,59,0.25)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          top: 40, right: 40,
          width: 240, height: 240,
          borderLeft: '1px solid rgba(184,140,59,0.15)',
          borderBottom: '1px solid rgba(184,140,59,0.15)',
          display: 'flex',
        }} />

        {/* Gold divider line */}
        <div style={{
          position: 'absolute',
          top: 72, left: 80,
          width: 48, height: 2,
          background: '#b88c3b',
          display: 'flex',
        }} />

        {/* EHP wordmark top */}
        <div style={{
          position: 'absolute',
          top: 64, left: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          <span style={{ fontSize: 14, letterSpacing: 6, color: '#b88c3b', textTransform: 'uppercase', marginBottom: 16 }}>
            EHP ACADEMY
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
          <span style={{
            fontSize: 64,
            fontWeight: 400,
            color: '#f5f0e8',
            lineHeight: 1.1,
            letterSpacing: -1,
          }}>
            House of Etiquette,
          </span>
          <span style={{
            fontSize: 64,
            fontWeight: 400,
            color: '#b88c3b',
            lineHeight: 1.1,
            letterSpacing: -1,
          }}>
            Hospitality & Protocol
          </span>
          <span style={{
            fontSize: 22,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.55)',
            marginTop: 8,
            letterSpacing: 0.5,
          }}>
            Saudi Arabia · Global Standards · Exceptional Service
          </span>
        </div>

        {/* Bottom domain */}
        <div style={{
          position: 'absolute',
          bottom: 48, right: 80,
          fontSize: 14,
          color: 'rgba(184,140,59,0.7)',
          letterSpacing: 2,
          display: 'flex',
        }}>
          ehpacademy.com
        </div>
      </div>
    ),
    { ...size }
  )
}
