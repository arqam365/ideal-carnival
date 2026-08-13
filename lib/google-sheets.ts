import { createSign } from 'crypto'

const HEADERS = ['Timestamp', 'Name', 'Title / Role', 'Institution', 'Country', 'Email', 'Phone', 'Enquiry Type', 'Message']
const RANGE = 'A:I'

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
  const json = await res.json() as { access_token?: string; error?: string }
  if (!json.access_token) throw new Error(`[Sheets] auth failed: ${JSON.stringify(json)}`)
  return json.access_token
}

function sheetsUrl(sheetId: string, path: string) {
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}${path}`
}

export async function initSheet(): Promise<{ ok: boolean; message: string }> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!email || !rawKey || !sheetId) return { ok: false, message: 'Missing env vars' }

  const privateKey = rawKey.replace(/\\n/g, '\n')
  const token = await getAccessToken(email, privateKey)
  const auth = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  // Read row 1 to check if headers exist
  const readRes = await fetch(sheetsUrl(sheetId, `/values/A1:I1`), {
    headers: { Authorization: `Bearer ${token}` },
  })
  const readJson = await readRes.json() as { values?: string[][] }
  const hasHeaders = readJson.values?.[0]?.[0] === HEADERS[0]

  if (!hasHeaders) {
    // Write headers to row 1
    const writeRes = await fetch(sheetsUrl(sheetId, `/values/A1:I1?valueInputOption=USER_ENTERED`), {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ values: [HEADERS] }),
    })
    if (!writeRes.ok) {
      const err = await writeRes.text()
      return { ok: false, message: `Failed to write headers: ${err}` }
    }
  }

  // Bold + freeze header row + column widths
  const metaRes = await fetch(sheetsUrl(sheetId, ''), { headers: { Authorization: `Bearer ${token}` } })
  const meta = await metaRes.json() as { sheets?: { properties: { sheetId: number } }[] }
  const sheetGid = meta.sheets?.[0]?.properties?.sheetId ?? 0

  await fetch(sheetsUrl(sheetId, ':batchUpdate'), {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      requests: [
        {
          repeatCell: {
            range: { sheetId: sheetGid, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.118, green: 0.106, blue: 0.294 }, // #1e1b4b
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: sheetGid, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        // Set Message column (I) wider
        {
          updateDimensionProperties: {
            range: { sheetId: sheetGid, dimension: 'COLUMNS', startIndex: 8, endIndex: 9 },
            properties: { pixelSize: 400 },
            fields: 'pixelSize',
          },
        },
        // Set Timestamp column (A) width
        {
          updateDimensionProperties: {
            range: { sheetId: sheetGid, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 },
            properties: { pixelSize: 180 },
            fields: 'pixelSize',
          },
        },
      ],
    }),
  })

  return { ok: true, message: hasHeaders ? 'Headers already present, formatting applied' : 'Sheet initialized with headers and formatting' }
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
    new Date().toLocaleString('en-GB', { timeZone: 'Asia/Riyadh', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    lead.name,
    lead.title ?? '',
    lead.institution ?? '',
    lead.country ?? '',
    lead.email,
    lead.phone ?? '',
    lead.type ?? '',
    lead.message,
  ]

  const res = await fetch(
    sheetsUrl(sheetId, `/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`),
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    console.error('[Sheets] append failed:', res.status, err)
    throw new Error(`Sheets append failed: ${res.status}`)
  }
}
