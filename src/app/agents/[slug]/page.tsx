import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import { agents, getAgent } from '@/data/agents'
import { properties } from '@/data/properties'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return agents.map(a => ({ slug: a.slug }))
}

export default function AgentDetailPage({ params }: { params: { slug: string } }) {
  const agent = getAgent(params.slug)
  if (!agent) return notFound()

  const agentProperties = properties.filter(p => p.agentId === agent.id)

  return (
    <>
      {/* Profile Header */}
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container-bvp">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/agents" className="hover:text-white">Our Team</Link>
            <span>/</span>
            <span className="text-white">{agent.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/10 flex items-center justify-center shrink-0 border-4 border-white/20">
              <span className="text-white font-heading text-5xl">
                {agent.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="font-heading text-h1 text-white mb-1">{agent.name}</h1>
              <p className="text-river-stone text-lg font-medium mb-1">{agent.title}</p>
              <p className="text-white/60 text-sm mb-6">{agent.licenseNumber}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {agent.counties.map(county => (
                  <span key={county} className="px-3 py-1 bg-white/10 text-white text-sm rounded">
                    {county} County
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="btn-primary bg-white text-forest-green hover:bg-gray-100">
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="btn-outline border-white text-white hover:bg-white hover:text-forest-green">
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio & Details */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-h3 text-charcoal-ink mb-4">About {agent.name.split(' ')[0]}</h2>
              <p className="text-cabin-timber leading-relaxed text-lg">{agent.bio}</p>
            </div>

            <div>
              <h3 className="font-heading text-h4 text-charcoal-ink mb-4">Specialties</h3>
              <div className="space-y-2 mb-8">
                {agent.specialties.map(s => (
                  <div key={s} className="flex items-center gap-3 text-sm text-cabin-timber">
                    <svg className="w-4 h-4 text-forest-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {s}
                  </div>
                ))}
              </div>

              {(agent.social.facebook || agent.social.instagram || agent.social.linkedin) && (
                <>
                  <h3 className="font-heading text-h4 text-charcoal-ink mb-4">Connect</h3>
                  <div className="flex gap-3">
                    {agent.social.facebook && (
                      <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green transition-colors" aria-label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                    )}
                    {agent.social.instagram && (
                      <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green transition-colors" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                    )}
                    {agent.social.linkedin && (
                      <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green transition-colors" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Agent's Listings */}
      {agentProperties.length > 0 && (
        <section className="section-padding bg-canvas-sand">
          <div className="container-bvp">
            <h2 className="section-heading mb-8">{agent.name.split(' ')[0]}&apos;s Listings</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {agentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
