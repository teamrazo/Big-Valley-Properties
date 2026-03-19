'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/data/properties'
import type { Agent } from '@/data/agents'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export default function PropertyDetailClient({ property, agent }: { property: Property; agent: Agent | null }) {
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      {/* Gallery */}
      <section className="bg-charcoal-ink">
        <div className="container-bvp py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 max-h-[70vh]">
            <div
              className="lg:col-span-2 relative aspect-[16/10] cursor-pointer overflow-hidden rounded"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={property.images[activeImage]}
                alt={property.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                {property.images.length} Photos
              </div>
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-2">
              {property.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer overflow-hidden rounded"
                  onClick={() => { setActiveImage(idx + 1); setLightboxOpen(true) }}
                >
                  <Image src={img} alt={`${property.title} ${idx + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="33vw" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`shrink-0 w-20 h-14 relative rounded overflow-hidden border-2 transition-colors ${
                  activeImage === idx ? 'border-forest-green' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white z-10 p-2" onClick={() => setLightboxOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === 0 ? property.images.length - 1 : prev - 1) }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4" onClick={e => e.stopPropagation()}>
            <Image src={property.images[activeImage]} alt={property.title} fill className="object-contain" sizes="100vw" />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === property.images.length - 1 ? 0 : prev + 1) }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      {/* Property Details */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <nav className="flex items-center gap-2 text-sm text-alpine-slate mb-6">
                <Link href="/" className="hover:text-forest-green">Home</Link>
                <span>/</span>
                <Link href="/properties" className="hover:text-forest-green">Properties</Link>
                <span>/</span>
                <span className="text-charcoal-ink">{property.title}</span>
              </nav>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-brand-wider ${
                      property.status === 'Active' ? 'bg-forest-green text-white' :
                      property.status === 'Pending' ? 'bg-yellow-500 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {property.status}
                    </span>
                    <span className="text-xs text-alpine-slate">{property.daysOnMarket} days on market</span>
                  </div>
                  <h1 className="font-heading text-h1 text-charcoal-ink">{property.title}</h1>
                  <p className="text-alpine-slate text-lg mt-1">
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-h1 text-forest-green">{formatPrice(property.price)}</p>
                  <p className="text-xs text-alpine-slate">MLS# {property.mlsNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-canvas-sand rounded mb-8">
                {[
                  { label: 'Bedrooms', value: property.beds, icon: '🛏️' },
                  { label: 'Bathrooms', value: property.baths, icon: '🚿' },
                  { label: 'Sq Ft', value: property.sqft.toLocaleString(), icon: '📐' },
                  { label: 'Acreage', value: property.acreage, icon: '🌲' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl mb-1">{stat.icon}</p>
                    <p className="font-heading text-xl text-charcoal-ink">{stat.value}</p>
                    <p className="text-xs text-alpine-slate">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink mb-4">About This Property</h2>
                <p className="text-cabin-timber leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink mb-4">Features & Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-cabin-timber">
                      <svg className="w-5 h-5 text-forest-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink mb-4">Property Details</h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    { label: 'Property Type', value: property.propertyType },
                    { label: 'Year Built', value: property.yearBuilt },
                    { label: 'County', value: `${property.county} County` },
                    { label: 'Status', value: property.status },
                    { label: 'MLS Number', value: property.mlsNumber },
                    { label: 'Days on Market', value: property.daysOnMarket },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-alpine-slate">{row.label}</span>
                      <span className="text-charcoal-ink font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink mb-4">Virtual Tour</h2>
                <div className="aspect-video bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-river-stone/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-alpine-slate text-sm">Video tour coming soon</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink mb-4">Location</h2>
                <div className="aspect-[16/9] bg-canvas-sand rounded flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto text-river-stone/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-alpine-slate text-sm">{property.address}, {property.city}, {property.state} {property.zip}</p>
                    <p className="text-xs text-alpine-slate/60 mt-1">Interactive map coming soon</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <span className="text-sm text-alpine-slate">Share:</span>
                {['Facebook', 'Twitter', 'Email', 'Copy Link'].map(platform => (
                  <button key={platform} className="px-4 py-2 text-xs text-alpine-slate border border-gray-200 rounded hover:bg-canvas-sand transition-colors">
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[calc(var(--nav-height)+1rem)]">
                {agent && (
                  <div className="bg-white border border-gray-200 rounded p-6 mb-6 shadow-brand-sm">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-forest-green font-heading text-2xl">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg text-charcoal-ink">{agent.name}</h3>
                      <p className="text-forest-green text-sm font-medium">{agent.title}</p>
                      <p className="text-alpine-slate text-xs">{agent.licenseNumber}</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="btn-primary w-full text-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}?subject=Inquiry about ${property.title}`} className="btn-outline w-full text-center">
                        Email Agent
                      </a>
                    </div>
                    <Link href={`/agents/${agent.slug}`} className="block text-center text-sm text-forest-green hover:underline mt-4">
                      View Full Profile →
                    </Link>
                  </div>
                )}

                <div className="bg-canvas-sand border border-gray-200 rounded p-6">
                  <h3 className="font-heading text-h4 text-charcoal-ink mb-4">Request Info</h3>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <textarea placeholder="I'm interested in this property..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none resize-none" />
                    <button type="submit" className="btn-primary w-full text-center">Send Inquiry</button>
                  </form>
                  <p className="text-xs text-alpine-slate/60 mt-3 text-center">
                    By submitting, you agree to our privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
