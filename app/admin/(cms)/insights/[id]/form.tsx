'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Insight } from '@/lib/db/schema'

const lbl = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'
const inp = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'
const ta = `${inp} resize-y`

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function InsightForm({ item }: { item: Insight | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [slug, setSlug] = useState(item?.slug ?? '')
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? '')

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
      content: fd.get('content') || null,
      imageUrl: fd.get('imageUrl') || null,
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Main column */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Core content card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Content</p>

            <div>
              <label className={lbl}>Title</label>
              <input
                name="title"
                defaultValue={item?.title ?? ''}
                required
                className={inp}
                onChange={(e) => { if (!item) setSlug(slugify(e.target.value)) }}
              />
            </div>

            <div>
              <label className={lbl}>Slug</label>
              <input
                name="slug"
                value={slug}
                required
                className={inp}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div>
              <label className={lbl}>Category</label>
              <select name="category" defaultValue={item?.category ?? 'Diplomatic Protocol'} required className={inp}>
                <option>Diplomatic Protocol</option>
                <option>Government Excellence</option>
                <option>Executive Presence</option>
                <option>Military Protocol</option>
                <option>Hospitality Excellence</option>
                <option>VIP Relations</option>
              </select>
            </div>

            <div>
              <label className={lbl}>Excerpt</label>
              <textarea name="excerpt" defaultValue={item?.excerpt ?? ''} required className={ta} rows={3} />
            </div>

            <div>
              <label className={lbl}>Full Article Content</label>
              <textarea name="content" defaultValue={item?.content ?? ''} className={ta} rows={14} />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="w-full lg:w-72 shrink-0 space-y-5">
          {/* Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</p>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Published</span>
              <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="sr-only peer" />
              <div className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-indigo-600 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-5" />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Featured</span>
              <input type="checkbox" name="featured" defaultChecked={item?.featured ?? false} className="sr-only peer" />
              <div className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-[#B8995D] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>

          {/* Meta */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Meta</p>

            <div>
              <label className={lbl}>Read Time</label>
              <input name="readTime" defaultValue={item?.readTime ?? ''} required placeholder="5 min read" className={inp} />
            </div>

            <div>
              <label className={lbl}>Date</label>
              <input name="date" type="date" defaultValue={item?.date ?? ''} required className={inp} />
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cover Image</p>

            <div>
              <label className={lbl}>Image URL</label>
              <input
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…"
                className={inp}
              />
            </div>

            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="w-full rounded-lg object-cover aspect-video" onError={(e) => (e.currentTarget.style.display = 'none')} />
            )}
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="w-full rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: '#B8995D' }}
            >
              {status === 'saving' ? 'Saving…' : item ? 'Save Changes' : 'Create Article'}
            </button>

            {item && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-lg border border-red-300 px-6 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Article
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
