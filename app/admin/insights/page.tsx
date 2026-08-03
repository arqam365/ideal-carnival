import Link from 'next/link'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { insights } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export default async function InsightsPage() {
  await requireAdmin()
  const rows = await db.select().from(insights).orderBy(desc(insights.id))

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Insights</h1>
        <Link href="/admin/insights/new" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          New
        </Link>
      </div>
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Featured</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-600">{row.category}</td>
                <td className="px-4 py-3 text-gray-600">{row.date}</td>
                <td className="px-4 py-3">
                  {row.featured && <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">Featured</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 text-xs ${row.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {row.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/insights/${row.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No insights yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
