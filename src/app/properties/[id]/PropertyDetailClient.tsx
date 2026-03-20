'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/data/properties'
import type { Agent } from '@/data/agents'
import PropertyCard from '@/components/PropertyCard'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

interface Props {
  property: Property
  agent: Agent | null
  similarProperties?: Property[]
}

export default function PropertyDetailClient({ property, agent, similarProperties = [] }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'photos' | 'video' | '3d'>('photos')

  return (
    <>
      {/* Gallery with tabs */}
      <section className="bg-charcoal-ink dark:bg-black">
        <div className="container-bvp py-4">
          {/* Media tabs */}
          <div className="flex items-center gap-4 mb-4">
            {[
              { id: 'photos' as const, label: 'Photos', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
              { id: 'video' as const, label: 'Video Tour', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { id: '3d' as const, label: '3D Tour', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-forest-green text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photos view */}
          {activeTab === 'photos' && (
            <>
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
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
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
            </>
          )}

          {/* Video Tour view */}
          {activeTab === 'video' && (
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 pulse-ring cursor-pointer hover:bg-white/20 transition-colors">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <h3 className="text-white font-heading text-xl mb-2">4K Video Walkthrough</h3>
                  <p className="text-white/60 text-sm mb-4">Experience this property in stunning detail</p>
                  <button className="px-6 py-2.5 bg-forest-green text-white rounded-full text-sm font-medium hover:bg-deep-pine transition-colors">
                    Request Video Tour
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full text-xs">4K</span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full text-xs">HDR</span>
              </div>
            </div>
          )}

          {/* 3D Tour view */}
          {activeTab === '3d' && (
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded" />
                ))}
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 animate-float">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-white font-heading text-xl mb-2">3D Virtual Tour</h3>
                <p className="text-white/60 text-sm mb-4">Walk through the property from anywhere</p>
                <button className="px-6 py-2.5 bg-forest-green text-white rounded-full text-sm font-medium hover:bg-deep-pine transition-colors">
                  Schedule Virtual Tour
                </button>
              </div>
            </div>
          )}
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
          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImage(idx) }}
                className={`w-3 h-3 rounded-full transition-all ${activeImage === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Property Details */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <nav className="flex items-center gap-2 text-sm text-alpine-slate dark:text-gray-500 mb-6">
                <Link href="/" className="hover:text-forest-green dark:hover:text-river-stone transition-colors">Home</Link>
                <span>/</span>
                <Link href="/properties" className="hover:text-forest-green dark:hover:text-river-stone transition-colors">Properties</Link>
                <span>/</span>
                <span className="text-charcoal-ink dark:text-gray-300">{property.title}</span>
              </nav>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-brand-wider rounded-full ${
                      property.status === 'Active' ? 'bg-forest-green text-white' :
                      property.status === 'Pending' ? 'bg-yellow-500 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {property.status}
                    </span>
                    <span className="text-xs text-alpine-slate dark:text-gray-500">{property.daysOnMarket} days on market</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      AI Recommended
                    </span>
                  </div>
                  <h1 className="font-heading text-h1 text-charcoal-ink dark:text-white">{property.title}</h1>
                  <p className="text-alpine-slate dark:text-gray-400 text-lg mt-1">
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-h1 text-forest-green dark:text-river-stone">{formatPrice(property.price)}</p>
                  <p className="text-xs text-alpine-slate dark:text-gray-500">MLS# {property.mlsNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-canvas-sand dark:bg-gray-900 rounded-lg mb-8">
                {[
                  { label: 'Bedrooms', value: property.beds },
                  { label: 'Bathrooms', value: property.baths },
                  { label: 'Sq Ft', value: property.sqft.toLocaleString() },
                  { label: 'Acreage', value: property.acreage },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-xl text-charcoal-ink dark:text-white">{stat.value}</p>
                    <p className="text-xs text-alpine-slate dark:text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">About This Property</h2>
                <p className="text-cabin-timber dark:text-gray-300 leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">Features & Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-cabin-timber dark:text-gray-300">
                      <svg className="w-5 h-5 text-forest-green dark:text-river-stone shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">Property Details</h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    { label: 'Property Type', value: property.propertyType },
                    { label: 'Year Built', value: property.yearBuilt },
                    { label: 'County', value: `${property.county} County` },
                    { label: 'Status', value: property.status },
                    { label: 'MLS Number', value: property.mlsNumber },
                    { label: 'Days on Market', value: property.daysOnMarket },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-alpine-slate dark:text-gray-500">{row.label}</span>
                      <span className="text-charcoal-ink dark:text-gray-200 font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-4">Location</h2>
                <div className="aspect-[16/9] bg-canvas-sand dark:bg-gray-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-800">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto text-river-stone/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-alpine-slate dark:text-gray-400 text-sm">{property.address}, {property.city}, {property.state} {property.zip}</p>
                    <p className="text-xs text-alpine-slate/60 dark:text-gray-600 mt-1">Interactive map coming soon</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <span className="text-sm text-alpine-slate dark:text-gray-500">Share:</span>
                {['Facebook', 'Twitter', 'Email', 'Copy Link'].map(platform => (
                  <button key={platform} className="px-4 py-2 text-xs text-alpine-slate dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-canvas-sand dark:hover:bg-gray-800 transition-colors">
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[calc(var(--nav-height)+1rem)]">
                {agent && (
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6 shadow-brand-sm dark:shadow-none">
                    <div className="text-center mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-3 border-forest-green/20">
                        <Image
                          src={agent.photo}
                          alt={agent.name}
                          width={96}
                          height={96}
                          className="object-cover object-top w-full h-full"
                        />
                      </div>
                      <h3 className="font-heading text-lg text-charcoal-ink dark:text-white">{agent.name}</h3>
                      <p className="text-forest-green dark:text-river-stone text-sm font-medium">{agent.title}</p>
                      <p className="text-alpine-slate dark:text-gray-500 text-xs">{agent.licenseNumber}</p>
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
                    <Link href={`/agents/${agent.slug}`} className="block text-center text-sm text-forest-green dark:text-river-stone hover:underline mt-4">
                      View Full Profile →
                    </Link>
                  </div>
                )}

                {/* Schedule Virtual Tour */}
                <div className="bg-gradient-to-br from-forest-green to-deep-pine rounded-lg p-6 mb-6 text-center">
                  <svg className="w-10 h-10 mx-auto text-white/80 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-heading text-lg text-white mb-2">Schedule Virtual Tour</h3>
                  <p className="text-white/70 text-sm mb-4">Experience this property from the comfort of your home.</p>
                  <button className="w-full px-6 py-3 bg-white text-forest-green rounded-sm font-body font-medium text-sm uppercase tracking-brand-wide hover:bg-gray-100 transition-colors">
                    Book Virtual Tour
                  </button>
                </div>

                <div className="bg-canvas-sand dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="font-heading text-h4 text-charcoal-ink dark:text-white mb-4">Request Info</h3>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-800 dark:text-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-800 dark:text-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-800 dark:text-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" />
                    <textarea placeholder="I'm interested in this property..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-800 dark:text-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none resize-none" />
                    <button type="submit" className="btn-primary w-full text-center">Send Inquiry</button>
                  </form>
                  <p className="text-xs text-alpine-slate/60 dark:text-gray-600 mt-3 text-center">
                    By submitting, you agree to our privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="section-padding bg-canvas-sand dark:bg-gray-900">
          <div className="container-bvp">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    AI-Powered
                  </span>
                </div>
                <h2 className="section-heading !mb-0">Similar Properties</h2>
              </div>
              <Link href="/properties" className="text-forest-green dark:text-river-stone text-sm font-medium hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
