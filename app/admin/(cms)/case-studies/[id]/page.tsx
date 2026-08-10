import { redirect } from 'next/navigation'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { caseStudies } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import CaseStudyForm from './form'

export default async function CaseStudyEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  if (id === 'new') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">New Case Study</h1>
        <CaseStudyForm item={null} />
      </div>
    )
  }

  const [item] = await db.select().from(caseStudies).where(eq(caseStudies.id, Number(id)))
  if (!item) redirect('/admin/case-studies')

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Case Study</h1>
      <CaseStudyForm item={item} />
    </div>
  )
}
