'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, BookOpen } from 'lucide-react'
import type { CaseStudy } from '@/lib/db/schema'

export function CaseStudiesList({ rows: initial }: { rows: CaseStudy[] }) {
  const [rows, setRows] = useState(initial)
  const [query, setQuery] = useState('')

  const filtered = query
    ? rows.filter((r) => r.headline.toLowerCase().includes(query.toLowerCase()) || r.sector.toLowerCase().includes(query.toLowerCase()))
    : rows

  async function togglePublished(row: CaseStudy) {
    const next = !row.published
    setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, published: next } : r))
    const res = await fetch('/api/admin/case-studies', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: row.id, published: next }),
    })
    if (!res.ok) setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, published: row.published } : r))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
          <p className="mt-1 text-sm text-gray-500">{rows.length} {rows.length === 1 ? 'study' : 'studies'}</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#B8995D' }}
        >
          <Plus className="h-4 w-4" />
          New Case Study
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by headline or sector…"
          className="w-full max-w-sm rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <BookOpen className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              {query ? 'No results found' : 'No case studies yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {query ? 'Try a different search.' : "Click 'New Case Study' to create your first one."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 text-left">Headline</th>
                  <th className="px-6 py-3 text-left">Sector</th>
                  <th className="px-6 py-3 text-left">Institution</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row, i) => (
                  <tr key={row.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-indigo-50/30 transition-colors`}>
                    <td className="px-6 py-3.5 max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{row.headline}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                        {row.sector}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{row.institution}</td>
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
                        href={`/admin/case-studies/${row.id}`}
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
