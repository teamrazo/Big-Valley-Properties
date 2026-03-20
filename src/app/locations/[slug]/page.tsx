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
  return {
    title: `${location.name}, CA - ${location.county} County | Big Valley Properties`,
    description: location.overview.slice(0, 160),
  }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = getLocation(params.slug)
  if (!location) notFound()
  return <LocationDetailClient location={location} />
}
