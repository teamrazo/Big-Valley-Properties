import Link from 'next/link'
import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export const metadata: Metadata = {
  title: 'Blog | Big Valley Properties',
  description: 'Real estate news, guides, and insights for Trinity and Shasta County, California.',
  alternates: { canonical: `${BASE_URL}/blog` },
}

export default function BlogPage() {
  // TODO: Fetch posts from Sanity via getPosts() when project is created
  return (
    <>
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container-bvp text-center">
          <h1 className="font-heading text-h1 text-white mb-3">Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Real estate news, market updates, and living guides for Trinity and Shasta County.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bvp">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-heading text-lg text-charcoal-ink dark:text-white mb-2">Coming Soon</h3>
            <p className="text-cabin-timber dark:text-gray-400 text-sm mb-4">
              Blog posts will appear here once content is published in the CMS.
            </p>
            <Link href="/contact" className="text-forest-green hover:text-deep-pine text-sm font-medium underline">
              Contact us for market insights →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
