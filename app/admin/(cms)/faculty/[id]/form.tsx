'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Faculty } from '@/lib/db/schema'

const lbl = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'
const inp = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'
const ta = `${inp} resize-y`

export default function FacultyForm({ item }: { item: Faculty | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? '')

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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Main */}
        <div className="flex-1 space-y-6 min-w-0">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Profile</p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={lbl}>Name</label>
                <input name="name" defaultValue={item?.name ?? ''} required className={inp} />
              </div>
              <div>
                <label className={lbl}>Title / Role</label>
                <input name="title" defaultValue={item?.title ?? ''} required className={inp} />
              </div>
            </div>

            <div>
              <label className={lbl}>Bio</label>
              <textarea name="bio" defaultValue={item?.bio ?? ''} required className={ta} rows={6} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Expertise</p>

            <div>
              <label className={lbl}>Specialisations (one per line)</label>
              <textarea name="specialisation" defaultValue={(item?.specialisation ?? []).join('\n')} className={ta} rows={4} />
            </div>

            <div>
              <label className={lbl}>Credentials (one per line)</label>
              <textarea name="credentials" defaultValue={(item?.credentials ?? []).join('\n')} className={ta} rows={4} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Photo</p>

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
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full rounded-lg object-cover aspect-square"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
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
              {status === 'saving' ? 'Saving…' : item ? 'Save Changes' : 'Add Member'}
            </button>

            {item && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-lg border border-red-300 px-6 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Member
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
