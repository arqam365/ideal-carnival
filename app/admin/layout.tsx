import type { ReactNode } from 'react'
import Link from 'next/link'
import '@/app/globals.css'

const NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Insights', href: '/admin/insights' },
  { label: 'Faculty', href: '/admin/faculty' },
  { label: 'Case Studies', href: '/admin/case-studies' },
  { label: 'Programs', href: '/admin/programs' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <aside className="w-52 shrink-0 border-r border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">EHP Admin</span>
            </div>
            <nav className="p-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            <header className="border-b border-gray-200 bg-white px-8 py-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">EHP Academy — Content Management</span>
            </header>
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
