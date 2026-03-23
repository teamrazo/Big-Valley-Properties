import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Big Valley Properties',
  description: 'Real estate news, guides, and insights for Trinity and Shasta County, California.',
}

export default function BlogPage() {
  return (
    <section className="section-padding">
      <div className="container-bvp">
        <h1 className="section-heading mb-4">Blog</h1>
        <p className="text-cabin-timber dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Real estate news, market updates, and living guides for Trinity and Shasta County.
        </p>

        {/* Placeholder — will populate from Sanity */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">Coming Soon</h3>
          <p className="text-cabin-timber dark:text-gray-400 text-sm">Blog posts will appear here once content is published in the CMS.</p>
        </div>
      </div>
    </section>
  )
}
