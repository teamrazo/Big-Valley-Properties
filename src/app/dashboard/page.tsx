export default function DashboardPage() {
  const stats = [
    { label: 'Active Listings', value: '—', icon: '🏠' },
    { label: 'Pending Review', value: '—', icon: '⏳' },
    { label: 'Leads This Month', value: '—', icon: '📩' },
    { label: 'Total Sold', value: '—', icon: '🎉' },
  ]

  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-8">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-bold text-charcoal-ink dark:text-white">{stat.value}</p>
            <p className="text-sm text-cabin-timber dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="font-heading text-lg text-charcoal-ink dark:text-white mb-4">Recent Activity</h2>
          <p className="text-cabin-timber dark:text-gray-400 text-sm">No activity yet. Create your first listing to get started.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="font-heading text-lg text-charcoal-ink dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/dashboard/listings/new" className="block w-full text-left px-4 py-3 rounded-lg bg-forest-green/10 text-forest-green hover:bg-forest-green/20 transition-colors text-sm font-medium">
              + Create New Listing
            </a>
            <a href="/dashboard/profile" className="block w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-cabin-timber dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
