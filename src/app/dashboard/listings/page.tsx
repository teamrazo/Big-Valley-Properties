'use client'

import { useState } from 'react'
import Link from 'next/link'

const statusTabs = ['All', 'Draft', 'Pending Review', 'Active', 'Under Contract', 'Sold'] as const

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<string>('All')

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">Listings</h1>
        <Link
          href="/dashboard/listings/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[44px] text-sm"
        >
          ➕ New Listing
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-[44px] ${
              activeTab === tab
                ? 'bg-forest-green text-white'
                : 'bg-white dark:bg-gray-900 text-cabin-timber dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-100 dark:border-gray-800 text-center">
        <div className="text-4xl mb-4">🏠</div>
        <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">No Listings Yet</h3>
        <p className="text-cabin-timber dark:text-gray-400 text-sm mb-6">
          Create your first property listing using the wizard.
        </p>
        <Link
          href="/dashboard/listings/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]"
        >
          ➕ Create Listing
        </Link>
      </div>

      {/* Phase 3 locked button example */}
      <div className="mt-6 flex items-center gap-2 text-gray-400 dark:text-gray-600 text-sm">
        <span>🔒</span>
        <span>Bulk &quot;Sync to MLS&quot; will be available in Phase 3</span>
      </div>
    </div>
  )
}
