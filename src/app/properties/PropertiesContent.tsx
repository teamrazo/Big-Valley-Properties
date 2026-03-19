'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'
import { properties } from '@/data/properties'

const counties = ['All', 'Trinity', 'Shasta'] as const
const propertyTypes = ['All', 'Single Family', 'Cabin', 'Ranch', 'Land', 'Farm'] as const
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $300k', min: 0, max: 300000 },
  { label: '$300k – $500k', min: 300000, max: 500000 },
  { label: '$500k – $750k', min: 500000, max: 750000 },
  { label: '$750k+', min: 750000, max: Infinity },
]
const acreageRanges = [
  { label: 'Any Acreage', min: 0, max: Infinity },
  { label: 'Under 5 acres', min: 0, max: 5 },
  { label: '5 – 10 acres', min: 5, max: 10 },
  { label: '10+ acres', min: 10, max: Infinity },
]

export default function PropertiesContent() {
  const searchParams = useSearchParams()
  const countyParam = searchParams.get('county')
  const initialCounty = countyParam && ['Trinity', 'Shasta'].includes(countyParam) ? countyParam : 'All'
  const [county, setCounty] = useState<string>(initialCounty)

  useEffect(() => {
    if (countyParam && ['Trinity', 'Shasta'].includes(countyParam)) {
      setCounty(countyParam)
    }
  }, [countyParam])

  const [type, setType] = useState<string>('All')
  const [priceIdx, setPriceIdx] = useState(0)
  const [acreIdx, setAcreIdx] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (county !== 'All' && p.county !== county) return false
      if (type !== 'All' && p.propertyType !== type) return false
      const pr = priceRanges[priceIdx]
      if (p.price < pr.min || p.price >= pr.max) return false
      const ar = acreageRanges[acreIdx]
      if (p.acreage < ar.min || p.acreage >= ar.max) return false
      return true
    })
  }, [county, type, priceIdx, acreIdx])

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container-bvp text-center">
          <h1 className="font-heading text-h1 text-white mb-3">Property Search</h1>
          <p className="text-river-stone text-lg max-w-2xl mx-auto">
            Find your perfect property in Trinity and Shasta Counties. Use the filters below to narrow your search.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-[var(--nav-height)] z-30">
        <div className="container-bvp py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* County */}
            <select
              value={county}
              onChange={e => setCounty(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm font-body bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {counties.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Counties' : `${c} County`}</option>
              ))}
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm font-body bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {propertyTypes.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>

            {/* Price */}
            <select
              value={priceIdx}
              onChange={e => setPriceIdx(Number(e.target.value))}
              className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm font-body bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {priceRanges.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>

            {/* Acreage */}
            <select
              value={acreIdx}
              onChange={e => setAcreIdx(Number(e.target.value))}
              className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm font-body bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {acreageRanges.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-alpine-slate">{filtered.length} properties</span>
              {/* View toggle */}
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-forest-green text-white' : 'text-alpine-slate hover:bg-gray-100'}`} aria-label="Grid view">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-forest-green text-white' : 'text-alpine-slate hover:bg-gray-100'}`} aria-label="List view">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-river-stone/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <h3 className="font-heading text-h3 text-charcoal-ink mb-2">No Properties Found</h3>
              <p className="text-alpine-slate">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8' : 'space-y-6'}>
              {filtered.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
