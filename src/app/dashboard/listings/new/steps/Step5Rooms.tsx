'use client'

import type { StepProps } from '../wizardTypes'
import type { RoomDetails, KitchenDetails } from '@/types/propertyDetails'
import ChipSelect from '@/components/ui/ChipSelect'
import CollapsibleSection from '@/components/ui/CollapsibleSection'

const FLOORING = ['Hardwood', 'Carpet', 'Vinyl', 'Tile', 'Laminate', 'Concrete']
const WINDOWS = ['Dual Pane', 'Single Pane', 'Bay Window', 'Sliding']
const CEILING = ['Vaulted', 'Exposed Beams', 'Tray', 'Cathedral', 'Popcorn']
const COUNTERS = ['Granite', 'Quartz', 'Laminate', 'Butcher Block', 'Tile']

function RoomEditor({ room, onChange, label }: { room: RoomDetails; onChange: (r: RoomDetails) => void; label: string }) {
  return (
    <CollapsibleSection title={label} icon="🏠">
      <ChipSelect label="Flooring" options={FLOORING} selected={room.flooring || []}
        onChange={v => onChange({ ...room, flooring: v })} allowOther />
      <ChipSelect label="Windows" options={WINDOWS} selected={room.windows || []}
        onChange={v => onChange({ ...room, windows: v })} />
      <ChipSelect label="Ceiling Features" options={CEILING} selected={room.ceilingFeatures || []}
        onChange={v => onChange({ ...room, ceilingFeatures: v })} />
      <div>
        <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Notes</label>
        <textarea rows={2} value={room.notes || ''}
          onChange={e => onChange({ ...room, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y" />
      </div>
    </CollapsibleSection>
  )
}

export default function Step5Rooms({ data, update, onNext, onBack }: StepProps) {
  const pd = data.propertyDetails
  const rooms = pd.rooms || {}

  const updateRooms = (patch: Record<string, unknown>) => {
    update({ propertyDetails: { ...pd, rooms: { ...rooms, ...patch } } })
  }

  const kitchen = (rooms.kitchen || {}) as KitchenDetails

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Interior Rooms</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">Expand sections to add details. Leave collapsed if not applicable.</p>

      <RoomEditor label="Living Room" room={rooms.livingRoom || {}} onChange={r => updateRooms({ livingRoom: r })} />

      <CollapsibleSection title="Kitchen" icon="🍳">
        <ChipSelect label="Flooring" options={FLOORING} selected={kitchen.flooring || []}
          onChange={v => updateRooms({ kitchen: { ...kitchen, flooring: v } })} allowOther />
        <ChipSelect label="Counters" options={COUNTERS} selected={kitchen.counters || []}
          onChange={v => updateRooms({ kitchen: { ...kitchen, counters: v } })} allowOther />
        <ChipSelect label="Extras" options={['Island', 'Pantry', 'Breakfast Bar', 'Built-in Wine Rack']}
          selected={kitchen.extras || []}
          onChange={v => updateRooms({ kitchen: { ...kitchen, extras: v } })} allowOther />
        <div>
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Notes (appliances, ages, conditions)</label>
          <textarea rows={3} value={kitchen.notes || ''}
            onChange={e => updateRooms({ kitchen: { ...kitchen, notes: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-charcoal-ink dark:text-white resize-y"
            placeholder="Stainless steel fridge (3 yr), dishwasher (5 yr)..." />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Dining Room" icon="🍽️">
        <div className="flex gap-2 mb-3">
          {['Formal', 'In-Kitchen', 'Off-Kitchen'].map(t => (
            <button key={t} type="button"
              onClick={() => updateRooms({ diningRoom: { ...rooms.diningRoom, type: t } })}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
                (rooms.diningRoom as Record<string,unknown>)?.type === t ? 'bg-forest-green text-white border-forest-green' : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>{t}</button>
          ))}
        </div>
        <ChipSelect label="Flooring" options={FLOORING} selected={(rooms.diningRoom as RoomDetails)?.flooring || []}
          onChange={v => updateRooms({ diningRoom: { ...rooms.diningRoom, flooring: v } })} allowOther />
      </CollapsibleSection>

      <RoomEditor label="Family Room" room={rooms.familyRoom || {}} onChange={r => updateRooms({ familyRoom: r })} />
      <RoomEditor label="Office / Den" room={rooms.officeDen || {}} onChange={r => updateRooms({ officeDen: r })} />
      <RoomEditor label="Entertainment Room" room={rooms.entertainmentRoom || {}} onChange={r => updateRooms({ entertainmentRoom: r })} />

      {/* Laundry */}
      <CollapsibleSection title="Laundry" icon="🧺">
        <div>
          <label className="block text-xs text-cabin-timber dark:text-gray-400 mb-1">Location</label>
          <input type="text" value={rooms.laundry?.location || ''}
            onChange={e => updateRooms({ laundry: { ...rooms.laundry, location: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm min-h-[44px] text-charcoal-ink dark:text-white"
            placeholder="Hallway, garage, dedicated room" />
        </div>
        <label className="flex items-center gap-2 min-h-[44px] cursor-pointer">
          <input type="checkbox" checked={rooms.laundry?.washerDryerIncluded || false}
            onChange={e => updateRooms({ laundry: { ...rooms.laundry, washerDryerIncluded: e.target.checked } })}
            className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
          <span className="text-sm text-charcoal-ink dark:text-gray-300">Washer/Dryer Included</span>
        </label>
        <label className="flex items-center gap-2 min-h-[44px] cursor-pointer">
          <input type="checkbox" checked={rooms.laundry?.hasSink || false}
            onChange={e => updateRooms({ laundry: { ...rooms.laundry, hasSink: e.target.checked } })}
            className="w-5 h-5 rounded border-gray-300 text-forest-green focus:ring-forest-green" />
          <span className="text-sm text-charcoal-ink dark:text-gray-300">Has Sink</span>
        </label>
      </CollapsibleSection>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
