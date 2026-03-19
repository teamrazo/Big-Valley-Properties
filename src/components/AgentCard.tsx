import Link from 'next/link'
import Image from 'next/image'
import type { Agent } from '@/data/agents'

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agents/${agent.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-brand-sm dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-brand-md dark:hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
        {/* Photo */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Glassmorphism overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="glass-card rounded-lg px-4 py-3 text-center">
              <p className="text-white text-sm font-medium">View Profile</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 text-center">
          <h3 className="font-heading text-lg text-charcoal-ink dark:text-white group-hover:text-forest-green dark:group-hover:text-river-stone transition-colors">
            {agent.name}
          </h3>
          <p className="text-forest-green dark:text-river-stone text-sm font-medium mt-1">{agent.title}</p>
          <p className="text-alpine-slate dark:text-gray-500 text-xs mt-1">{agent.licenseNumber}</p>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-cabin-timber dark:text-gray-400">
            {agent.counties.map(county => (
              <span key={county} className="px-2 py-0.5 bg-canvas-sand dark:bg-gray-800 rounded-sm">
                {county} County
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
            <p className="text-sm text-alpine-slate dark:text-gray-400">{agent.phone}</p>
            <p className="text-sm text-alpine-slate dark:text-gray-400">{agent.email}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
