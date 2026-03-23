import { getFeaturedProperties, getPropertiesByCounty } from '@/data/properties'
import { agents, getAgentsByCounty } from '@/data/agents'
import HomeClient from '@/components/HomeClient'
import { generateLocalBusinessJsonLd } from '@/lib/jsonLd'

export default function HomePage() {
  const featured = getFeaturedProperties()
  const trinityProperties = getPropertiesByCounty('Trinity').slice(0, 3)
  const shastaProperties = getPropertiesByCounty('Shasta').slice(0, 3)
  const trinityAgents = getAgentsByCounty('Trinity')
  const shastaAgents = getAgentsByCounty('Shasta')
  const jsonLd = generateLocalBusinessJsonLd()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient
        featured={featured}
        trinityProperties={trinityProperties}
        shastaProperties={shastaProperties}
        trinityAgents={trinityAgents}
        shastaAgents={shastaAgents}
        allAgents={agents}
      />
    </>
  )
}
