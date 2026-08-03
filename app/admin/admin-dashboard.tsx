'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'

type Lead = {
  date: string; name: string; title: string; institution: string
  country: string; email: string; phone: string; type: string; message: string
}

export function AdminDashboard({ leads, revalidateSecret }: { leads: Lead[]; revalidateSecret: string }) {
  const router = useRouter()
  const [flushStatus, setFlushStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  async function flushCache() {
    setFlushStatus('loading')
    try {
      const res = await fetch(`/api/revalidate?secret=${revalidateSecret}`)
      setFlushStatus(res.ok ? 'ok' : 'error')
      setTimeout(() => setFlushStatus('idle'), 4000)
    } catch {
      setFlushStatus('error')
      setTimeout(() => setFlushStatus('idle'), 4000)
    }
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  function exportCsv() {
    const header = ['Date', 'Name', 'Title', 'Institution', 'Country', 'Email', 'Phone', 'Type', 'Message']
    const rows = leads.map((l) =>
      [l.date, l.name, l.title, l.institution, l.country, l.email, l.phone, l.type, l.message]
        .map((v) => `"${(v ?? '').replace(/"/g, '""')}"`)
    )
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ehp-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">{leads.length} leads total</p>
        </div>
        <div className="flex items-center gap-3">
          {revalidateSecret && (
            <button
              onClick={flushCache}
              disabled={flushStatus === 'loading'}
              className={`rounded border px-4 py-2 text-sm transition-colors disabled:opacity-60 ${
                flushStatus === 'ok' ? 'border-green-300 bg-green-50 text-green-700'
                : flushStatus === 'error' ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              {flushStatus === 'loading' ? 'Flushing…'
                : flushStatus === 'ok' ? '✓ Cache flushed'
                : flushStatus === 'error' ? '✗ Failed'
                : 'Flush Cache'}
            </button>
          )}
          <button onClick={logout} className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Leads', value: leads.length },
          { label: 'This Month', value: leads.filter((l) => new Date(l.date).getMonth() === new Date().getMonth()).length },
          { label: 'Institutional', value: leads.filter((l) => l.type === 'Institutional Partnership').length },
          { label: 'Programme Enquiries', value: leads.filter((l) => l.type === 'Program Inquiry' || l.type === 'Programme Enquiry').length },
        ].map((s) => (
          <div key={s.label} className="rounded border border-gray-200 bg-white p-5">
            <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
            <p className="mt-1 text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Recent Leads</h2>
          {leads.length > 0 && (
            <button onClick={exportCsv} className="rounded border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100">
              Export CSV
            </button>
          )}
        </div>
        {leads.length === 0 ? (
          <div className="rounded border border-dashed border-gray-300 p-10 text-center text-sm text-gray-400">
            No leads yet. Form submissions will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  {['Date', 'Name', 'Institution', 'Country', 'Email', 'Type', ''].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-start font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((l, i) => (
                  <Fragment key={i}>
                    <tr className="cursor-pointer hover:bg-gray-50" onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-500">{l.date ? new Date(l.date).toLocaleDateString() : '—'}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {l.name}
                        {l.title && <span className="block text-xs font-normal text-gray-500">{l.title}</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{l.institution || '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{l.country || '—'}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <a href={`mailto:${l.email}`} className="text-blue-600 hover:underline">{l.email}</a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">{l.type || 'General'}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{l.message ? (expandedRow === i ? '▲' : '▼ msg') : ''}</td>
                    </tr>
                    {expandedRow === i && l.message && (
                      <tr className="bg-blue-50">
                        <td colSpan={7} className="px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap">{l.message}</td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
