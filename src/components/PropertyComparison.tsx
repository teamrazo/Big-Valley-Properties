'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { properties, type Property } from '@/data/properties'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export function CompareButton({ propertyId, onToggle, isSelected }: { propertyId: string; onToggle: (id: string) => void; isSelected: boolean }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(propertyId) }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
        isSelected
          ? 'bg-forest-green text-white'
          : 'bg-white/90 dark:bg-gray-800/90 text-charcoal-ink dark:text-gray-200 hover:bg-forest-green hover:text-white border border-gray-200 dark:border-gray-600'
      }`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      {isSelected ? 'Added' : 'Compare'}
    </button>
  )
}

export function CompareBar({ selectedIds, onRemove, onClear }: { selectedIds: string[]; onRemove: (id: string) => void; onClear: () => void }) {
  const selectedProperties = selectedIds.map(id => properties.find(p => p.id === id)).filter(Boolean) as Property[]
  const [showModal, setShowModal] = useState(false)

  if (selectedIds.length === 0) return null

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-charcoal-ink dark:text-white">
              {selectedIds.length}/3 Selected
            </span>
            <div className="flex gap-2">
              {selectedProperties.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-canvas-sand dark:bg-gray-800 rounded-full pl-1 pr-3 py-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="32px" />
                  </div>
                  <span className="text-xs text-charcoal-ink dark:text-gray-200 max-w-[120px] truncate">{p.title}</span>
                  <button onClick={() => onRemove(p.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClear} className="text-xs text-alpine-slate hover:text-red-500 transition-colors">
              Clear All
            </button>
            <button
              onClick={() => setShowModal(true)}
              disabled={selectedIds.length < 2}
              className="btn-primary text-xs py-2 px-5 disabled:opacity-40"
            >
              Compare ({selectedIds.length})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="font-heading text-xl text-charcoal-ink dark:text-white">Property Comparison</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
                  {/* Images */}
                  {selectedProperties.map(p => (
                    <div key={`img-${p.id}`} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                      <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="300px" />
                    </div>
                  ))}

                  {/* Titles */}
                  {selectedProperties.map(p => (
                    <div key={`title-${p.id}`}>
                      <Link href={`/properties/${p.id}`} className="font-heading text-lg text-charcoal-ink dark:text-white hover:text-forest-green transition-colors">
                        {p.title}
                      </Link>
                      <p className="text-sm text-alpine-slate dark:text-gray-400">{p.city}, {p.county} County</p>
                    </div>
                  ))}
                </div>

                {/* Comparison Table */}
                <div className="mt-8 border rounded-lg overflow-hidden dark:border-gray-700">
                  {[
                    { label: 'Price', render: (p: Property) => formatPrice(p.price) },
                    { label: 'Bedrooms', render: (p: Property) => `${p.beds}` },
                    { label: 'Bathrooms', render: (p: Property) => `${p.baths}` },
                    { label: 'Sq Ft', render: (p: Property) => p.sqft.toLocaleString() },
                    { label: 'Acreage', render: (p: Property) => `${p.acreage} acres` },
                    { label: 'Property Type', render: (p: Property) => p.propertyType },
                    { label: 'Year Built', render: (p: Property) => `${p.yearBuilt}` },
                    { label: 'Status', render: (p: Property) => p.status },
                    { label: 'Days on Market', render: (p: Property) => `${p.daysOnMarket}` },
                  ].map((row, i) => (
                    <div key={row.label} className={`grid items-center ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'}`} style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, 1fr)` }}>
                      <div className="px-4 py-3 text-sm font-medium text-charcoal-ink dark:text-gray-300">{row.label}</div>
                      {selectedProperties.map(p => (
                        <div key={`${row.label}-${p.id}`} className="px-4 py-3 text-sm text-cabin-timber dark:text-gray-400">
                          {row.render(p)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
