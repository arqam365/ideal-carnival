'use client'

import { useState, useRef } from 'react'
import { Check, Loader2, Globe } from 'lucide-react'
import type { SiteConfigRow } from '@/lib/site-config'

const LONG_FIELDS = new Set([
  'home.hero.body', 'about.hero.intro', 'about.story.p1', 'about.story.p2',
  'about.story.p3', 'about.vision.text', 'about.mission.text',
  'about.leadership.quote', 'about.leadership.body',
  'cta.defaultTitle', 'cta.defaultBody', 'footer.tagline',
])

export function ContentEditor({ enRows, arRows }: { enRows: SiteConfigRow[]; arRows: SiteConfigRow[] }) {
  const [locale, setLocale] = useState<'en' | 'ar'>('en')
  const rows = locale === 'en' ? enRows : arRows

  const sections = Array.from(new Set(rows.map((r) => r.section)))

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Edit any field and click Save. Changes go live immediately after saving.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setLocale('en')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${locale === 'en' ? 'bg-[#B8995D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Globe className="h-3 w-3" /> English
          </button>
          <button
            onClick={() => setLocale('ar')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${locale === 'ar' ? 'bg-[#B8995D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Globe className="h-3 w-3" /> Arabic
          </button>
        </div>
      </div>

      {locale === 'ar' && arRows.length === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          No Arabic content configured yet. Arabic content uses the same keys — type in the Arabic translation for each field and save.
        </div>
      )}

      {sections.map((section) => (
        <div key={section} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-900">{section}</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {rows.filter((r) => r.section === section).map((row) => (
              <FieldRow key={row.key} row={row} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FieldRow({ row, locale }: { row: SiteConfigRow; locale: string }) {
  const [value, setValue] = useState(row.value)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const savedValue = useRef(row.value)
  const isLong = LONG_FIELDS.has(row.key)
  const isDirty = value !== savedValue.current

  async function save() {
    setStatus('saving')
    const res = await fetch('/api/admin/site-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: row.key, locale, value }),
    })
    if (res.ok) {
      savedValue.current = value
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } else {
      setStatus('error')
    }
  }

  return (
    <div className={`px-6 py-5 ${locale === 'ar' ? 'text-right' : ''}`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {row.label}
        </label>
        <span className="text-[10px] font-mono text-gray-300 shrink-0">{row.key}</span>
      </div>

      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-[#B8995D] focus:ring-2 focus:ring-[#B8995D]/20 focus:outline-none resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:border-[#B8995D] focus:ring-2 focus:ring-[#B8995D]/20 focus:outline-none"
        />
      )}

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {status === 'error' && <span className="text-red-500">Failed to save — try again</span>}
          {status === 'saved' && <span className="text-emerald-600 flex items-center gap-1"><Check className="h-3 w-3" /> Saved</span>}
          {isDirty && status === 'idle' && <span className="text-amber-500">Unsaved changes</span>}
        </span>
        <button
          onClick={save}
          disabled={!isDirty || status === 'saving'}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40 bg-[#B8995D] text-white hover:bg-[#a0844f] disabled:cursor-not-allowed"
        >
          {status === 'saving' ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
          Save
        </button>
      </div>
    </div>
  )
}
