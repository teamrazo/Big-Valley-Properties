import { locations, getLocationsByCounty } from '@/data/locations'
import type { Metadata } from 'next'
import LocationsOverviewClient from './LocationsOverviewClient'

export const metadata: Metadata = {
  title: 'Service Areas — Trinity & Shasta County Communities | Big Valley Properties',
  description:
    'Explore 8 beautiful Northern California communities served by Big Valley Properties. From the historic charm of Weaverville to the vibrant city of Redding, find your perfect home.',
}

export default function LocationsPage() {
  const trinity = getLocationsByCounty('Trinity')
  const shasta = getLocationsByCounty('Shasta')
  return <LocationsOverviewClient trinity={trinity} shasta={shasta} />
}
