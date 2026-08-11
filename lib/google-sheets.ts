import { createSign } from 'crypto'

function b64url(input: string | Buffer): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }))
  const unsigned = `${header}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.write(unsigned)
  signer.end()
  const sig = b64url(signer.sign(privateKey))
  const jwt = `${unsigned}.${sig}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const json = await res.json() as { access_token: string }
  return json.access_token
}

export async function appendLeadToSheet(lead: {
  name: string; title: string | null; institution: string | null
  country: string | null; email: string; phone: string | null
  type: string | null; message: string
}): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!email || !rawKey || !sheetId) return

  const privateKey = rawKey.replace(/\\n/g, '\n')
  const token = await getAccessToken(email, privateKey)

  const row = [
    new Date().toISOString(),
    lead.name,
    lead.title ?? '',
    lead.institution ?? '',
    lead.country ?? '',
    lead.email,
    lead.phone ?? '',
    lead.type ?? '',
    lead.message,
  ]

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/Leads!A:I:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
}
