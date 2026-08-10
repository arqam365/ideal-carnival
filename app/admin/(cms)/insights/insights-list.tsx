'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, FileText } from 'lucide-react'
import type { Insight } from '@/lib/db/schema'

type Row = Omit<Insight, 'createdAt'> & { createdAt: string }

export function InsightsList({ rows: initial }: { rows: Row[] }) {
  const [rows, setRows] = useState(initial)
  const [query, setQuery] = useState('')

  const filtered = query
    ? rows.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : rows

  async function togglePublished(row: Row) {
    const next = !row.published
    // Optimistic update
    setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, published: next } : r))
    const res = await fetch('/api/admin/insights', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: row.id, published: next }),
    })
    if (!res.ok) {
      // Revert on failure
      setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, published: row.published } : r))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
          <p className="mt-1 text-sm text-gray-500">{rows.length} {rows.length === 1 ? 'article' : 'articles'}</p>
        </div>
        <Link
          href="/admin/insights/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
          style={{ backgroundColor: '#B8995D' }}
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full max-w-sm rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              {query ? 'No articles match your search' : 'No insights yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {query ? 'Try a different search term.' : "Click 'New Article' to create your first one."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row, i) => (
                  <tr key={row.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-indigo-50/30 transition-colors`}>
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-gray-900 max-w-xs truncate">{row.title}</p>
                      {row.featured && (
                        <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Featured</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{row.category}</td>
                    <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-3.5">
                      <button
                        onClick={() => togglePublished(row)}
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                          row.published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {row.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/admin/insights/${row.id}`}
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
