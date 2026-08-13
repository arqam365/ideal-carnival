import type { ReactNode } from 'react'
import Image from 'next/image'
import { SidebarNav } from './nav-item'
import { SignOutButton } from './sign-out-button'

export default function CmsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <aside className="flex w-60 shrink-0 flex-col" style={{ backgroundColor: '#1e1b4b' }}>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B8995D]/20 shrink-0">
              <Image src="/images/ehp-icon.png" alt="EHP" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">EHP Academy</p>
              <p className="text-[10px] font-medium tracking-wider" style={{ color: '#B8995D' }}>CONTENT MANAGEMENT</p>
            </div>
          </div>
        </div>

        <SidebarNav />

        <div className="px-3 py-4 border-t border-white/10">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center border-b border-gray-200 bg-white px-8 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#B8995D]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">EHP Academy — Admin</span>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
