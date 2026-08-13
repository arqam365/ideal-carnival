import { db } from '@/lib/db'
import { siteConfig } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export type SiteConfigRow = { key: string; locale: string; value: string; label: string; section: string }

export async function getSiteConfigRows(locale: string): Promise<SiteConfigRow[]> {
  try {
    return await db.select().from(siteConfig).where(eq(siteConfig.locale, locale))
  } catch {
    return []
  }
}

// Convert flat {key: value} record to nested object and deep-merge into target
function set(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {}
    cur = cur[parts[i]] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]] = value
}

export function buildOverrides(rows: SiteConfigRow[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const row of rows) {
    if (row.value.trim() !== '') set(out, row.key, row.value)
  }
  return out
}

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof result[key] === 'object' &&
      result[key] !== null
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>,
      )
    } else {
      result[key] = source[key]
    }
  }
  return result
}
