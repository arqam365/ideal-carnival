import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { ProgramsList } from './programs-list'

export const dynamic = 'force-dynamic'

export default async function ProgramsPage() {
  await requireAdmin()
  const rows = await db.select().from(programs).orderBy(asc(programs.sortOrder))
  return <ProgramsList rows={rows} />
}
