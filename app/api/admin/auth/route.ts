import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { makeSessionToken } from '@/app/admin/auth-guard'

const COOKIE = 'ehp-admin'
const MAX_AGE = 60 * 60 * 8

// In-memory rate limiter — resets on cold start, sufficient for serverless
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 10

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_ATTEMPTS) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  const { password } = await req.json()
  const pw = process.env.ADMIN_PASSWORD
  if (!pw || !password || password !== pw) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = makeSessionToken(pw)
  const jar = await cookies()
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
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
