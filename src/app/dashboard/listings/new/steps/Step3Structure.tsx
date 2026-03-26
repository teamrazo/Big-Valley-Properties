'use client'

import type { StepProps } from '../wizardTypes'
import ChipSelect from '@/components/ui/ChipSelect'

const FOUNDATIONS = ['Raised', 'Perimeter', 'Cement Slab']
const SIDING = ['Wood', 'Vinyl', 'Aluminum', 'Stucco', 'Brick']
const ROOFS = ['Comp', 'Metal', 'Tile', 'Shake']
const DRIVEWAYS = ['Dirt', 'Gravel', 'Cement', 'Asphalt', 'Brick']
const GARAGE_FEATURES = ['Automatic Door', 'Work Benches', 'Storage', 'Workshop', 'RV Parking']

export default function Step3Structure({ data, update, onNext, onBack }: StepProps) {
  const pd = data.propertyDetails
  const s = pd.structure || {}

  const updateStructure = (patch: Record<string, unknown>) => {
    update({ propertyDetails: { ...pd, structure: { ...s, ...patch } } })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Structure</h2>

      <ChipSelect label="Foundation" options={FOUNDATIONS} selected={s.foundation || []}
        onChange={v => updateStructure({ foundation: v })} allowOther />

      <ChipSelect label="Siding" options={SIDING} selected={s.siding || []}
        onChange={v => updateStructure({ siding: v })} allowOther />

      <ChipSelect label="Roof Type" options={ROOFS} selected={s.roofType || []}
        onChange={v => updateStructure({ roofType: v })} allowOther />

      <ChipSelect label="Driveway" options={DRIVEWAYS} selected={s.driveway || []}
        onChange={v => updateStructure({ driveway: v })} allowOther />

      {/* Garage */}
      <div>
        <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">Garage</label>
        <div className="flex gap-2 mb-3">
          {['Attached', 'Detached', 'None'].map(t => (
            <button key={t} type="button"
              onClick={() => updateStructure({ garage: { ...s.garage, type: t } })}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                s.garage?.type === t ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>
              {t}
            </button>
          ))}
        </div>
        {s.garage?.type && s.garage.type !== 'None' && (
          <div className="space-y-3 ml-2">
            <div>
              <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1"># Cars</label>
              <input type="number" min="1" max="10" value={s.garage?.cars || ''}
                onChange={e => updateStructure({ garage: { ...s.garage, cars: Number(e.target.value) || undefined } })}
                className="w-24 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white text-sm min-h-[44px]" />
            </div>
            <ChipSelect options={GARAGE_FEATURES} selected={s.garage?.features || []}
              onChange={v => updateStructure({ garage: { ...s.garage, features: v } })} />
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
