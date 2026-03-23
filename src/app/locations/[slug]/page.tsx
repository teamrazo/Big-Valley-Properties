import { locations, getLocation } from '@/data/locations'
import { notFound } from 'next/navigation'
import LocationDetailClient from './LocationDetailClient'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = getLocation(params.slug)
  if (!location) return { title: 'Location Not Found' }
  const title = `${location.name}, CA - ${location.county} County | Big Valley Properties`
  const description = location.overview.slice(0, 160)
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/locations/${location.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/locations/${location.slug}`,
      siteName: 'Big Valley Properties',
      type: 'website',
    },
  }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = getLocation(params.slug)
  if (!location) notFound()
  return <LocationDetailClient location={location} />
}
