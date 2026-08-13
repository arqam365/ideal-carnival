import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { getSiteConfigRows, buildOverrides, deepMerge } from '@/lib/site-config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'en' | 'ar')) {
    locale = routing.defaultLocale
  }

  const base = (await import(`../messages/${locale}.json`)).default as Record<string, unknown>

  try {
    const rows = await getSiteConfigRows(locale)
    const overrides = buildOverrides(rows)
    return { locale, messages: deepMerge(base, overrides) as Record<string, never> }
  } catch {
    return { locale, messages: base as Record<string, never> }
  }
})
