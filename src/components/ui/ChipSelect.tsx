'use client'

import { useState } from 'react'

interface Props {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  allowOther?: boolean
  label?: string
}

export default function ChipSelect({ options, selected, onChange, allowOther, label }: Props) {
  const [otherValue, setOtherValue] = useState('')
  const [showOtherInput, setShowOtherInput] = useState(false)

  const toggle = (val: string) => {
    onChange(
      selected.includes(val)
        ? selected.filter(s => s !== val)
        : [...selected, val]
    )
  }

  const addOther = () => {
    if (otherValue.trim() && !selected.includes(otherValue.trim())) {
      onChange([...selected, otherValue.trim()])
      setOtherValue('')
      setShowOtherInput(false)
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-2 rounded-lg text-sm border transition-colors min-h-[44px] ${
              selected.includes(opt)
                ? 'bg-forest-green text-white border-forest-green'
                : 'bg-white dark:bg-gray-800 text-charcoal-ink dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-forest-green'
            }`}
          >
            {selected.includes(opt) ? '✓ ' : ''}{opt}
          </button>
        ))}
        {allowOther && !showOtherInput && (
          <button
            type="button"
            onClick={() => setShowOtherInput(true)}
            className="px-3 py-2 rounded-lg text-sm border border-dashed border-gray-300 dark:border-gray-600 text-cabin-timber dark:text-gray-400 hover:border-forest-green transition-colors min-h-[44px]"
          >
            + Other
          </button>
        )}
        {/* Show custom values not in options */}
        {selected.filter(s => !options.includes(s)).map(custom => (
          <button
            key={custom}
            type="button"
            onClick={() => toggle(custom)}
            className="px-3 py-2 rounded-lg text-sm border bg-forest-green text-white border-forest-green min-h-[44px]"
          >
            ✓ {custom}
          </button>
        ))}
      </div>
      {showOtherInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={otherValue}
            onChange={e => setOtherValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addOther()}
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white text-sm focus:ring-2 focus:ring-forest-green outline-none min-h-[44px]"
            placeholder="Enter custom value"
            autoFocus
          />
          <button type="button" onClick={addOther} className="px-4 py-2 bg-forest-green text-white rounded-lg text-sm min-h-[44px]">Add</button>
          <button type="button" onClick={() => setShowOtherInput(false)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm min-h-[44px]">✕</button>
        </div>
      )}
    </div>
  )
}
