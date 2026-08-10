'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={signOut}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#c7d2fe] transition-colors hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4 shrink-0 text-[#818cf8]" />
      Sign Out
    </button>
  )
}
