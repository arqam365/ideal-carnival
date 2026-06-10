import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal-provider'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ehpacademy.sa'),
  title: {
    default:
      'EHP Academy — House of Etiquette, Hospitality & Protocol | Saudi Arabia',
    template: '%s | EHP Academy',
  },
  description:
    'EHP Academy develops Saudi Arabia\u2019s next generation of service leaders through executive education in protocol, etiquette, hospitality excellence, and government & military service standards. Global standards, Saudi values.',
  keywords: [
    'protocol training Saudi Arabia',
    'hospitality excellence academy',
    'executive presence',
    'government excellence',
    'military protocol',
    'VIP relations',
    'Saudi Vision 2030',
    'customer experience training',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'EHP Academy — House of Etiquette, Hospitality & Protocol',
    description:
      'Developing Saudi Arabia\u2019s next generation of service leaders. Global standards. Saudi values. Exceptional service.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EHP Academy',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Reveal />
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
