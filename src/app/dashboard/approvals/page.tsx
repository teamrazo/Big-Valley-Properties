import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Approvals | Big Valley Properties Dashboard',
  robots: { index: false, follow: false },
}

export default function ApprovalsPage() {
  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-6">Pending Approvals</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-100 dark:border-gray-800 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">No Pending Approvals</h3>
        <p className="text-cabin-timber dark:text-gray-400 text-sm">
          When agents submit listings for review, they&apos;ll appear here for broker approval.
        </p>
      </div>
    </div>
  )
}
