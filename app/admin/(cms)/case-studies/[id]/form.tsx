'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CaseStudy } from '@/lib/db/schema'

const lbl = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'
const inp = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'
const ta = `${inp} resize-y`

const SECTORS = [
  'Government', 'Diplomatic & International Relations', 'Hospitality',
  'Tourism', 'Aviation', 'Healthcare', 'Defense', 'Corporate', 'Education', 'Luxury Retail',
]

export default function CaseStudyForm({ item }: { item: CaseStudy | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    const fd = new FormData(e.currentTarget)
    const body = {
      id: item?.id,
      slug: fd.get('slug'),
      sector: fd.get('sector'),
      institution: fd.get('institution'),
      headline: fd.get('headline'),
      challenge: fd.get('challenge'),
      assessment: fd.get('assessment'),
      strategy: fd.get('strategy'),
      implementation: fd.get('implementation'),
      transformation: fd.get('transformation'),
      results: (fd.get('results') as string).split('\n').map(s => s.trim()).filter(Boolean),
      impact: fd.get('impact'),
      published: fd.get('published') === 'on',
    }
    const res = await fetch('/api/admin/case-studies', {
      method: item ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setStatus('saved')
      router.push('/admin/case-studies')
    } else {
      setStatus('error')
    }
  }

  async function handleDelete() {
    if (!item || !confirm('Delete this case study?')) return
    const res = await fetch(`/api/admin/case-studies?id=${item.id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/case-studies')
    else setStatus('error')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Main */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Identity */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Identity</p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={lbl}>Slug</label>
                <input name="slug" defaultValue={item?.slug ?? ''} required className={inp} />
              </div>
              <div>
                <label className={lbl}>Sector</label>
                <select name="sector" defaultValue={item?.sector ?? 'Government'} required className={inp}>
                  {SECTORS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={lbl}>Institution</label>
              <input name="institution" defaultValue={item?.institution ?? ''} required className={inp} />
            </div>

            <div>
              <label className={lbl}>Headline</label>
              <input name="headline" defaultValue={item?.headline ?? ''} required className={inp} />
            </div>
          </div>

          {/* Case narrative */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Case Narrative</p>

            {(
              [
                ['challenge', 'Challenge', true],
                ['assessment', 'Assessment', true],
                ['strategy', 'Strategy', true],
                ['implementation', 'Implementation', true],
                ['transformation', 'Transformation', true],
                ['impact', 'Impact', true],
              ] as [string, string, boolean][]
            ).map(([name, label, req]) => (
              <div key={name}>
                <label className={lbl}>{label}</label>
                <textarea name={name} defaultValue={(item as Record<string, unknown>)?.[name] as string ?? ''} required={req} className={ta} rows={4} />
              </div>
            ))}

            <div>
              <label className={lbl}>Results (one per line)</label>
              <textarea name="results" defaultValue={(item?.results ?? []).join('\n')} className={ta} rows={4} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</p>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Published</span>
              <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="sr-only peer" />
              <div className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-indigo-600 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="w-full rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: '#B8995D' }}
            >
              {status === 'saving' ? 'Saving…' : item ? 'Save Changes' : 'Create Case Study'}
            </button>

            {item && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-lg border border-red-300 px-6 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Case Study
              </button>
            )}

            {status === 'saved' && <p className="text-center text-sm text-emerald-600">Saved successfully</p>}
            {status === 'error' && <p className="text-center text-sm text-red-600">Error — please try again</p>}
          </div>
        </div>
      </div>
    </form>
  )
}
