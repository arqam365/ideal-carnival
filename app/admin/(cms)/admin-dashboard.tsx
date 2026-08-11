'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, TrendingUp, Building2, MessageSquare, Download, RefreshCw, LogOut, ChevronDown, ChevronUp } from 'lucide-react'

type Lead = {
  date: string; name: string; title: string; institution: string
  country: string; email: string; phone: string; type: string; message: string
}

const TYPE_COLORS: Record<string, string> = {
  'Institutional Partnership': 'bg-purple-100 text-purple-700',
  'Program Inquiry': 'bg-blue-100 text-blue-700',
  'Programme Enquiry': 'bg-blue-100 text-blue-700',
  'General': 'bg-gray-100 text-gray-600',
}

export function AdminDashboard({ leads }: { leads: Lead[] }) {
  const router = useRouter()
  const [flushStatus, setFlushStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  async function flushCache() {
    setFlushStatus('loading')
    try {
      const res = await fetch('/api/admin/flush-cache', { method: 'POST' })
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

  const thisMonth = leads.filter((l) => new Date(l.date).getMonth() === new Date().getMonth()).length
  const institutional = leads.filter((l) => l.type === 'Institutional Partnership').length
  const programmeEnquiries = leads.filter((l) => l.type === 'Program Inquiry' || l.type === 'Programme Enquiry').length

  const stats = [
    { label: 'Total Enquiries', value: leads.length, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'This Month', value: thisMonth, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Institutional', value: institutional, icon: Building2, color: 'bg-amber-50 text-amber-600' },
    { label: 'Programme Enquiries', value: programmeEnquiries, icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back — here&apos;s what&apos;s happening at EHP Academy.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
              onClick={flushCache}
              disabled={flushStatus === 'loading'}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                flushStatus === 'ok' ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : flushStatus === 'error' ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${flushStatus === 'loading' ? 'animate-spin' : ''}`} />
              {flushStatus === 'loading' ? 'Flushing…' : flushStatus === 'ok' ? 'Cache flushed' : flushStatus === 'error' ? 'Failed' : 'Flush Cache'}
            </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Enquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">{leads.length} total submissions</p>
          </div>
          {leads.length > 0 && (
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          )}
        </div>

        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <MessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">No enquiries yet</h3>
            <p className="mt-1 text-sm text-gray-500">Form submissions from the website will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Institution</th>
                  <th className="px-6 py-3 text-left">Country</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((l, i) => (
                  <Fragment key={i}>
                    <tr
                      className={`cursor-pointer transition-colors hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    >
                      <td className="whitespace-nowrap px-6 py-3.5 text-gray-500">
                        {l.date ? new Date(l.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-3.5">
                        <p className="font-medium text-gray-900">{l.name}</p>
                        {l.title && <p className="text-xs text-gray-500">{l.title}</p>}
                      </td>
                      <td className="px-6 py-3.5 text-gray-700">{l.institution || '—'}</td>
                      <td className="px-6 py-3.5 text-gray-700">{l.country || '—'}</td>
                      <td className="px-6 py-3.5" onClick={(e) => e.stopPropagation()}>
                        <a href={`mailto:${l.email}`} className="text-indigo-600 hover:underline">{l.email}</a>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[l.type] ?? 'bg-gray-100 text-gray-600'}`}>
                          {l.type || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-400">
                        {l.message && (
                          expandedRow === i
                            ? <ChevronUp className="h-4 w-4" />
                            : <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </tr>
                    {expandedRow === i && l.message && (
                      <tr className="bg-indigo-50/50">
                        <td colSpan={7} className="px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap border-l-2 border-indigo-300">
                          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1.5">Message</p>
                          {l.message}
                        </td>
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
