'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CaseStudy } from '@/lib/db/schema'

const label = 'block text-sm font-medium text-gray-700 mb-1'
const input = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const textarea = `${input} resize-y min-h-[80px]`

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label}>Slug</label>
        <input name="slug" defaultValue={item?.slug ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Sector</label>
        <select name="sector" defaultValue={item?.sector ?? 'Government'} required className={input}>
          <option>Government</option>
          <option>Hospitality</option>
          <option>Defense</option>
        </select>
      </div>
      <div>
        <label className={label}>Institution</label>
        <input name="institution" defaultValue={item?.institution ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Headline</label>
        <input name="headline" defaultValue={item?.headline ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Challenge</label>
        <textarea name="challenge" defaultValue={item?.challenge ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Assessment</label>
        <textarea name="assessment" defaultValue={item?.assessment ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Strategy</label>
        <textarea name="strategy" defaultValue={item?.strategy ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Implementation</label>
        <textarea name="implementation" defaultValue={item?.implementation ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Transformation</label>
        <textarea name="transformation" defaultValue={item?.transformation ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Results (one per line)</label>
        <textarea name="results" defaultValue={(item?.results ?? []).join('\n')} className={textarea} />
      </div>
      <div>
        <label className={label}>Impact</label>
        <textarea name="impact" defaultValue={item?.impact ?? ''} required className={textarea} />
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
