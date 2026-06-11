import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Geist_Mono, Cairo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal-provider'
import { DirectionSync } from '@/components/direction-sync'
import '../globals.css'

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

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ehpacademy.sa'),
  title: {
    default: 'EHP Academy — House of Etiquette, Hospitality & Protocol | Saudi Arabia',
    template: '%s | EHP Academy',
  },
  description:
    'EHP Academy develops Saudi Arabia\'s next generation of service leaders through executive education in protocol, etiquette, hospitality excellence, and government & military service standards.',
  keywords: ['protocol training Saudi Arabia', 'hospitality excellence academy', 'executive presence', 'government excellence', 'military protocol', 'Saudi Vision 2030'],
  openGraph: {
    title: 'EHP Academy — House of Etiquette, Hospitality & Protocol',
    description: 'Developing Saudi Arabia\'s next generation of service leaders. Global standards. Saudi values. Exceptional service.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EHP Academy',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()
  const isRtl = locale === 'ar'

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} ${cairo.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <DirectionSync />
          <Reveal />
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
