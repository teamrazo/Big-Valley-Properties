import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Big Valley Properties',
  robots: { index: false, follow: false },
}

const stats = [
  { label: 'Active Listings', value: '—', icon: '🏠', color: 'bg-green-50 dark:bg-green-900/20' },
  { label: 'Pending Review', value: '—', icon: '⏳', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { label: 'Agents Online', value: '—', icon: '👥', color: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'New Leads', value: '—', icon: '📩', color: 'bg-purple-50 dark:bg-purple-900/20' },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-8">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} rounded-xl p-5 border border-gray-100 dark:border-gray-800`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-heading text-h2 text-charcoal-ink dark:text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-cabin-timber dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <a
          href="/dashboard/listings/new"
          className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-luxury transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-forest-green/10 flex items-center justify-center text-xl group-hover:bg-forest-green/20 transition-colors">
              ➕
            </div>
            <div>
              <h3 className="font-heading text-lg text-charcoal-ink dark:text-white">New Listing</h3>
              <p className="text-sm text-cabin-timber dark:text-gray-400">Create a property listing with the wizard</p>
            </div>
          </div>
        </a>

        <a
          href="/dashboard/approvals"
          className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-luxury transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-xl group-hover:bg-yellow-100 transition-colors">
              ✅
            </div>
            <div>
              <h3 className="font-heading text-lg text-charcoal-ink dark:text-white">Pending Review</h3>
              <p className="text-sm text-cabin-timber dark:text-gray-400">Review and approve agent submissions</p>
            </div>
          </div>
        </a>
      </div>

      {/* Phase 3 MLS Sync card — locked */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 opacity-60">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">🔒</span>
          <h3 className="font-heading text-lg text-charcoal-ink dark:text-white">MLS Sync Status</h3>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">Phase 3</span>
        </div>
        <p className="text-sm text-cabin-timber dark:text-gray-500 mb-4">
          Sync your listings directly to NorCal MLS. One click — no double entry.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-400">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="font-heading text-lg">—</div>
            <div>Synced</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="font-heading text-lg">—</div>
            <div>Pending</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="font-heading text-lg">—</div>
            <div>Errors</div>
          </div>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8">
        <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800 text-center">
          <p className="text-cabin-timber dark:text-gray-400 text-sm">
            Activity feed will populate once the database is connected.
          </p>
        </div>
      </div>
    </div>
  )
}
