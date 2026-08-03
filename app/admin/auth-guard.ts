import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const jar = await cookies()
  if (jar.get('ehp-admin')?.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login')
  }
}

export async function isAdminRequest(cookieHeader: string | null): Promise<boolean> {
  if (!cookieHeader) return false
  const match = cookieHeader.match(/ehp-admin=([^;]+)/)
  return match?.[1] === process.env.ADMIN_PASSWORD
}
