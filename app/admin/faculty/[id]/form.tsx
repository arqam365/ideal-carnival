'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Faculty } from '@/lib/db/schema'

const label = 'block text-sm font-medium text-gray-700 mb-1'
const input = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const textarea = `${input} resize-y min-h-[80px]`

export default function FacultyForm({ item }: { item: Faculty | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    const fd = new FormData(e.currentTarget)
    const body = {
      id: item?.id,
      name: fd.get('name'),
      title: fd.get('title'),
      specialisation: (fd.get('specialisation') as string).split('\n').map(s => s.trim()).filter(Boolean),
      bio: fd.get('bio'),
      credentials: (fd.get('credentials') as string).split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: fd.get('imageUrl') || null,
      sortOrder: Number(fd.get('sortOrder')) || 0,
    }
    const res = await fetch('/api/admin/faculty', {
      method: item ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setStatus('saved')
      router.push('/admin/faculty')
    } else {
      setStatus('error')
    }
  }

  async function handleDelete() {
    if (!item || !confirm('Delete this faculty member?')) return
    const res = await fetch(`/api/admin/faculty?id=${item.id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/faculty')
    else setStatus('error')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label}>Name</label>
        <input name="name" defaultValue={item?.name ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Title</label>
        <input name="title" defaultValue={item?.title ?? ''} required className={input} />
      </div>
      <div>
        <label className={label}>Specialisation (one per line)</label>
        <textarea name="specialisation" defaultValue={(item?.specialisation ?? []).join('\n')} className={textarea} />
      </div>
      <div>
        <label className={label}>Bio</label>
        <textarea name="bio" defaultValue={item?.bio ?? ''} required className={`${textarea} min-h-[120px]`} />
      </div>
      <div>
        <label className={label}>Credentials (one per line)</label>
        <textarea name="credentials" defaultValue={(item?.credentials ?? []).join('\n')} className={textarea} />
      </div>
      <div>
        <label className={label}>Photo URL</label>
        <input name="imageUrl" defaultValue={item?.imageUrl ?? ''} className={input} placeholder="https://..." />
      </div>
      <div>
        <label className={label}>Sort Order</label>
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className={input} />
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
