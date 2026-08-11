import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function makeSessionToken(password: string): string {
  return createHmac('sha256', password).update('ehp-admin-session-v1').digest('hex')
}

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'))
}

export async function requireAdmin() {
  const jar = await cookies()
  const cookieVal = jar.get('ehp-admin')?.value
  const pw = process.env.ADMIN_PASSWORD
  if (!cookieVal || !pw || !safeCompare(cookieVal, makeSessionToken(pw))) {
    redirect('/admin/login')
  }
}

export async function isAdminRequest(cookieHeader: string | null): Promise<boolean> {
  if (!cookieHeader || !process.env.ADMIN_PASSWORD) return false
  const match = cookieHeader.match(/ehp-admin=([^;]+)/)
  if (!match) return false
  try {
    return safeCompare(match[1], makeSessionToken(process.env.ADMIN_PASSWORD))
  } catch {
    return false
  }
}
