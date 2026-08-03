import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'

export async function POST(req: NextRequest) {
  const { name, title, institution, country, email, phone, type, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await db.insert(leads).values({ name, title, institution, country, email, phone, type, message })

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'EHP Academy Website <noreply@ehpacademy.sa>',
          to: [process.env.NOTIFICATION_EMAIL],
          subject: `New enquiry from ${name} — ${type || 'General'}`,
          text: [
            `Name: ${name}`,
            `Title: ${title || '—'}`,
            `Institution: ${institution || '—'}`,
            `Country: ${country || '—'}`,
            `Email: ${email}`,
            `Phone: ${phone || '—'}`,
            `Type: ${type || '—'}`,
            '',
            `Message:\n${message}`,
          ].join('\n'),
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact/route]', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
