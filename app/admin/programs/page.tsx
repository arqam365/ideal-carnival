import Link from 'next/link'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export default async function ProgramsPage() {
  await requireAdmin()
  const rows = await db.select().from(programs).orderBy(asc(programs.sortOrder))

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Programs</h1>
        <Link href="/admin/programs/new" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          New
        </Link>
      </div>
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Level</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Format</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-600">{row.category}</td>
                <td className="px-4 py-3 text-gray-600">{row.level}</td>
                <td className="px-4 py-3 text-gray-600">{row.format}</td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 text-xs ${row.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {row.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/programs/${row.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No programs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
