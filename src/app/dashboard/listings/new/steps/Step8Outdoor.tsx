'use client'

import { useState } from 'react'
import type { StepProps } from '../wizardTypes'
import ChipSelect from '@/components/ui/ChipSelect'
import CollapsibleSection from '@/components/ui/CollapsibleSection'

const OUTDOOR_FEATURES = ['Deck', 'Covered Patio', 'Porch', 'Garden Area', 'Greenhouse', 'Fruit Trees', 'Pool', 'Hot Tub']
const INSPECTION_FLAGS = [
  { key: 'dryRot', label: 'Dry Rot' },
  { key: 'termiteDamage', label: 'Termite Damage' },
  { key: 'cracksInWallsFoundation', label: 'Cracks in Walls/Foundation' },
  { key: 'oldRoof', label: 'Old Roof' },
  { key: 'oldHVAC', label: 'Old HVAC' },
  { key: 'deckNeedsReplacement', label: 'Deck Needs Replacement' },
] as const

export default function Step8Outdoor({ data, update, onNext, onBack }: StepProps) {
  const pd = data.propertyDetails
  const outdoor = pd.outdoor || {}
  const inspections = pd.inspections || {}
  const guestHouse = pd.guestHouse || { hasGuestHouse: false }
  const additionalLot = pd.additionalLot
  const [showGuest, setShowGuest] = useState(guestHouse.hasGuestHouse)
  const [showAddlLot, setShowAddlLot] = useState(!!additionalLot?.address)

  const updateOutdoor = (patch: Record<string, unknown>) => {
    update({ propertyDetails: { ...pd, outdoor: { ...outdoor, ...patch } } })
  }
  const updateInspections = (patch: Record<string, unknown>) => {
    update({ propertyDetails: { ...pd, inspections: { ...inspections, ...patch } } })
  }

  // Outbuildings
  const outbuildings = outdoor.outbuildings || []
  const addOutbuilding = () => updateOutdoor({ outbuildings: [...outbuildings, { type: '', sqft: '' }] })
  const updateOutbuilding = (i: number, patch: Record<string, string>) => {
    const updated = [...outbuildings]
    updated[i] = { ...updated[i], ...patch }
    updateOutdoor({ outbuildings: updated })
  }
  const removeOutbuilding = (i: number) => updateOutdoor({ outbuildings: outbuildings.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Outdoor & Extras</h2>

      {/* Outbuildings */}
      <CollapsibleSection title="Outbuildings" icon="🏚️">
        {outbuildings.map((ob, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <input type="text" value={ob.type} placeholder="Type (barn, shop, shed)"
                onChange={e => updateOutbuilding(i, { type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
            </div>
            <div className="w-28">
              <input type="text" value={ob.sqft || ''} placeholder="Sqft"
                onChange={e => updateOutbuilding(i, { sqft: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
            </div>
            <button type="button" onClick={() => removeOutbuilding(i)}
              className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg min-h-[44px]">✕</button>
          </div>
        ))}
        <button type="button" onClick={addOutbuilding}
          className="text-sm text-forest-green hover:text-deep-pine min-h-[44px]">+ Add Outbuilding</button>
      </CollapsibleSection>

      {/* Yard */}
      <CollapsibleSection title="Yard" icon="🌿">
        <div className="space-y-2">
          {[
            { key: 'fenced', label: 'Fenced' },
            { key: 'sprinklers', label: 'Sprinklers' },
            { key: 'autoTimers', label: 'Auto Timers' },
            { key: 'landscaped', label: 'Landscaped' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="checkbox" checked={(outdoor.yard as Record<string, boolean>)?.[key] || false}
                onChange={e => updateOutdoor({ yard: { ...outdoor.yard, [key]: e.target.checked } })}
                className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
              <span className="text-sm text-charcoal-ink dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Features */}
      <ChipSelect label="Outdoor Features" options={OUTDOOR_FEATURES}
        selected={outdoor.features || []} onChange={v => updateOutdoor({ features: v })} allowOther />

      {/* Fencing & Easement */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Property Fencing</label>
          <input type="text" value={outdoor.propertyFencing || ''}
            onChange={e => updateOutdoor({ propertyFencing: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
            placeholder="Wood, chain link, barbed wire" />
        </div>
        <div>
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Easement Notes</label>
          <input type="text" value={outdoor.easement || ''}
            onChange={e => updateOutdoor({ easement: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
            placeholder="PG&E easement on north side" />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
        <input type="checkbox" checked={outdoor.gatedDrive || false}
          onChange={e => updateOutdoor({ gatedDrive: e.target.checked })}
          className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
        <span className="text-sm text-charcoal-ink dark:text-gray-300">Gated Driveway</span>
      </label>

      {/* Guest House */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
          <input type="checkbox" checked={showGuest}
            onChange={e => {
              setShowGuest(e.target.checked)
              update({ propertyDetails: { ...pd, guestHouse: { hasGuestHouse: e.target.checked } } })
            }}
            className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
          <span className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Guest House / ADU</span>
        </label>
        {showGuest && (
          <div className="grid grid-cols-2 gap-3 mt-3 ml-7">
            <input type="text" value={guestHouse.type || ''} placeholder="Type (cottage, studio)"
              onChange={e => update({ propertyDetails: { ...pd, guestHouse: { ...guestHouse, type: e.target.value } } })}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
            <input type="text" value={guestHouse.sqft || ''} placeholder="Sqft"
              onChange={e => update({ propertyDetails: { ...pd, guestHouse: { ...guestHouse, sqft: e.target.value } } })}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
          </div>
        )}
      </div>

      {/* Additional Lot */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
          <input type="checkbox" checked={showAddlLot}
            onChange={e => {
              setShowAddlLot(e.target.checked)
              if (!e.target.checked) update({ propertyDetails: { ...pd, additionalLot: undefined } })
            }}
            className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
          <span className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Additional Lot Included</span>
        </label>
        {showAddlLot && (
          <div className="mt-3 ml-7">
            <input type="text" value={additionalLot?.address || ''} placeholder="Address or APN"
              onChange={e => update({ propertyDetails: { ...pd, additionalLot: { ...additionalLot, address: e.target.value } } })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white" />
          </div>
        )}
      </div>

      {/* Inspection Flags */}
      <CollapsibleSection title="Inspection Flags" icon="⚠️">
        <div className="space-y-2">
          {INSPECTION_FLAGS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="checkbox" checked={(inspections as Record<string, boolean>)[key] || false}
                onChange={e => updateInspections({ [key]: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
              <span className="text-sm text-charcoal-ink dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
        <div>
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Inspection Notes</label>
          <textarea rows={2} value={inspections.notes || ''}
            onChange={e => updateInspections({ notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y" />
        </div>
      </CollapsibleSection>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
