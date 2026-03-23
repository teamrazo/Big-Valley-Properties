import type { Property } from '@/data/properties'
import type { Agent } from '@/data/agents'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export function generatePropertyJsonLd(property: Property) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${BASE_URL}/properties/${property.id}`,
    datePosted: new Date().toISOString(),
    image: property.images?.[0] ? `${BASE_URL}${property.images[0]}` : undefined,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: property.status === 'Active' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: 'CA',
      postalCode: property.zip,
      addressCountry: 'US',
    },
    floorSize: property.sqft ? { '@type': 'QuantitativeValue', value: property.sqft, unitCode: 'FTK' } : undefined,
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
  }
}

export function generateAgentJsonLd(agent: Agent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: agent.name,
    jobTitle: agent.title,
    url: `${BASE_URL}/agents/${agent.slug}`,
    image: agent.photo ? `${BASE_URL}${agent.photo}` : undefined,
    telephone: agent.phone,
    email: agent.email,
    worksFor: {
      '@type': 'RealEstateAgent',
      name: 'Big Valley Properties',
      url: BASE_URL,
    },
    knowsAbout: agent.specialties,
  }
}

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Big Valley Properties',
    url: BASE_URL,
    description: 'Big Valley Properties is the leading brokerage serving Trinity and Shasta Counties, California.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Weaverville',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Trinity County, CA' },
      { '@type': 'AdministrativeArea', name: 'Shasta County, CA' },
    ],
    telephone: '(530) 410-1992',
  }
}
