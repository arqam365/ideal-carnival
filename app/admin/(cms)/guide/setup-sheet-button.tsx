'use client'
import { useState } from 'react'
import { Sheet } from 'lucide-react'

export function SetupSheetButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function run() {
    setState('loading')
    try {
      const res = await fetch('/api/admin/setup-sheet', { method: 'POST' })
      const json = await res.json() as { ok: boolean; message: string }
      setMsg(json.message)
      setState(json.ok ? 'ok' : 'error')
    } catch {
      setMsg('Network error')
      setState('error')
    }
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={run}
        disabled={state === 'loading'}
        className="inline-flex items-center gap-2 rounded-lg bg-[#1e1b4b] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d2a6e] disabled:opacity-50 transition-colors"
      >
        <Sheet className="h-4 w-4" />
        {state === 'loading' ? 'Setting up…' : 'Initialise Google Sheet'}
      </button>
      {msg && (
        <p className={`text-sm ${state === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{msg}</p>
      )}
    </div>
  )
}
