import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/app/admin/auth-guard'

const LANG: Record<string, string> = { en: 'English', ar: 'Arabic' }

export async function POST(req: NextRequest) {
  await requireAdmin()
  const { text, fromLocale, toLocale } = await req.json() as { text: string; fromLocale: string; toLocale: string }
  if (!text?.trim()) return NextResponse.json({ translated: '' })

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 2048,
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in formal business and institutional content. Translate accurately and naturally. Return ONLY the translated text with no explanation, no quotes, no prefix.`,
        },
        {
          role: 'user',
          content: `Translate the following ${LANG[fromLocale]} text to ${LANG[toLocale]}:\n\n${text}`,
        },
      ],
    }),
  })

  if (!res.ok) return NextResponse.json({ error: 'Translation failed' }, { status: 502 })

  const data = await res.json()
  const translated: string = data.choices?.[0]?.message?.content ?? ''
  return NextResponse.json({ translated })
}
