'use client'

import type { StepProps } from '../wizardTypes'
import type { BathroomDetails } from '@/types/propertyDetails'
import ChipSelect from '@/components/ui/ChipSelect'
import CollapsibleSection from '@/components/ui/CollapsibleSection'

const FLOORING = ['Tile', 'Vinyl', 'Marble', 'Laminate']
const COUNTERS = ['Granite', 'Quartz', 'Laminate', 'Marble', 'Tile']
const TUB_TYPES = ['Garden Tub', 'Bath-Shower Combo', 'Shower Stall', 'Walk-in Shower', 'Soaking Tub']

export default function Step7Bathrooms({ data, update, onNext, onBack }: StepProps) {
  const count = Math.ceil(Number(data.bathrooms) || 0)
  const pd = data.propertyDetails
  const rooms = pd.rooms || {}
  const bathrooms: BathroomDetails[] = rooms.bathrooms || []

  const ensured = Array.from({ length: count }, (_, i) => bathrooms[i] || { label: i === 0 ? 'Primary Bathroom' : `Bathroom ${i + 1}` })

  const updateBathroom = (idx: number, patch: Partial<BathroomDetails>) => {
    const updated = [...ensured]
    updated[idx] = { ...updated[idx], ...patch }
    update({ propertyDetails: { ...pd, rooms: { ...rooms, bathrooms: updated } } })
  }

  if (count === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Bathrooms</h2>
        <p className="text-sm text-cabin-timber dark:text-gray-400">No bathrooms specified.</p>
        <div className="flex justify-between pt-2">
          <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium min-h-[48px]">← Back</button>
          <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium min-h-[48px]">Skip →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Bathrooms ({count})</h2>

      {ensured.map((br, i) => (
        <CollapsibleSection key={i} title={br.label || `Bathroom ${i + 1}`} icon="🚿" defaultOpen={i === 0}>
          <div className="flex gap-2 mb-2">
            {(['Full', 'Half'] as const).map(t => (
              <button key={t} type="button" onClick={() => updateBathroom(i, { type: t })}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                  br.type === t ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}>{t}</button>
            ))}
          </div>

          <ChipSelect label="Flooring" options={FLOORING} selected={br.flooring || []}
            onChange={v => updateBathroom(i, { flooring: v })} allowOther />

          <ChipSelect label="Counters" options={COUNTERS} selected={br.counters || []}
            onChange={v => updateBathroom(i, { counters: v })} allowOther />

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Tub/Shower Type</label>
            <div className="flex flex-wrap gap-2">
              {TUB_TYPES.map(t => (
                <button key={t} type="button" onClick={() => updateBathroom(i, { tubType: t })}
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                    br.tubType === t ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1"># Sinks</label>
            <input type="number" min="1" max="4" value={br.sinks || ''}
              onChange={e => updateBathroom(i, { sinks: Number(e.target.value) || undefined })}
              className="w-24 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
          </div>

          <div>
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Notes</label>
            <textarea rows={2} value={br.notes || ''}
              onChange={e => updateBathroom(i, { notes: e.target.value })}
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
