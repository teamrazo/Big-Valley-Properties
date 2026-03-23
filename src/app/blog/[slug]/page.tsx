import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // TODO: Fetch from Sanity via getPostBySlug(params.slug)
  return {
    title: `Blog Post | Big Valley Properties`,
    alternates: { canonical: `${BASE_URL}/blog/${params.slug}` },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // TODO: Fetch post from Sanity by slug — return notFound() if not found
  return (
    <section className="section-padding">
      <div className="container-bvp max-w-3xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
          <h1 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">Blog Post</h1>
          <p className="text-cabin-timber dark:text-gray-400 text-sm">
            This post will load from the CMS once Sanity is configured.
          </p>
          <p className="text-xs text-gray-400 mt-2">Slug: {params.slug}</p>
        </div>
      </div>
    </section>
  )
}
