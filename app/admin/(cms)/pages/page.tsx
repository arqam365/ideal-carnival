import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { customPages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { PagesClient } from './pages-client'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  await requireAdmin()
  const rows = await db.select().from(customPages).orderBy(desc(customPages.createdAt))
  return <PagesClient initialPages={rows} />
}
