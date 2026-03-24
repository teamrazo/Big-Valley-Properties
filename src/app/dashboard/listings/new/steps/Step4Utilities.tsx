'use client'

import type { StepProps } from '../wizardTypes'
import ChipSelect from '@/components/ui/ChipSelect'

const WATER = ['City', 'Private Well', 'Community Well', 'Spring', 'Seasonal', 'River/Creek']
const POWER = ['City', 'County', 'Solar', 'Generator']
const HEATING = ['Electric', 'Propane', 'Woodstove', 'Monitor', 'Mini Split', 'Central Furnace']
const COOLING = ['AC', 'Swamp Cooler', 'Mini Split']

export default function Step4Utilities({ data, update, onNext, onBack }: StepProps) {
  const pd = data.propertyDetails
  const u = pd.utilities || {}

  const updateUtil = (patch: Record<string, unknown>) => {
    update({ propertyDetails: { ...pd, utilities: { ...u, ...patch } } })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Utilities</h2>

      <ChipSelect label="Water Source" options={WATER} selected={u.waterSource || []}
        onChange={v => updateUtil({ waterSource: v })} allowOther />

      {/* Sewer */}
      <div>
        <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">Sewer</label>
        <div className="flex gap-2 mb-3">
          {['City', 'Septic'].map(t => (
            <button key={t} type="button"
              onClick={() => updateUtil({ sewer: { ...u.sewer, type: t } })}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                u.sewer?.type === t ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>
              {t}
            </button>
          ))}
        </div>
        {u.sewer?.type === 'Septic' && (
          <div className="grid grid-cols-2 gap-3 ml-2">
            <div>
              <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Septic Size</label>
              <input type="text" value={u.sewer?.septicSize || ''}
                onChange={e => updateUtil({ sewer: { ...u.sewer, septicSize: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
                placeholder="1000 gal" />
            </div>
            <div>
              <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Year Installed</label>
              <input type="text" value={u.sewer?.septicYear || ''}
                onChange={e => updateUtil({ sewer: { ...u.sewer, septicYear: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
                placeholder="2015" />
            </div>
          </div>
        )}
      </div>

      <ChipSelect label="Power" options={POWER} selected={u.power || []}
        onChange={v => updateUtil({ power: v })} allowOther />

      <ChipSelect label="Heating" options={HEATING} selected={u.heating || []}
        onChange={v => updateUtil({ heating: v })} allowOther />

      <div>
        <ChipSelect label="Cooling" options={COOLING} selected={u.cooling?.types || []}
          onChange={v => updateUtil({ cooling: { ...u.cooling, types: v } })} allowOther />
        {(u.cooling?.types?.length || 0) > 0 && (
          <div className="mt-2 ml-2">
            <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Cooling System Age</label>
            <input type="text" value={u.cooling?.age || ''}
              onChange={e => updateUtil({ cooling: { ...u.cooling, age: e.target.value } })}
              className="w-48 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
              placeholder="5 years" />
          </div>
        )}
      </div>

      {(u.heating?.includes('Mini Split') || u.cooling?.types?.includes('Mini Split')) && (
        <div>
          <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Mini Split Rooms</label>
          <input type="text" value={u.miniSplitRooms || ''}
            onChange={e => updateUtil({ miniSplitRooms: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
            placeholder="Living room, master bedroom" />
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
