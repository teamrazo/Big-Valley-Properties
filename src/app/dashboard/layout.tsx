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

const phase3Items = [
  { label: 'MLS Sync', href: '#', icon: '🔒', locked: true },
  { label: 'IDX Search', href: '#', icon: '🔒', locked: true },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-var(--nav-height))]">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-forest-green text-white p-3 rounded-full shadow-lg min-w-[48px] min-h-[48px]"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-[var(--nav-height)] left-0 z-40 w-64 h-[calc(100vh-var(--nav-height))] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-200 overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="font-heading text-sm tracking-brand-wider text-cabin-timber dark:text-gray-500 uppercase mb-6">
            Dashboard
          </h2>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    active
                      ? 'bg-forest-green/10 text-forest-green dark:bg-forest-green/20 dark:text-green-400'
                      : 'text-charcoal-ink dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Phase 3 locked items */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-heading text-xs tracking-brand-wider text-cabin-timber/50 dark:text-gray-600 uppercase mb-3">
              Phase 3 — Coming Soon
            </h3>
            <nav className="space-y-1">
              {phase3Items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed min-h-[44px]"
                  title="Available after MLS integration (Phase 3)"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 bg-canvas-sand dark:bg-gray-950 min-w-0">
        {children}
      </main>
    </div>
  )
}
