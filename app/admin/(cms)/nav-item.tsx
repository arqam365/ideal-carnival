'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Lightbulb, Users, GraduationCap, Briefcase } from 'lucide-react'

const NAV = [
  { label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
  { label: 'Insights', href: '/admin/insights', Icon: Lightbulb },
  { label: 'Faculty', href: '/admin/faculty', Icon: Users },
  { label: 'Programs', href: '/admin/programs', Icon: GraduationCap },
  { label: 'Case Studies', href: '/admin/case-studies', Icon: Briefcase },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {NAV.map(({ label, href, Icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? 'bg-[#312e81] text-white' : 'text-[#c7d2fe] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-[#818cf8]'}`} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
