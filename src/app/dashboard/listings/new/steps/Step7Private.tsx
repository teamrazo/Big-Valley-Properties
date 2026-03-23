'use client'

import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step7Private({ data, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Private Notes & Showing Instructions</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">
        🔒 These fields are <strong>never shown to the public</strong>. Only visible to agents and brokers.
      </p>

      <div>
        <label htmlFor="showingInstructions" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Showing Instructions</label>
        <textarea
          id="showingInstructions"
          rows={3}
          value={data.showingInstructions}
          onChange={e => update({ showingInstructions: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
          placeholder="Lock box code, gate access, appointment requirements..."
        />
      </div>

      <div>
        <label htmlFor="directions" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Directions</label>
        <textarea
          id="directions"
          rows={2}
          value={data.directions}
          onChange={e => update({ directions: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
          placeholder="Turn left off Highway 299 at..."
        />
      </div>

      <div>
        <label htmlFor="privateRemarks" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Private Agent Remarks</label>
        <textarea
          id="privateRemarks"
          rows={4}
          value={data.privateRemarks}
          onChange={e => update({ privateRemarks: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
          placeholder="Seller motivation, known issues, negotiation notes..."
        />
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Review →</button>
      </div>
    </div>
  )
}
