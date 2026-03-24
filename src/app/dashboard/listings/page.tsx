'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Listing = {
  id: string
  status: string
  propertyType: string
  streetAddress: string
  city: string
  county: string
  listPrice: number
  bedrooms: number
  bathrooms: number
  livingArea: number | null
  updatedAt: string
  agent: { firstName: string; lastName: string }
}

const statusTabs = ['All', 'DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'UNDER_CONTRACT', 'SOLD'] as const

const statusLabels: Record<string, string> = {
  DRAFT: 'Draft',
  PENDING_REVIEW: 'Pending Review',
  ACTIVE: 'Active',
  UNDER_CONTRACT: 'Under Contract',
  SOLD: 'Sold',
  WITHDRAWN: 'Withdrawn',
  EXPIRED: 'Expired',
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  PENDING_REVIEW: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  UNDER_CONTRACT: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  SOLD: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  WITHDRAWN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      setError(null)
      try {
        const params = activeTab !== 'All' ? `?status=${activeTab}` : ''
        const res = await fetch(`/api/listings${params}`)
        if (!res.ok) throw new Error('Failed to load listings')
        setListings(await res.json())
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [activeTab])

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
            {tab === 'All' ? 'All' : statusLabels[tab] || tab}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-cabin-timber dark:text-gray-400">Loading listings...</div>
      )}

      {/* Listings grid */}
      {!loading && listings.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/dashboard/listings/${listing.id}/edit`}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-forest-green dark:hover:border-forest-green transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[listing.status] || statusColors.DRAFT}`}>
                  {statusLabels[listing.status] || listing.status}
                </span>
                <span className="text-xs text-cabin-timber dark:text-gray-500">
                  {listing.propertyType}
                </span>
              </div>
              <h3 className="font-heading text-base text-charcoal-ink dark:text-white mb-1 line-clamp-1">
                {listing.streetAddress}
              </h3>
              <p className="text-sm text-cabin-timber dark:text-gray-400 mb-3">
                {listing.city}, {listing.county} County
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg text-forest-green">
                  ${listing.listPrice.toLocaleString()}
                </span>
                <span className="text-xs text-cabin-timber dark:text-gray-500">
                  {listing.bedrooms}bd / {listing.bathrooms}ba
                  {listing.livingArea ? ` / ${listing.livingArea.toLocaleString()}sf` : ''}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && listings.length === 0 && !error && (
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
      )}

      {/* Phase 3 locked */}
      <div className="mt-6 flex items-center gap-2 text-gray-400 dark:text-gray-600 text-sm">
        <span>🔒</span>
        <span>Bulk &quot;Sync to MLS&quot; will be available in Phase 3</span>
      </div>
    </div>
  )
}
