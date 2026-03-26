'use client'

import type { StepProps } from '../wizardTypes'

const fields = [
  { id: 'bedrooms', label: 'Bedrooms', placeholder: '3', required: true },
  { id: 'bathrooms', label: 'Bathrooms', placeholder: '2', required: true },
  { id: 'livingArea', label: 'Living Area (sqft)', placeholder: '1800' },
  { id: 'lotSizeAcres', label: 'Lot Size (acres)', placeholder: '2.5' },
  { id: 'yearBuilt', label: 'Year Built', placeholder: '1998' },
]

export default function Step2Details({ data, update, onNext, onBack }: StepProps) {
  const valid = data.bedrooms && data.bathrooms

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Key Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.id}>
            <label htmlFor={f.id} className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">
              {f.label}{f.required ? ' *' : ''}
            </label>
            <input
              id={f.id} type="number"
              value={(data as unknown as Record<string, string>)[f.id]}
              onChange={e => update({ [f.id]: e.target.value } as Partial<typeof data>)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
              placeholder={f.placeholder} min="0"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} disabled={!valid} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
