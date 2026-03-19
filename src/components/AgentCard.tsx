import Link from 'next/link'
import type { Agent } from '@/data/agents'

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agents/${agent.slug}`} className="group block">
      <div className="bg-white rounded overflow-hidden shadow-brand-sm border border-gray-100 hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1">
        {/* Photo placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-br from-canvas-sand to-river-stone/30 flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-forest-green font-heading text-3xl">
                {agent.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <p className="text-xs text-alpine-slate/60 italic">Photo Coming Soon</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 text-center">
          <h3 className="font-heading text-lg text-charcoal-ink group-hover:text-forest-green transition-colors">
            {agent.name}
          </h3>
          <p className="text-forest-green text-sm font-medium mt-1">{agent.title}</p>
          <p className="text-alpine-slate text-xs mt-1">{agent.licenseNumber}</p>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-cabin-timber">
            {agent.counties.map(county => (
              <span key={county} className="px-2 py-0.5 bg-canvas-sand rounded-sm">
                {county} County
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
            <p className="text-sm text-alpine-slate">{agent.phone}</p>
            <p className="text-sm text-alpine-slate">{agent.email}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
