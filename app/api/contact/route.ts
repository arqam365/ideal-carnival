import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'

// In-memory rate limiter: max 5 submissions per IP per 10 minutes
const submissions = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = submissions.get(ip)
  if (!entry || now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX) return false
  entry.count++
  return true
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }

  const body = await req.json()
  const { name, title, institution, country, email, phone, type, message } = body

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validate formats and lengths
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 })
  }

  // Sanitize: trim all string inputs
  const safe = {
    name: name.trim().slice(0, 200),
    title: title?.trim().slice(0, 200) || null,
    institution: institution?.trim().slice(0, 200) || null,
    country: country?.trim().slice(0, 100) || null,
    email: email.trim().toLowerCase().slice(0, 200),
    phone: phone?.trim().slice(0, 50) || null,
    type: type?.trim().slice(0, 100) || null,
    message: message.trim().slice(0, 5000),
  }

  try {
    await db.insert(leads).values(safe)

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'EHP Academy Website <noreply@ehpacademy.com>',
          to: [process.env.NOTIFICATION_EMAIL],
          subject: `New enquiry from ${safe.name} — ${safe.type || 'General'}`,
          text: [
            `Name: ${safe.name}`,
            `Title: ${safe.title || '—'}`,
            `Institution: ${safe.institution || '—'}`,
            `Country: ${safe.country || '—'}`,
            `Email: ${safe.email}`,
            `Phone: ${safe.phone || '—'}`,
            `Type: ${safe.type || '—'}`,
            '',
            `Message:\n${safe.message}`,
          ].join('\n'),
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
