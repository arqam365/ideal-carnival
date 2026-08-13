import { NextResponse } from 'next/server'
import { initSheet } from '@/lib/google-sheets'
import { requireAdmin } from '@/app/admin/auth-guard'

export async function POST() {
  await requireAdmin()

  try {
    const result = await initSheet()
    return NextResponse.json(result)
  } catch (err) {
    console.error('[setup-sheet]', err)
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 })
  }
}
