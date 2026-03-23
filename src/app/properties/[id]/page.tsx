import { properties, getProperty } from '@/data/properties'
import { getAgent } from '@/data/agents'
import { notFound } from 'next/navigation'
import PropertyDetailClient from './PropertyDetailClient'
import { generatePropertyJsonLd } from '@/lib/jsonLd'
import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export function generateStaticParams() {
  return properties.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = getProperty(params.id)
  if (!property) return { title: 'Property Not Found' }
  const title = `${property.title} | ${property.city}, ${property.county} County | Big Valley Properties`
  const description = property.description.slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/properties/${property.id}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/properties/${property.id}`,
      siteName: 'Big Valley Properties',
      images: property.images?.[0] ? [{ url: `${BASE_URL}${property.images[0]}` }] : [],
      type: 'website',
    },
  }
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getProperty(params.id)
  if (!property) return notFound()
  const agent = getAgent(property.agentId)

  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.county === property.county || p.propertyType === property.propertyType))
    .slice(0, 3)

  const jsonLd = generatePropertyJsonLd(property)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PropertyDetailClient property={property} agent={agent || null} similarProperties={similarProperties} />
    </>
  )
}
