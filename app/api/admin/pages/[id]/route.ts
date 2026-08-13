import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { customPages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [row] = await db.select().from(customPages).where(eq(customPages.id, Number(id)))
  if (!row) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const body = await req.json()
  const { titleEn, titleAr, contentEn, contentAr, eyebrowEn, eyebrowAr, showInNav, navLabelEn, navLabelAr, published } = body

  const [row] = await db.update(customPages).set({
    titleEn, titleAr, contentEn, contentAr,
    eyebrowEn, eyebrowAr, showInNav, navLabelEn, navLabelAr, published,
  }).where(eq(customPages.id, Number(id))).returning()

  if (!row) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  await db.delete(customPages).where(eq(customPages.id, Number(id)))
  return NextResponse.json({ ok: true })
}
