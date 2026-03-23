'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Listings', href: '/dashboard/listings', icon: '🏠' },
  { label: 'Approvals', href: '/dashboard/approvals', icon: '✅' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-var(--nav-height))]">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-forest-green text-white p-3 rounded-full shadow-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-[var(--nav-height)] left-0 z-40 w-64 h-[calc(100vh-var(--nav-height))] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-200 overflow-y-auto`}>
        <div className="p-6">
          <h2 className="font-heading text-lg text-charcoal-ink dark:text-white mb-6">Dashboard</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-forest-green/10 text-forest-green dark:bg-forest-green/20'
                    : 'text-cabin-timber dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Phase 3 locked card */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <span>🔒</span>
              <span className="text-sm font-medium text-gray-500">MLS Sync Status</span>
            </div>
            <p className="text-xs text-gray-400">Coming in Phase 3</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 bg-canvas-sand dark:bg-gray-950">
        {children}
      </main>
    </div>
  )
}
