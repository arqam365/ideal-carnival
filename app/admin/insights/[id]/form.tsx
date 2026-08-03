'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Insight } from '@/lib/db/schema'

const label = 'block text-sm font-medium text-gray-700 mb-1'
const input = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const textarea = `${input} resize-y min-h-[80px]`

export default function InsightForm({ item }: { item: Insight | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    const fd = new FormData(e.currentTarget)
    const body = {
      id: item?.id,
      slug: fd.get('slug'),
      category: fd.get('category'),
      title: fd.get('title'),
      excerpt: fd.get('excerpt'),
      readTime: fd.get('readTime'),
      date: fd.get('date'),
      featured: fd.get('featured') === 'on',
      published: fd.get('published') === 'on',
    }
    const res = await fetch('/api/admin/insights', {
      method: item ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setStatus('saved')
      router.push('/admin/insights')
    } else {
      setStatus('error')
    }
  }

  async function handleDelete() {
    if (!item || !confirm('Delete this insight?')) return
    const res = await fetch(`/api/admin/insights?id=${item.id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/insights')
    else setStatus('error')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label}>Slug</label>
        <input name="slug" defaultValue={item?.slug ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Category</label>
        <input name="category" defaultValue={item?.category ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Title</label>
        <input name="title" defaultValue={item?.title ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Excerpt</label>
        <textarea name="excerpt" defaultValue={item?.excerpt ?? ''} required className={textarea} />
      </div>
      <div>
        <label className={label}>Read Time</label>
        <input name="readTime" defaultValue={item?.readTime ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Date</label>
        <input name="date" defaultValue={item?.date ?? ''} required className={input} />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={item?.featured ?? false} />
          Featured
        </label>
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
