'use client'

import type { StepProps } from '../wizardTypes'
import type { BedroomDetails } from '@/types/propertyDetails'
import ChipSelect from '@/components/ui/ChipSelect'
import CollapsibleSection from '@/components/ui/CollapsibleSection'

const FLOORING = ['Hardwood', 'Carpet', 'Vinyl', 'Tile', 'Laminate']
const CLOSET_TYPES = ['Walk-in', 'Wall', 'Mirrored', 'None']

export default function Step6Bedrooms({ data, update, onNext, onBack }: StepProps) {
  const count = Number(data.bedrooms) || 0
  const pd = data.propertyDetails
  const rooms = pd.rooms || {}
  const bedrooms: BedroomDetails[] = rooms.bedrooms || []

  // Ensure we have the right number of bedroom entries
  const ensured = Array.from({ length: count }, (_, i) => bedrooms[i] || { label: i === 0 ? 'Master Bedroom' : `Bedroom ${i + 1}`, isMaster: i === 0 })

  const updateBedroom = (idx: number, patch: Partial<BedroomDetails>) => {
    const updated = [...ensured]
    updated[idx] = { ...updated[idx], ...patch }
    update({ propertyDetails: { ...pd, rooms: { ...rooms, bedrooms: updated } } })
  }

  if (count === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Bedrooms</h2>
        <p className="text-sm text-cabin-timber dark:text-gray-400">No bedrooms specified. Go back to Key Details to set the number.</p>
        <div className="flex justify-between pt-2">
          <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium min-h-[48px]">← Back</button>
          <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium min-h-[48px]">Skip →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Bedrooms ({count})</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">Expand each bedroom to add details.</p>

      {ensured.map((br, i) => (
        <CollapsibleSection key={i} title={br.label || `Bedroom ${i + 1}`} icon={i === 0 ? '👑' : '🛏️'} defaultOpen={i === 0}>
          <ChipSelect label="Flooring" options={FLOORING} selected={br.flooring || []}
            onChange={v => updateBedroom(i, { flooring: v })} allowOther />

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Closet Type</label>
            <div className="flex flex-wrap gap-2">
              {CLOSET_TYPES.map(ct => (
                <button key={ct} type="button" onClick={() => updateBedroom(i, { closetType: ct })}
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                    br.closetType === ct ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}>{ct}</button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="checkbox" checked={br.hasCeilingFan || false}
                onChange={e => updateBedroom(i, { hasCeilingFan: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
              <span className="text-sm text-charcoal-ink dark:text-gray-300">Ceiling Fan</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="checkbox" checked={br.hasSkylight || false}
                onChange={e => updateBedroom(i, { hasSkylight: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
              <span className="text-sm text-charcoal-ink dark:text-gray-300">Skylight</span>
            </label>
          </div>

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Dimensions</label>
            <input type="text" value={br.dimensions || ''}
              onChange={e => updateBedroom(i, { dimensions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
              placeholder="12x14" />
          </div>

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Notes</label>
            <textarea rows={2} value={br.notes || ''}
              onChange={e => updateBedroom(i, { notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y" />
          </div>
        </CollapsibleSection>
      ))}

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
