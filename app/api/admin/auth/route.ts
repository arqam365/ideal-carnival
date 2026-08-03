import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE = 'ehp-admin'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const jar = await cookies()
  jar.set(COOKIE, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/admin',
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const jar = await cookies()
  jar.delete(COOKIE)
  return NextResponse.json({ ok: true })
}
