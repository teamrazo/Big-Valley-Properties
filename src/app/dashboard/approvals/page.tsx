export default function ApprovalsPage() {
  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-8">Listing Approvals</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">No pending approvals</h3>
        <p className="text-cabin-timber dark:text-gray-400 text-sm">Listings submitted for review will appear here for broker approval.</p>
      </div>
    </div>
  )
}
