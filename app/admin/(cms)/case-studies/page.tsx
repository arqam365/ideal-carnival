import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { caseStudies } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { CaseStudiesList } from './case-studies-list'

export const dynamic = 'force-dynamic'

export default async function CaseStudiesPage() {
  await requireAdmin()
  const rows = await db.select().from(caseStudies).orderBy(desc(caseStudies.id))
  return <CaseStudiesList rows={rows} />
}
