'use client'

import { useState } from 'react'
import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step4Description({ data, update, onNext, onBack }: Props) {
  const [aiLoading, setAiLoading] = useState(false)
  const charCount = data.publicRemarks.length
  const valid = charCount >= 50

  const handleAiDraft = async () => {
    setAiLoading(true)
    // TODO: Call /api/ai/draft-remarks when API is wired
    setTimeout(() => {
      update({
        publicRemarks: `Welcome to this beautiful ${data.propertyType.toLowerCase()} in ${data.city}, ${data.county} County. Featuring ${data.bedrooms} bedrooms and ${data.bathrooms} bathrooms on ${data.lotSizeAcres || 'spacious'} acres, this property offers ${data.features.slice(0, 3).join(', ').toLowerCase() || 'exceptional features'} and more. ${data.livingArea ? `With ${data.livingArea} sqft of living space, ` : ''}this home is perfect for those seeking the Northern California mountain lifestyle.`
      })
      setAiLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Property Description</h2>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="publicRemarks" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300">
            Public Remarks *
          </label>
          <button
            type="button"
            onClick={handleAiDraft}
            disabled={aiLoading || !data.propertyType}
            className="text-xs px-3 py-1.5 bg-forest-green/10 text-forest-green rounded-lg hover:bg-forest-green/20 transition-colors disabled:opacity-40 min-h-[32px]"
          >
            {aiLoading ? '✨ Drafting...' : '✨ AI Draft'}
          </button>
        </div>
        <textarea
          id="publicRemarks"
          rows={8}
          value={data.publicRemarks}
          onChange={e => update({ publicRemarks: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
          placeholder="Describe the property for prospective buyers. Highlight key features, views, lifestyle, and location. Min 50 characters."
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-cabin-timber/60 dark:text-gray-600">
            {charCount < 50 ? `${50 - charCount} more characters needed` : '✓ Looks good'}
          </p>
          <p className="text-xs text-cabin-timber/60 dark:text-gray-600">{charCount} chars</p>
        </div>
      </div>

      {/* Voice note placeholder */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-dashed border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎙️</span>
          <div>
            <p className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Voice Notes</p>
            <p className="text-xs text-cabin-timber dark:text-gray-500">Record a voice note while walking the property. Transcription available when online.</p>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="mt-3 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 cursor-not-allowed min-h-[44px]"
        >
          🎙️ Record Voice Note (coming soon)
        </button>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} disabled={!valid} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
