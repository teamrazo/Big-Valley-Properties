'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = ['All', 'Active', 'Draft', 'Pending Review', 'Sold'] as const

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('All')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">Listings</h1>
        <Link
          href="/dashboard/listings/new"
          className="px-6 py-3 bg-forest-green text-white rounded-lg font-medium text-sm hover:bg-forest-green/90 transition-colors"
        >
          + New Listing
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-forest-green text-white'
                : 'bg-white dark:bg-gray-900 text-cabin-timber dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
        <div className="text-4xl mb-4">🏠</div>
        <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">No listings yet</h3>
        <p className="text-cabin-timber dark:text-gray-400 text-sm mb-6">Create your first listing to get started.</p>
        <Link
          href="/dashboard/listings/new"
          className="inline-flex px-6 py-3 bg-forest-green text-white rounded-lg font-medium text-sm hover:bg-forest-green/90 transition-colors"
        >
          Create Listing
        </Link>
      </div>

      {/* Grayed Sync to MLS button */}
      <div className="mt-6 flex justify-end">
        <button disabled className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-400 rounded-lg text-sm cursor-not-allowed flex items-center gap-2">
          🔒 Sync to MLS
          <span className="text-xs">(Phase 3)</span>
        </button>
      </div>
    </div>
  )
}
