import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/app/admin/auth-guard'

const PATHS = ['/insights', '/case-studies', '/faculty', '/programs']
const LOCALES = ['en', 'ar']

export async function POST(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  for (const locale of LOCALES) {
    for (const path of PATHS) {
      revalidatePath(`/${locale}${path}`)
    }
  }
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
