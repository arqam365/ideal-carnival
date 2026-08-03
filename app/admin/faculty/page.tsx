import Link from 'next/link'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { faculty } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export default async function FacultyPage() {
  await requireAdmin()
  const rows = await db.select().from(faculty).orderBy(asc(faculty.sortOrder))

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Faculty</h1>
        <Link href="/admin/faculty/new" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          New
        </Link>
      </div>
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Sort Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-gray-600">{row.title}</td>
                <td className="px-4 py-3 text-gray-600">{row.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/faculty/${row.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No faculty yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
