'use client'

import { useState, useRef } from 'react'
import type { StepProps } from '../wizardTypes'

export default function Step9DescriptionPricing({ data, update, onNext, onBack }: StepProps) {
  const [aiLoading, setAiLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAiDraft = async () => {
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai/draft-remarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyDetails: data.propertyDetails,
          notes: data.walkthroughNotes,
          address: `${data.streetAddress}, ${data.city}, ${data.county} County, ${data.stateOrProvince}`,
          propertyType: data.propertyType,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          livingArea: data.livingArea,
          lotSizeAcres: data.lotSizeAcres,
        }),
      })
      if (res.ok) {
        const { remarks } = await res.json()
        update({ publicRemarks: remarks })
      } else {
        // Fallback local draft
        update({
          publicRemarks: `Welcome to this beautiful ${data.propertyType.toLowerCase()} in ${data.city}, ${data.county} County. Featuring ${data.bedrooms} bedrooms and ${data.bathrooms} bathrooms${data.lotSizeAcres ? ` on ${data.lotSizeAcres} acres` : ''}, this property is perfect for those seeking the Northern California mountain lifestyle.`
        })
      }
    } catch {
      // Fallback
      update({
        publicRemarks: `Beautiful ${data.propertyType.toLowerCase()} in ${data.city}. ${data.bedrooms} bed, ${data.bathrooms} bath.`
      })
    } finally {
      setAiLoading(false)
    }
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(f => {
      const ext = f.name.toLowerCase().split('.').pop()
      return ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext || '') && f.size <= 10 * 1024 * 1024
    })
    const newPhotos = [...data.photos, ...validFiles].slice(0, 40)
    const newUrls = newPhotos.map(f => URL.createObjectURL(f))
    update({ photos: newPhotos, photoUrls: newUrls })
  }

  const removePhoto = (index: number) => {
    const photos = [...data.photos]
    const urls = [...data.photoUrls]
    URL.revokeObjectURL(urls[index])
    photos.splice(index, 1)
    urls.splice(index, 1)
    update({ photos, photoUrls: urls })
  }

  const valid = data.listPrice && parseFloat(data.listPrice) > 0

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Description, Photos & Pricing</h2>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="publicRemarks" className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Public Description</label>
          <button type="button" onClick={handleAiDraft} disabled={aiLoading}
            className="text-xs px-3 py-1.5 bg-forest-green/10 text-forest-green rounded-lg hover:bg-forest-green/20 transition-colors disabled:opacity-40 min-h-[32px]">
            {aiLoading ? '✨ Drafting...' : '✨ AI Draft'}
          </button>
        </div>
        <textarea id="publicRemarks" rows={6} value={data.publicRemarks}
          onChange={e => update({ publicRemarks: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
          placeholder="Describe the property for prospective buyers..." />
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">Photos ({data.photos.length}/40)</label>
        <div onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-forest-green transition-colors">
          <div className="text-2xl mb-1">📷</div>
          <p className="text-sm text-charcoal-ink dark:text-gray-300">Click to add photos</p>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple capture="environment"
            onChange={handleFiles} className="hidden" />
        </div>
        {data.photoUrls.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {data.photoUrls.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div>
        <label htmlFor="listPrice" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">List Price *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cabin-timber dark:text-gray-500">$</span>
          <input id="listPrice" type="number" value={data.listPrice}
            onChange={e => update({ listPrice: e.target.value })}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
            placeholder="425000" min="0" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Listing Date</label>
          <input type="date" value={data.listingContractDate}
            onChange={e => update({ listingContractDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white min-h-[48px]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Expiration Date</label>
          <input type="date" value={data.expirationDate}
            onChange={e => update({ expirationDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white min-h-[48px]" />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
        <input type="checkbox" checked={data.hasHOA}
          onChange={e => update({ hasHOA: e.target.checked })}
          className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
        <span className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Property has HOA</span>
      </label>
      {data.hasHOA && (
        <div className="ml-8">
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Monthly HOA Fee</label>
          <div className="relative max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cabin-timber dark:text-gray-500">$</span>
            <input type="number" value={data.hoaFeeMonthly}
              onChange={e => update({ hoaFeeMonthly: e.target.value })}
              className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white min-h-[48px]"
              placeholder="150" />
          </div>
        </div>
      )}

      {/* Private fields */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-xs text-cabin-timber dark:text-gray-500 mb-3">🔒 Private — never shown to the public</p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Private Remarks</label>
            <textarea rows={2} value={data.privateRemarks}
              onChange={e => update({ privateRemarks: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y"
              placeholder="Seller motivation, known issues..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Showing Instructions</label>
            <textarea rows={2} value={data.showingInstructions}
              onChange={e => update({ showingInstructions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y"
              placeholder="Lock box code, appointment requirements..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Directions</label>
            <textarea rows={2} value={data.directions}
              onChange={e => update({ directions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y"
              placeholder="Turn left off Highway 299 at..." />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} disabled={!valid} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]">Review →</button>
      </div>
    </div>
  )
}
