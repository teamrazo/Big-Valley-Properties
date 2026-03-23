import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Listing | Big Valley Properties Dashboard',
  robots: { index: false, follow: false },
}

export default function EditListingPage({ params }: { params: { id: string } }) {
  // TODO: Fetch listing by ID from Supabase, pre-populate wizard
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/listings" className="text-cabin-timber dark:text-gray-400 hover:text-charcoal-ink dark:hover:text-white transition-colors">
          ← Back
        </Link>
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">Edit Listing</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="text-4xl mb-4">✏️</div>
        <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">Listing Editor</h3>
        <p className="text-cabin-timber dark:text-gray-400 text-sm mb-2">
          Editing listing <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{params.id}</code>
        </p>
        <p className="text-cabin-timber dark:text-gray-400 text-sm">
          The edit form will use the same wizard components as the creation flow, pre-populated with existing data from the database.
        </p>

        {/* Phase 3 locked */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-600 text-sm">
          <span>🔒</span>
          <span>&quot;Sync to MLS&quot; button will appear here in Phase 3</span>
        </div>
      </div>
    </div>
  )
}
