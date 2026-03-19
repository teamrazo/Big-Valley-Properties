import { getFeaturedProperties, getPropertiesByCounty } from '@/data/properties'
import { agents, getAgentsByCounty } from '@/data/agents'
import HomeClient from '@/components/HomeClient'

export default function HomePage() {
  const featured = getFeaturedProperties()
  const trinityProperties = getPropertiesByCounty('Trinity').slice(0, 3)
  const shastaProperties = getPropertiesByCounty('Shasta').slice(0, 3)
  const trinityAgents = getAgentsByCounty('Trinity')
  const shastaAgents = getAgentsByCounty('Shasta')

  return (
    <HomeClient
      featured={featured}
      trinityProperties={trinityProperties}
      shastaProperties={shastaProperties}
      trinityAgents={trinityAgents}
      shastaAgents={shastaAgents}
      allAgents={agents}
    />
  )
}
