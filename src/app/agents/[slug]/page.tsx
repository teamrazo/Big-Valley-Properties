import Link from 'next/link'
import Image from 'next/image'
import PropertyCard from '@/components/PropertyCard'
import { agents, getAgent } from '@/data/agents'
import { properties } from '@/data/properties'
import { notFound } from 'next/navigation'
import { generateAgentJsonLd } from '@/lib/jsonLd'
import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export function generateStaticParams() {
  return agents.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const agent = getAgent(params.slug)
  if (!agent) return { title: 'Agent Not Found' }
  const title = `${agent.name} - ${agent.title} | Big Valley Properties`
  const description = agent.bio.slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/agents/${agent.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/agents/${agent.slug}`,
      siteName: 'Big Valley Properties',
      images: agent.photo ? [{ url: `${BASE_URL}${agent.photo}` }] : [],
      type: 'profile',
    },
  }
}

export default function AgentDetailPage({ params }: { params: { slug: string } }) {
  const agent = getAgent(params.slug)
  if (!agent) return notFound()

  const agentProperties = properties.filter(p => p.agentId === agent.id)
  const jsonLd = generateAgentJsonLd(agent)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Profile Header */}
      <section className="relative bg-forest-green py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container-bvp relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/agents" className="hover:text-white transition-colors">Our Team</Link>
            <span>/</span>
            <span className="text-white">{agent.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            <div className="relative shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image src={agent.photo} alt={agent.name} width={224} height={224} className="object-cover object-top w-full h-full" priority />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Active Agent</div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-h1 text-white mb-1">{agent.name}</h1>
              <p className="text-river-stone text-lg font-medium mb-1">{agent.title}</p>
              <p className="text-white/60 text-sm mb-4">{agent.licenseNumber}</p>

              {agent.yearsExperience && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-white text-sm">{agent.yearsExperience}+ Years Experience</span>
                </div>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {agent.counties.map(county => (
                  <span key={county} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full">{county} County</span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-green rounded-sm font-body font-medium text-sm uppercase tracking-brand-wide hover:bg-gray-100 transition-all duration-300 btn-magnetic">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-sm font-body font-medium text-sm uppercase tracking-brand-wide hover:bg-white hover:text-forest-green transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {agent.email}
                </a>
              </div>

              {(agent.social.facebook || agent.social.instagram || agent.social.linkedin) && (
                <div className="flex justify-center md:justify-start gap-3 mt-4">
                  {agent.social.facebook && (
                    <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label="Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {agent.social.instagram && (
                    <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label="Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {agent.social.linkedin && (
                    <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label="LinkedIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio, Specialties, Certifications, Achievements */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-6">About {agent.name.split(' ')[0]}</h2>
              <p className="text-cabin-timber dark:text-gray-300 leading-relaxed text-lg mb-8">{agent.bio}</p>

              {agent.achievements && agent.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-h4 text-charcoal-ink dark:text-white mb-4">Achievements</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {agent.achievements.map(a => (
                      <div key={a} className="bg-canvas-sand dark:bg-gray-900 rounded-lg p-4 text-center card-lift border border-gray-100 dark:border-gray-800">
                        <svg className="w-8 h-8 mx-auto text-forest-green dark:text-river-stone mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        <p className="text-sm font-medium text-charcoal-ink dark:text-gray-200">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {agent.testimonial && (
                <div className="bg-forest-green/5 dark:bg-forest-green/10 border-l-4 border-forest-green rounded-r-lg p-6">
                  <svg className="w-8 h-8 text-forest-green/30 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  <p className="font-accent italic text-charcoal-ink dark:text-gray-200 text-lg leading-relaxed mb-4">&ldquo;{agent.testimonial.text}&rdquo;</p>
                  <p className="text-sm font-medium text-forest-green">- {agent.testimonial.author}, {agent.testimonial.location}</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-h4 text-charcoal-ink dark:text-white mb-4">Specialties</h3>
                <div className="space-y-2">
                  {agent.specialties.map(s => (
                    <div key={s} className="flex items-center gap-3 text-sm text-cabin-timber dark:text-gray-300">
                      <svg className="w-4 h-4 text-forest-green dark:text-river-stone shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {agent.certifications && agent.certifications.length > 0 && (
                <div>
                  <h3 className="font-heading text-h4 text-charcoal-ink dark:text-white mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {agent.certifications.map(c => (
                      <div key={c} className="flex items-center gap-3 text-sm text-cabin-timber dark:text-gray-300">
                        <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-forest-green rounded-lg p-6 text-center">
                <h3 className="font-heading text-lg text-white mb-2">Schedule a Consultation</h3>
                <p className="text-white/70 text-sm mb-4">Get personalized guidance for your real estate journey.</p>
                <Link href="/contact" className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-forest-green rounded-sm font-body font-medium text-sm uppercase tracking-brand-wide hover:bg-gray-100 transition-all duration-300">Book Now</Link>
              </div>

              {(agent.social.facebook || agent.social.instagram || agent.social.linkedin) && (
                <div>
                  <h3 className="font-heading text-h4 text-charcoal-ink dark:text-white mb-4">Connect</h3>
                  <div className="flex gap-3">
                    {agent.social.facebook && (
                      <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 dark:bg-forest-green/20 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green dark:text-river-stone transition-colors" aria-label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                    )}
                    {agent.social.instagram && (
                      <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 dark:bg-forest-green/20 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green dark:text-river-stone transition-colors" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                    )}
                    {agent.social.linkedin && (
                      <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-green/10 dark:bg-forest-green/20 flex items-center justify-center hover:bg-forest-green hover:text-white text-forest-green dark:text-river-stone transition-colors" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {agentProperties.length > 0 && (
        <section className="section-padding bg-canvas-sand dark:bg-gray-900">
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
