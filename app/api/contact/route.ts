import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { appendLeadToSheet } from '@/lib/google-sheets'

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

async function sendEmail(payload: {
  from: string
  to: string[]
  replyTo?: string
  subject: string
  html: string
  text: string
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('[Resend] send failed:', res.status, err)
  }
  return res.ok
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }

  const body = await req.json()
  const { name, title, institution, country, email, phone, type, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 })
  }

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
    appendLeadToSheet(safe).catch(() => {})

    if (process.env.RESEND_API_KEY) {
      const notifyEmail = process.env.NOTIFICATION_EMAIL ?? 'info@ehpacademy.com'

      // 1. Notify EHP — reply-to is set to enquirer's email so EHP can reply directly
      await sendEmail({
        from: 'EHP Academy Website <noreply@ehpacademy.com>',
        to: [notifyEmail],
        replyTo: safe.email,
        subject: `New Consultation Enquiry — ${safe.name}${safe.institution ? ` · ${safe.institution}` : ''}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1e1b4b">
            <div style="background:#1e1b4b;padding:28px 32px">
              <p style="margin:0;color:#B8995D;font-size:11px;letter-spacing:3px;text-transform:uppercase">EHP Academy — New Enquiry</p>
            </div>
            <div style="padding:32px;border:1px solid #e5e7eb;border-top:none">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${safe.name}</td></tr>
                ${safe.title ? `<tr><td style="padding:8px 0;color:#6b7280">Title / Role</td><td style="padding:8px 0">${safe.title}</td></tr>` : ''}
                ${safe.institution ? `<tr><td style="padding:8px 0;color:#6b7280">Institution</td><td style="padding:8px 0">${safe.institution}</td></tr>` : ''}
                ${safe.country ? `<tr><td style="padding:8px 0;color:#6b7280">Country</td><td style="padding:8px 0">${safe.country}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}" style="color:#B8995D">${safe.email}</a></td></tr>
                ${safe.phone ? `<tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${safe.phone}</td></tr>` : ''}
                ${safe.type ? `<tr><td style="padding:8px 0;color:#6b7280">Enquiry Type</td><td style="padding:8px 0">${safe.type}</td></tr>` : ''}
              </table>
              <div style="margin-top:24px;padding:20px;background:#f9fafb;border-left:3px solid #B8995D">
                <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b7280">Message</p>
                <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap">${safe.message}</p>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Hit Reply to respond directly to ${safe.name} at ${safe.email}</p>
            </div>
          </div>
        `,
        text: [
          `New Consultation Enquiry — EHP Academy`,
          '',
          `Name: ${safe.name}`,
          safe.title ? `Title: ${safe.title}` : '',
          safe.institution ? `Institution: ${safe.institution}` : '',
          safe.country ? `Country: ${safe.country}` : '',
          `Email: ${safe.email}`,
          safe.phone ? `Phone: ${safe.phone}` : '',
          safe.type ? `Enquiry Type: ${safe.type}` : '',
          '',
          `Message:`,
          safe.message,
        ].filter(Boolean).join('\n'),
      })

      // 2. Auto-reply to the enquirer
      await sendEmail({
        from: 'EHP Academy <info@ehpacademy.com>',
        to: [safe.email],
        subject: 'Your Enquiry Has Been Received — EHP Academy',
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1e1b4b">
            <div style="background:#1e1b4b;padding:28px 32px">
              <p style="margin:0;color:#B8995D;font-size:11px;letter-spacing:3px;text-transform:uppercase">EHP Academy</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:18px;font-weight:400">House of Etiquette, Hospitality &amp; Protocol</p>
            </div>
            <div style="padding:40px 32px;border:1px solid #e5e7eb;border-top:none">
              <p style="margin:0 0 20px;font-size:16px">Dear ${safe.name},</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:#374151">Thank you for reaching out to EHP Academy. We have received your consultation enquiry and a member of our advisory team will be in touch with you shortly — typically within one business day.</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:#374151">We look forward to learning more about your institution and exploring how EHP Academy can support your objectives.</p>
              <div style="margin:32px 0;padding:20px 24px;background:#f9fafb;border-left:3px solid #B8995D">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af">Your Enquiry Reference</p>
                <p style="margin:0;font-size:13px;color:#374151">${safe.type || 'General Consultation'} · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <p style="margin:0 0 6px;font-size:14px;line-height:1.8;color:#374151">With regards,</p>
              <p style="margin:0;font-size:14px;font-weight:600;color:#1e1b4b">EHP Academy Advisory Team</p>
              <p style="margin:4px 0 0;font-size:13px;color:#9ca3af">Riyadh, Kingdom of Saudi Arabia</p>
            </div>
            <div style="padding:16px 32px;background:#f9fafb;border:1px solid #e5e7eb;border-top:none">
              <p style="margin:0;font-size:11px;color:#9ca3af">EHP Academy · info@ehpacademy.com · ehpacademy.com</p>
            </div>
          </div>
        `,
        text: [
          `Dear ${safe.name},`,
          '',
          `Thank you for reaching out to EHP Academy. We have received your consultation enquiry and a member of our advisory team will be in touch with you shortly — typically within one business day.`,
          '',
          `We look forward to learning more about your institution and exploring how EHP Academy can support your objectives.`,
          '',
          `With regards,`,
          `EHP Academy Advisory Team`,
          `Riyadh, Kingdom of Saudi Arabia`,
          `info@ehpacademy.com`,
        ].join('\n'),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] submission error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
