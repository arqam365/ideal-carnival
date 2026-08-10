'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Program } from '@/lib/db/schema'

const lbl = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'
const inp = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'
const ta = `${inp} resize-y`

const INDUSTRIES = [
  'Government', 'Diplomatic & International Relations', 'Hospitality',
  'Tourism', 'Aviation', 'Luxury Retail', 'Banking & Wealth Management',
  'Healthcare', 'Event Management', 'Corporate', 'Education',
  'Private Household Services', 'Entertainment & Major Events',
]

export default function ProgramForm({ item }: { item: Program | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    const fd = new FormData(e.currentTarget)
    const body = {
      id: item?.id,
      slug: fd.get('slug'),
      title: fd.get('title'),
      category: fd.get('category'),
      industry: fd.get('industry'),
      level: fd.get('level'),
      duration: fd.get('duration'),
      format: fd.get('format'),
      summary: fd.get('summary'),
      outcomes: (fd.get('outcomes') as string).split('\n').map(s => s.trim()).filter(Boolean),
      audience: fd.get('audience'),
      modules: (fd.get('modules') as string).split('\n').map(s => s.trim()).filter(Boolean),
      certification: fd.get('certification'),
      impact: fd.get('impact'),
      published: fd.get('published') === 'on',
      sortOrder: Number(fd.get('sortOrder')) || 0,
    }
    const res = await fetch('/api/admin/programs', {
      method: item ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setStatus('saved')
      router.push('/admin/programs')
    } else {
      setStatus('error')
    }
  }

  async function handleDelete() {
    if (!item || !confirm('Delete this program?')) return
    const res = await fetch(`/api/admin/programs?id=${item.id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/programs')
    else setStatus('error')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Main */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Identity */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Programme Details</p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={lbl}>Title</label>
                <input name="title" defaultValue={item?.title ?? ''} required className={inp} />
              </div>
              <div>
                <label className={lbl}>Slug</label>
                <input name="slug" defaultValue={item?.slug ?? ''} required className={inp} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={lbl}>Category</label>
                <input name="category" defaultValue={item?.category ?? ''} required className={inp} />
              </div>
              <div>
                <label className={lbl}>Industry</label>
                <select name="industry" defaultValue={item?.industry ?? 'Government'} required className={inp}>
                  {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className={lbl}>Level</label>
                <select name="level" defaultValue={item?.level ?? 'Foundation'} required className={inp}>
                  <option>Foundation</option>
                  <option>Professional</option>
                  <option>Advanced</option>
                  <option>Executive</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Duration</label>
                <input name="duration" defaultValue={item?.duration ?? ''} required className={inp} />
              </div>
              <div>
                <label className={lbl}>Format</label>
                <select name="format" defaultValue={item?.format ?? 'In-Person'} required className={inp}>
                  <option>In-Person</option>
                  <option>Hybrid</option>
                  <option>Residential</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Content</p>

            <div>
              <label className={lbl}>Summary</label>
              <textarea name="summary" defaultValue={item?.summary ?? ''} required className={ta} rows={4} />
            </div>

            <div>
              <label className={lbl}>Target Audience</label>
              <textarea name="audience" defaultValue={item?.audience ?? ''} required className={ta} rows={3} />
            </div>

            <div>
              <label className={lbl}>Impact</label>
              <textarea name="impact" defaultValue={item?.impact ?? ''} required className={ta} rows={3} />
            </div>
          </div>

          {/* Structure */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Structure</p>

            <div>
              <label className={lbl}>Outcomes (one per line)</label>
              <textarea name="outcomes" defaultValue={(item?.outcomes ?? []).join('\n')} className={ta} rows={5} />
            </div>

            <div>
              <label className={lbl}>Modules (one per line)</label>
              <textarea name="modules" defaultValue={(item?.modules ?? []).join('\n')} className={ta} rows={5} />
            </div>

            <div>
              <label className={lbl}>Certification</label>
              <input name="certification" defaultValue={item?.certification ?? ''} required className={inp} />
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

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Settings</p>

            <div>
              <label className={lbl}>Sort Order</label>
              <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className={inp} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="w-full rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: '#B8995D' }}
            >
              {status === 'saving' ? 'Saving…' : item ? 'Save Changes' : 'Create Programme'}
            </button>

            {item && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-lg border border-red-300 px-6 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Programme
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
