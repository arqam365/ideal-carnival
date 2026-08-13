import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { customPages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  await requireAdmin()
  const rows = await db.select().from(customPages).orderBy(desc(customPages.createdAt))
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  await requireAdmin()
  const body = await req.json()
  const { slug, titleEn, titleAr, contentEn, contentAr, eyebrowEn, eyebrowAr, showInNav, navLabelEn, navLabelAr, published } = body
  if (!slug || !titleEn) return NextResponse.json({ error: 'slug and titleEn required' }, { status: 400 })

  const [row] = await db.insert(customPages).values({
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    titleEn, titleAr: titleAr ?? '',
    contentEn: contentEn ?? '', contentAr: contentAr ?? '',
    eyebrowEn: eyebrowEn ?? '', eyebrowAr: eyebrowAr ?? '',
    showInNav: showInNav ?? false,
    navLabelEn: navLabelEn ?? '', navLabelAr: navLabelAr ?? '',
    published: published ?? false,
  }).returning()

  return NextResponse.json(row, { status: 201 })
}
