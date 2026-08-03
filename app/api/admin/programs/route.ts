import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'
import { isAdminRequest } from '@/app/admin/auth-guard'

async function auth(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function GET(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const data = await db.select().from(programs).orderBy(programs.sortOrder)
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const body = await req.json()
  const [row] = await db.insert(programs).values(body).returning()
  return NextResponse.json(row, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const id = Number(req.nextUrl.searchParams.get('id'))
  const body = await req.json()
  const [row] = await db.update(programs).set(body).where(eq(programs.id, id)).returning()
  return NextResponse.json(row)
}

export async function DELETE(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const id = Number(req.nextUrl.searchParams.get('id'))
  await db.delete(programs).where(eq(programs.id, id))
  return NextResponse.json({ deleted: id })
}
