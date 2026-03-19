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

  return <PropertyDetailClient property={property} agent={agent || null} />
}
