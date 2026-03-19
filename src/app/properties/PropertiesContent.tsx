'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'
import { properties } from '@/data/properties'
import { CompareButton, CompareBar } from '@/components/PropertyComparison'
import FavoriteButton from '@/components/FavoriteButton'
import Link from 'next/link'
import Image from 'next/image'

const counties = ['All', 'Trinity', 'Shasta'] as const
const propertyTypes = ['All', 'Single Family', 'Cabin', 'Ranch', 'Land', 'Farm'] as const

function formatSliderPrice(val: number): string {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
  return `$${(val / 1000).toFixed(0)}k`
}

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
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000000)
  const [minAcreage, setMinAcreage] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('newest')

  const toggleCompare = useCallback((id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }, [])

  const filtered = useMemo(() => {
    let result = properties.filter(p => {
      if (county !== 'All' && p.county !== county) return false
      if (type !== 'All' && p.propertyType !== type) return false
      if (p.price < minPrice || p.price > maxPrice) return false
      if (p.acreage < minAcreage) return false
      return true
    })

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => a.daysOnMarket - b.daysOnMarket); break
      case 'acreage': result.sort((a, b) => b.acreage - a.acreage); break
    }

    return result
  }, [county, type, minPrice, maxPrice, minAcreage, sortBy])

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-green dark:bg-gray-900 py-16 md:py-20">
        <div className="container-bvp text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-xs mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            AI-Powered Search
          </div>
          <h1 className="font-heading text-h1 text-white mb-3">Property Search</h1>
          <p className="text-river-stone text-lg max-w-2xl mx-auto">
            Find your perfect property in Trinity and Shasta Counties. Use the filters below to narrow your search.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-[var(--nav-height)] z-30">
        <div className="container-bvp py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* County */}
            <select
              value={county}
              onChange={e => setCounty(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm font-body bg-white dark:bg-gray-900 dark:text-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {counties.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Counties' : `${c} County`}</option>
              ))}
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm font-body bg-white dark:bg-gray-900 dark:text-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              {propertyTypes.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-sm text-sm font-body bg-white dark:bg-gray-900 dark:text-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="acreage">Most Acreage</option>
            </select>

            {/* Advanced Filter Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-sm text-sm font-body transition-colors ${
                showAdvanced
                  ? 'border-forest-green bg-forest-green/5 dark:bg-forest-green/10 text-forest-green dark:text-river-stone'
                  : 'border-gray-200 dark:border-gray-700 text-alpine-slate dark:text-gray-400 hover:border-forest-green'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              Advanced Filters
            </button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-alpine-slate dark:text-gray-400">{filtered.length} properties</span>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-forest-green text-white' : 'text-alpine-slate dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="Grid view">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-forest-green text-white' : 'text-alpine-slate dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="List view">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 grid sm:grid-cols-2 gap-6">
              {/* Price Range Slider */}
              <div>
                <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-3">
                  Price Range: {formatSliderPrice(minPrice)} — {formatSliderPrice(maxPrice)}
                </label>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-alpine-slate dark:text-gray-500">Min Price</span>
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={25000}
                      value={minPrice}
                      onChange={e => setMinPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-alpine-slate dark:text-gray-500">Max Price</span>
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={25000}
                      value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Acreage Slider */}
              <div>
                <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-3">
                  Minimum Acreage: {minAcreage} acres
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={minAcreage}
                  onChange={e => setMinAcreage(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-alpine-slate dark:text-gray-500 mt-1">
                  <span>0 acres</span>
                  <span>100+ acres</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="bg-blue-50/50 dark:bg-blue-950/20 py-6">
        <div className="container-bvp">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Recommended For You
            </span>
            <span className="text-alpine-slate dark:text-gray-500">Based on your browsing preferences</span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-canvas-sand dark:bg-gray-950">
        <div className="container-bvp">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-river-stone/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <h3 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-2">No Properties Found</h3>
              <p className="text-alpine-slate dark:text-gray-400">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8' : 'space-y-6'}>
              {filtered.map(property => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />
                  {/* Overlay actions */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FavoriteButton propertyId={property.id} />
                    <CompareButton
                      propertyId={property.id}
                      onToggle={toggleCompare}
                      isSelected={compareIds.includes(property.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Compare Bar */}
      <CompareBar
        selectedIds={compareIds}
        onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
        onClear={() => setCompareIds([])}
      />
    </>
  )
}
