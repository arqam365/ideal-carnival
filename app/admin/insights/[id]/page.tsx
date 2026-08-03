import { notFound, redirect } from 'next/navigation'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { insights } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import InsightForm from './form'

export default async function InsightEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  if (id === 'new') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">New Insight</h1>
        <InsightForm item={null} />
      </div>
    )
  }

  const [item] = await db.select().from(insights).where(eq(insights.id, Number(id)))
  if (!item) redirect('/admin/insights')

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Insight</h1>
      <InsightForm item={item} />
    </div>
  )
}
