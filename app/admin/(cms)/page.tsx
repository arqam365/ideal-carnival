import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { requireAdmin } from '@/app/admin/auth-guard'
import { AdminDashboard } from './admin-dashboard'

export default async function AdminPage() {
  await requireAdmin()

  let rows: typeof leads.$inferSelect[] = []
  try { rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100) } catch {}
  const leadsData = rows.map((l) => ({
    date: l.createdAt.toISOString(),
    name: l.name,
    title: l.title ?? '',
    institution: l.institution ?? '',
    country: l.country ?? '',
    email: l.email,
    phone: l.phone ?? '',
    type: l.type ?? '',
    message: l.message ?? '',
  }))

  const revalidateSecret = process.env.REVALIDATE_SECRET ?? ''

  return <AdminDashboard leads={leadsData} revalidateSecret={revalidateSecret} />
}
