import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/app/admin/auth-guard'

const LANG: Record<string, string> = { en: 'English', ar: 'Arabic' }

export async function POST(req: NextRequest) {
  await requireAdmin()
  const { text, fromLocale, toLocale } = await req.json() as { text: string; fromLocale: string; toLocale: string }
  if (!text?.trim()) return NextResponse.json({ translated: '' })

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Translate the following ${LANG[fromLocale]} text to ${LANG[toLocale]}. Return ONLY the translated text with no explanation, no quotes, no prefix:\n\n${text}`,
      }],
    }),
  })

  if (!res.ok) return NextResponse.json({ error: 'Translation failed' }, { status: 502 })

  const data = await res.json()
  const translated: string = data.content?.[0]?.text ?? ''
  return NextResponse.json({ translated })
}
