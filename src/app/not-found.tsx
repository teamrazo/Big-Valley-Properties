import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-bvp text-center max-w-2xl">
        <div className="text-6xl mb-6">🏔️</div>
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-4">Page Not Found</h1>
        <p className="text-cabin-timber dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Try browsing our listings or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 bg-forest-green text-white rounded-lg font-medium text-sm hover:bg-forest-green/90 transition-colors">
            Go Home
          </Link>
          <Link href="/properties" className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg font-medium text-sm text-charcoal-ink dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            View Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
