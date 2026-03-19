import { properties, getProperty } from '@/data/properties'
import { getAgent } from '@/data/agents'
import { notFound } from 'next/navigation'
import PropertyDetailClient from './PropertyDetailClient'

export function generateStaticParams() {
  return properties.map(p => ({ id: p.id }))
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getProperty(params.id)
  if (!property) return notFound()
  const agent = getAgent(property.agentId)

  // Find similar properties (same county or type, excluding current)
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.county === property.county || p.propertyType === property.propertyType))
    .slice(0, 3)

  return <PropertyDetailClient property={property} agent={agent || null} similarProperties={similarProperties} />
}
