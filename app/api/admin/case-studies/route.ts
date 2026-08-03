import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { caseStudies } from '@/lib/db/schema'
import { isAdminRequest } from '@/app/admin/auth-guard'

async function auth(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function GET(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const data = await db.select().from(caseStudies).orderBy(caseStudies.id)
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const body = await req.json()
  const [row] = await db.insert(caseStudies).values(body).returning()
  return NextResponse.json(row, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const id = Number(req.nextUrl.searchParams.get('id'))
  const body = await req.json()
  const [row] = await db.update(caseStudies).set(body).where(eq(caseStudies.id, id)).returning()
  return NextResponse.json(row)
}

export async function DELETE(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const id = Number(req.nextUrl.searchParams.get('id'))
  await db.delete(caseStudies).where(eq(caseStudies.id, id))
  return NextResponse.json({ deleted: id })
}
