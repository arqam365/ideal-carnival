'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Users } from 'lucide-react'
import type { Faculty } from '@/lib/db/schema'

export function FacultyList({ rows }: { rows: Faculty[] }) {
  const [query, setQuery] = useState('')

  const filtered = query
    ? rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
    : rows

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty</h1>
          <p className="mt-1 text-sm text-gray-500">{rows.length} {rows.length === 1 ? 'member' : 'members'}</p>
        </div>
        <Link
          href="/admin/faculty/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#B8995D' }}
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search faculty…"
          className="w-full max-w-sm rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              {query ? 'No faculty match your search' : 'No faculty members yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {query ? 'Try a different name.' : "Click 'Add Member' to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Sort Order</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row, i) => (
                  <tr key={row.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-indigo-50/30 transition-colors`}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        {row.imageUrl ? (
                          <img src={row.imageUrl} alt={row.name} className="h-8 w-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 shrink-0">
                            <span className="text-xs font-semibold text-indigo-600">{row.name.charAt(0)}</span>
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{row.title}</td>
                    <td className="px-6 py-3.5 text-gray-500">{row.sortOrder}</td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/admin/faculty/${row.id}`}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
