'use client'

import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

const FEATURE_GROUPS: Record<string, string[]> = {
  Interior: ['Wood Stove', 'Fireplace', 'Vaulted Ceilings', 'Exposed Beams', 'Open Floor Plan', 'Hardwood Floors', 'Granite Counters', 'Updated Kitchen'],
  Exterior: ['Wraparound Deck', 'Covered Porch', 'Detached Workshop', 'Barn', 'Garden Space', 'Fruit Trees', 'Fenced', 'Metal Roof'],
  Utilities: ['Well Water', 'City Water', 'Septic', 'Propane Heat', 'Central HVAC', 'Solar Panels', 'Generator', 'Off-Grid Ready'],
  'Land & Views': ['Creek Frontage', 'River Access', 'Mountain Views', 'Valley Views', 'Timber', 'Pasture', 'Flat Buildable', 'Road Frontage'],
}

export default function Step3Features({ data, update, onNext, onBack }: Props) {
  const toggle = (feature: string) => {
    const features = data.features.includes(feature)
      ? data.features.filter(f => f !== feature)
      : [...data.features, feature]
    update({ features })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Features</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">Select all that apply. These help buyers find your listing.</p>

      {Object.entries(FEATURE_GROUPS).map(([group, features]) => (
        <div key={group}>
          <h3 className="text-sm font-semibold text-charcoal-ink dark:text-gray-300 mb-2">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {features.map(feature => (
              <button
                key={feature}
                type="button"
                onClick={() => toggle(feature)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                  data.features.includes(feature)
                    ? 'bg-forest-green text-white border-forest-green'
                    : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-forest-green'
                }`}
              >
                {data.features.includes(feature) ? '✓ ' : ''}{feature}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-cabin-timber/60 dark:text-gray-600">{data.features.length} features selected</p>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
