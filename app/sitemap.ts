import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { insights, caseStudies } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const BASE = 'https://ehpacademy.com'
const LOCALES = ['en', 'ar'] as const

const STATIC_PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/programs', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/faculty', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/partnerships', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const { path, priority, changeFrequency } of STATIC_PAGES) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority,
      })
    }
  }

  try {
    const [publishedInsights, publishedCases] = await Promise.all([
      db.select({ slug: insights.slug, updatedAt: insights.createdAt })
        .from(insights)
        .where(eq(insights.published, true)),
      db.select({ slug: caseStudies.slug })
        .from(caseStudies)
        .where(eq(caseStudies.published, true)),
    ])

    for (const locale of LOCALES) {
      for (const row of publishedInsights) {
        entries.push({
          url: `${BASE}/${locale}/insights/${row.slug}`,
          lastModified: row.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
      for (const row of publishedCases) {
        entries.push({
          url: `${BASE}/${locale}/case-studies/${row.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  } catch {
    // DB unavailable — static routes only
  }

  return entries
}
