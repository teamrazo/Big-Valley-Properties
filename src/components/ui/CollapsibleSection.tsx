'use client'

import { useState } from 'react'

interface Props {
  title: string
  icon?: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function CollapsibleSection({ title, icon, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px]"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-charcoal-ink dark:text-gray-200">
          {icon && <span>{icon}</span>}
          {title}
        </span>
        <span className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <div
        className={`transition-all duration-200 overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </div>
  )
}
