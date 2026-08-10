import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { insights } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { InsightsList } from './insights-list'

export const dynamic = 'force-dynamic'

export default async function InsightsPage() {
  await requireAdmin()
  const rows = await db.select().from(insights).orderBy(desc(insights.id))
  const data = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
  return <InsightsList rows={data} />
}
