import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { faculty } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { FacultyList } from './faculty-list'

export const dynamic = 'force-dynamic'

export default async function FacultyPage() {
  await requireAdmin()
  const rows = await db.select().from(faculty).orderBy(asc(faculty.sortOrder))
  return <FacultyList rows={rows} />
}
