'use client'

import { useState } from 'react'
import { Plus, Globe, Eye, EyeOff, Trash2, ExternalLink, Loader2, Languages } from 'lucide-react'
import type { CustomPage } from '@/lib/db/schema'

export function PagesClient({ initialPages }: { initialPages: CustomPage[] }) {
  const [pages, setPages] = useState(initialPages)
  const [editing, setEditing] = useState<CustomPage | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Pages</h1>
          <p className="mt-1 text-sm text-gray-500">Create pages that appear at <code>/p/slug</code>. Optionally add them to the navigation.</p>
        </div>
        <button
          onClick={() => { setEditing(null); setCreating(true) }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#B8995D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a0844f] transition-colors"
        >
          <Plus className="h-4 w-4" /> New Page
        </button>
      </div>

      {(creating || editing) && (
        <PageEditor
          page={editing}
          onSave={(p) => {
            setPages((prev) => editing ? prev.map((x) => x.id === p.id ? p : x) : [p, ...prev])
            setEditing(null)
            setCreating(false)
          }}
          onCancel={() => { setEditing(null); setCreating(false) }}
        />
      )}

      {pages.length === 0 && !creating ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
          No custom pages yet. Click "New Page" to create one.
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {pages.map((page) => (
              <PageRow
                key={page.id}
                page={page}
                onEdit={() => { setCreating(false); setEditing(page) }}
                onDelete={(id) => setPages((prev) => prev.filter((p) => p.id !== id))}
                onToggle={(updated) => setPages((prev) => prev.map((p) => p.id === updated.id ? updated : p))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PageRow({ page, onEdit, onDelete, onToggle }: {
  page: CustomPage
  onEdit: () => void
  onDelete: (id: number) => void
  onToggle: (p: CustomPage) => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [toggling, setToggling] = useState(false)

  async function toggle() {
    setToggling(true)
    const res = await fetch(`/api/admin/pages/${page.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...page, published: !page.published }),
    })
    if (res.ok) onToggle(await res.json())
    setToggling(false)
  }

  async function remove() {
    if (!confirm(`Delete page "${page.titleEn}"? This cannot be undone.`)) return
    setDeleting(true)
    await fetch(`/api/admin/pages/${page.id}`, { method: 'DELETE' })
    onDelete(page.id)
  }

  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{page.titleEn}</p>
        <p className="text-xs text-gray-400 font-mono mt-0.5">/p/{page.slug}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {page.showInNav && (
          <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 rounded px-2 py-0.5">In Nav</span>
        )}
        <span className={`text-xs rounded px-2 py-0.5 border ${page.published ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
          {page.published ? 'Published' : 'Draft'}
        </span>
        <a href={`/en/p/${page.slug}`} target="_blank" rel="noopener" className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors" title="Preview">
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button onClick={toggle} disabled={toggling} className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors" title="Toggle publish">
          {toggling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : page.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
        <button onClick={onEdit} className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Edit
        </button>
        <button onClick={remove} disabled={deleting} className="p-1.5 text-red-400 hover:text-red-600 transition-colors">
          {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}

function PageEditor({ page, onSave, onCancel }: {
  page: CustomPage | null
  onSave: (p: CustomPage) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    slug: page?.slug ?? '',
    titleEn: page?.titleEn ?? '',
    titleAr: page?.titleAr ?? '',
    eyebrowEn: page?.eyebrowEn ?? '',
    eyebrowAr: page?.eyebrowAr ?? '',
    contentEn: page?.contentEn ?? '',
    contentAr: page?.contentAr ?? '',
    showInNav: page?.showInNav ?? false,
    navLabelEn: page?.navLabelEn ?? '',
    navLabelAr: page?.navLabelAr ?? '',
    published: page?.published ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [translating, setTranslating] = useState<Record<string, boolean>>({})

  async function translateField(field: 'title' | 'eyebrow' | 'content' | 'navLabel', fromLang: 'en' | 'ar') {
    const srcKey = `${field}${fromLang === 'en' ? 'En' : 'Ar'}` as keyof typeof form
    const dstKey = `${field}${fromLang === 'en' ? 'Ar' : 'En'}` as keyof typeof form
    const text = form[srcKey] as string
    if (!text.trim()) return
    setTranslating((p) => ({ ...p, [srcKey]: true }))
    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLocale: fromLang, toLocale: fromLang === 'en' ? 'ar' : 'en' }),
      })
      if (res.ok) {
        const { translated } = await res.json()
        setForm((p) => ({ ...p, [dstKey]: translated }))
      }
    } finally {
      setTranslating((p) => ({ ...p, [srcKey]: false }))
    }
  }

  async function save() {
    setSaving(true)
    const method = page ? 'PUT' : 'POST'
    const url = page ? `/api/admin/pages/${page.id}` : '/api/admin/pages'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) onSave(await res.json())
    setSaving(false)
  }

  const inp = 'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-[#B8995D] focus:ring-2 focus:ring-[#B8995D]/20 focus:outline-none'
  const ta = `${inp} resize-y`
  const lbl = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1'

  function TranslateBtn({ field, from }: { field: 'title' | 'eyebrow' | 'content' | 'navLabel'; from: 'en' | 'ar' }) {
    const key = `${field}${from === 'en' ? 'En' : 'Ar'}`
    return (
      <button
        type="button"
        onClick={() => translateField(field, from)}
        disabled={!!translating[key]}
        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 disabled:opacity-40 transition-colors mt-1"
        title={`Auto-translate to ${from === 'en' ? 'Arabic' : 'English'}`}
      >
        {translating[key] ? <Loader2 className="h-3 w-3 animate-spin" /> : <Languages className="h-3 w-3" />}
        → {from === 'en' ? 'AR' : 'EN'}
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">{page ? 'Edit Page' : 'Create Page'}</h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} className="rounded" />
            Published
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <Globe className="h-3 w-3" />
            <input type="checkbox" checked={form.showInNav} onChange={(e) => setForm((p) => ({ ...p, showInNav: e.target.checked }))} className="rounded" />
            Show in Nav
          </label>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Slug (URL)</label>
            <input
              className={inp}
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="my-page-slug"
              disabled={!!page}
            />
            <p className="text-xs text-gray-400 mt-1">Page will be at /en/p/{form.slug || 'slug'}</p>
          </div>
          {form.showInNav && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={lbl}>Nav Label (EN)</label>
                <div>
                  <input className={inp} value={form.navLabelEn} onChange={(e) => setForm((p) => ({ ...p, navLabelEn: e.target.value }))} />
                  <TranslateBtn field="navLabel" from="en" />
                </div>
              </div>
              <div>
                <label className={lbl}>Nav Label (AR)</label>
                <input className={inp} dir="rtl" value={form.navLabelAr} onChange={(e) => setForm((p) => ({ ...p, navLabelAr: e.target.value }))} />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Eyebrow (EN)</label>
            <div>
              <input className={inp} value={form.eyebrowEn} onChange={(e) => setForm((p) => ({ ...p, eyebrowEn: e.target.value }))} placeholder="Optional label above title" />
              <TranslateBtn field="eyebrow" from="en" />
            </div>
          </div>
          <div>
            <label className={lbl}>Eyebrow (AR)</label>
            <input className={inp} dir="rtl" value={form.eyebrowAr} onChange={(e) => setForm((p) => ({ ...p, eyebrowAr: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Title (EN)</label>
            <div>
              <input className={inp} value={form.titleEn} onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))} />
              <TranslateBtn field="title" from="en" />
            </div>
          </div>
          <div>
            <label className={lbl}>Title (AR)</label>
            <input className={inp} dir="rtl" value={form.titleAr} onChange={(e) => setForm((p) => ({ ...p, titleAr: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Content (EN)</label>
            <div>
              <textarea className={ta} rows={10} value={form.contentEn} onChange={(e) => setForm((p) => ({ ...p, contentEn: e.target.value }))} placeholder="Write your page content here. Supports plain paragraphs — separate paragraphs with a blank line." />
              <TranslateBtn field="content" from="en" />
            </div>
          </div>
          <div>
            <label className={lbl}>Content (AR)</label>
            <textarea className={ta} rows={10} dir="rtl" value={form.contentAr} onChange={(e) => setForm((p) => ({ ...p, contentAr: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
        <button onClick={onCancel} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        <button onClick={save} disabled={saving || !form.titleEn || (!page && !form.slug)} className="inline-flex items-center gap-2 rounded-lg bg-[#B8995D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a0844f] disabled:opacity-50 transition-colors">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {page ? 'Save Changes' : 'Create Page'}
        </button>
      </div>
    </div>
  )
}
