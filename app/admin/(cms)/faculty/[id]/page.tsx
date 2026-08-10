import { redirect } from 'next/navigation'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { faculty } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import FacultyForm from './form'

export default async function FacultyEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  if (id === 'new') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">New Faculty Member</h1>
        <FacultyForm item={null} />
      </div>
    )
  }

  const [item] = await db.select().from(faculty).where(eq(faculty.id, Number(id)))
  if (!item) redirect('/admin/faculty')

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Faculty Member</h1>
      <FacultyForm item={item} />
    </div>
  )
}
