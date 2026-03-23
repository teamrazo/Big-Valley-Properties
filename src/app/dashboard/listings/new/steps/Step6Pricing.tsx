'use client'

import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step6Pricing({ data, update, onNext, onBack }: Props) {
  const valid = data.listPrice && parseFloat(data.listPrice) > 0

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Pricing & Dates</h2>

      <div>
        <label htmlFor="listPrice" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">List Price *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cabin-timber dark:text-gray-500">$</span>
          <input
            id="listPrice"
            type="number"
            value={data.listPrice}
            onChange={e => update({ listPrice: e.target.value })}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
            placeholder="425000"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="listingContractDate" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Listing Date</label>
          <input
            id="listingContractDate"
            type="date"
            value={data.listingContractDate}
            onChange={e => update({ listingContractDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="expirationDate" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Expiration Date</label>
          <input
            id="expirationDate"
            type="date"
            value={data.expirationDate}
            onChange={e => update({ expirationDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
          />
        </div>
      </div>

      {/* HOA */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={data.hasHOA}
            onChange={e => update({ hasHOA: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green"
          />
          <span className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Property has HOA</span>
        </label>
        {data.hasHOA && (
          <div className="mt-3 ml-8">
            <label htmlFor="hoaFeeMonthly" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Monthly HOA Fee</label>
            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cabin-timber dark:text-gray-500">$</span>
              <input
                id="hoaFeeMonthly"
                type="number"
                value={data.hoaFeeMonthly}
                onChange={e => update({ hoaFeeMonthly: e.target.value })}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
                placeholder="150"
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Phase 3 locked MLS fields */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-dashed border-gray-300 dark:border-gray-600 opacity-60">
        <div className="flex items-center gap-2 mb-3">
          <span>🔒</span>
          <h3 className="text-sm font-semibold text-gray-500">MLS Listing Details — Phase 3</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['MLS Listing Key', 'MLS Status', 'MLS Board', 'IDX Display'].map(field => (
            <div key={field}>
              <label className="block text-xs text-gray-400 mb-1">{field}</label>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">These fields activate when MLS sync is enabled.</p>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} disabled={!valid} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
