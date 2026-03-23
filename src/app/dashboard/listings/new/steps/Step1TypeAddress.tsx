'use client'

import type { WizardData } from '../page'

const PROPERTY_TYPES = ['Single Family', 'Cabin', 'Ranch', 'Land', 'Farm', 'Multi-Family', 'Commercial', 'Manufactured']
const COUNTIES = ['Trinity', 'Shasta']

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step1TypeAddress({ data, update, onNext }: Props) {
  const valid = data.propertyType && data.streetAddress && data.city && data.county && data.postalCode

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Property Type & Address</h2>

      {/* Property type */}
      <div>
        <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-3">Property Type *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PROPERTY_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => update({ propertyType: type })}
              className={`px-3 py-3 rounded-lg text-sm font-medium border transition-colors min-h-[48px] ${
                data.propertyType === type
                  ? 'bg-forest-green text-white border-forest-green'
                  : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-forest-green'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Street Address *</label>
        <input
          id="streetAddress"
          type="text"
          value={data.streetAddress}
          onChange={e => update({ streetAddress: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
          placeholder="1247 Canyon Creek Rd"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">City *</label>
          <input
            id="city"
            type="text"
            value={data.city}
            onChange={e => update({ city: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
            placeholder="Weaverville"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">ZIP *</label>
          <input
            id="postalCode"
            type="text"
            value={data.postalCode}
            onChange={e => update({ postalCode: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
            placeholder="96093"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">County *</label>
        <div className="flex gap-3">
          {COUNTIES.map(county => (
            <button
              key={county}
              type="button"
              onClick={() => update({ county })}
              className={`flex-1 py-3 rounded-lg text-sm font-medium border transition-colors min-h-[48px] ${
                data.county === county
                  ? 'bg-forest-green text-white border-forest-green'
                  : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-forest-green'
              }`}
            >
              {county} County
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!valid}
          className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
