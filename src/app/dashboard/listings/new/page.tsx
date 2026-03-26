'use client'

import { useState } from 'react'
import StructuredWizard from './StructuredWizard'
import SmartCaptureWizard from './SmartCaptureWizard'

type Mode = 'select' | 'structured' | 'smart'

export default function NewListingPage() {
  const [mode, setMode] = useState<Mode>('select')

  if (mode === 'structured') return <StructuredWizard onBack={() => setMode('select')} />
  if (mode === 'smart') return <SmartCaptureWizard onBack={() => setMode('select')} />

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-2">New Listing</h1>
      <p className="text-sm text-cabin-timber dark:text-gray-400 mb-8">Choose how you&apos;d like to enter property details.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setMode('structured')}
          className="text-left p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-forest-green transition-colors group"
        >
          <div className="text-3xl mb-3">📋</div>
          <h2 className="font-heading text-lg text-charcoal-ink dark:text-white mb-1 group-hover:text-forest-green transition-colors">
            Step-by-Step Wizard
          </h2>
          <p className="text-sm text-cabin-timber dark:text-gray-400">
            Walk through each section with guided fields. Best for desk entry.
          </p>
        </button>

        <button
          onClick={() => setMode('smart')}
          className="text-left p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-forest-green transition-colors group"
        >
          <div className="text-3xl mb-3">🎙️</div>
          <h2 className="font-heading text-lg text-charcoal-ink dark:text-white mb-1 group-hover:text-forest-green transition-colors">
            Smart Capture
          </h2>
          <p className="text-sm text-cabin-timber dark:text-gray-400">
            Record notes while walking the property, let AI fill in the details.
          </p>
        </button>
      </div>
    </div>
  )
}
