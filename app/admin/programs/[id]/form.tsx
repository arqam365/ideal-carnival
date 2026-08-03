'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Program } from '@/lib/db/schema'

const label = 'block text-sm font-medium text-gray-700 mb-1'
const input = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const textarea = `${input} resize-y min-h-[80px]`

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label}>Slug</label>
        <input name="slug" defaultValue={item?.slug ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Title</label>
        <input name="title" defaultValue={item?.title ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Category</label>
        <input name="category" defaultValue={item?.category ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Industry</label>
        <select name="industry" defaultValue={item?.industry ?? 'Government'} required className={input}>
          <option>Government</option>
          <option>Defense</option>
          <option>Hospitality</option>
          <option>Aviation</option>
          <option>Financial Services</option>
        </select>
      </div>
      <div>
        <label className={label}>Level</label>
        <select name="level" defaultValue={item?.level ?? 'Foundation'} required className={input}>
          <option>Foundation</option>
          <option>Advanced</option>
          <option>Executive</option>
        </select>
      </div>
      <div>
        <label className={label}>Duration</label>
        <input name="duration" defaultValue={item?.duration ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Format</label>
        <select name="format" defaultValue={item?.format ?? 'In-Person'} required className={input}>
          <option>In-Person</option>
          <option>Hybrid</option>
          <option>Residential</option>
        </select>
      </div>
      <div>
        <label className={label}>Summary</label>
        <textarea name="summary" defaultValue={item?.summary ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Outcomes (one per line)</label>
        <textarea name="outcomes" defaultValue={(item?.outcomes ?? []).join('\n')} className={textarea} />
      </div>
      <div>
        <label className={label}>Audience</label>
        <textarea name="audience" defaultValue={item?.audience ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Modules (one per line)</label>
        <textarea name="modules" defaultValue={(item?.modules ?? []).join('\n')} className={textarea} />
      </div>
      <div>
        <label className={label}>Certification</label>
        <input name="certification" defaultValue={item?.certification ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Impact</label>
        <textarea name="impact" defaultValue={item?.impact ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Sort Order</label>
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className={input} />
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} />
          Published
        </label>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {item && (
          <button type="button" onClick={handleDelete} className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
            Delete
          </button>
        )}
        {status === 'saved' && <span className="text-sm text-green-600">Saved</span>}
        {status === 'error' && <span className="text-sm text-red-600">Error — try again</span>}
      </div>
    </form>
  )
}
