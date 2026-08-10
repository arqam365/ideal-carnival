import { redirect } from 'next/navigation'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import ProgramForm from './form'

export default async function ProgramEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  if (id === 'new') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">New Program</h1>
        <ProgramForm item={null} />
      </div>
    )
  }

  const [item] = await db.select().from(programs).where(eq(programs.id, Number(id)))
  if (!item) redirect('/admin/programs')

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Program</h1>
      <ProgramForm item={item} />
    </div>
  )
}
