import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const CONTENT_PATHS = ['/insights', '/case-studies', '/faculty']
const LOCALES = ['en', 'ar']

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const locale of LOCALES) {
    for (const path of CONTENT_PATHS) {
      revalidatePath(`/${locale}${path}`)
    }
  }

  return NextResponse.json({ revalidated: true, paths: CONTENT_PATHS, locales: LOCALES })
}

// Allow GET so client can trigger via browser or webhook URL
export async function GET(req: NextRequest) {
  return POST(req)
}
