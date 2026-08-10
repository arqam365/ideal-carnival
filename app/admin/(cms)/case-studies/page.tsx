import Link from 'next/link'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { caseStudies } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export default async function CaseStudiesPage() {
  await requireAdmin()
  const rows = await db.select().from(caseStudies).orderBy(desc(caseStudies.id))

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          New
        </Link>
      </div>
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Headline</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Sector</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Institution</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium max-w-xs truncate">{row.headline}</td>
                <td className="px-4 py-3 text-gray-600">{row.sector}</td>
                <td className="px-4 py-3 text-gray-600">{row.institution}</td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 text-xs ${row.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {row.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/case-studies/${row.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No case studies yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
