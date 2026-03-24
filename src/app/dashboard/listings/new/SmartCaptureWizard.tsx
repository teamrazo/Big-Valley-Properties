'use client'

import { useState, useCallback } from 'react'
import { defaultWizardData } from './wizardTypes'
import type { WizardData } from './wizardTypes'
import type { PropertyDetails } from '@/types/propertyDetails'
import Step1TypeAddress from './steps/Step1TypeAddress'
import Step2Details from './steps/Step2Details'
import VoiceRecorder from '@/components/VoiceRecorder'
import Step9DescriptionPricing from './steps/Step9DescriptionPricing'
import Step10Review from './steps/Step10Review'

const SECTION_LABELS = [
  'Living Room', 'Kitchen', 'Master Bedroom', 'Bedroom 2', 'Bedroom 3',
  'Bathroom', 'Dining Room', 'Garage', 'Outdoor', 'Utilities', 'General'
]

const SMART_STEPS = ['Property Basics', 'Key Details', 'Walk-Through Notes', 'AI Processing', 'Photos & Pricing', 'Review & Submit']

export default function SmartCaptureWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultWizardData)
  const [processing, setProcessing] = useState(false)
  const [extracted, setExtracted] = useState<PropertyDetails | null>(null)
  const [missing, setMissing] = useState<string[]>([])
  const [processError, setProcessError] = useState<string | null>(null)

  const update = useCallback((partial: Partial<WizardData>) => setData(prev => ({ ...prev, ...partial })), [])
  const next = () => setStep(s => Math.min(s + 1, SMART_STEPS.length - 1))
  const back = () => step === 0 ? onBack() : setStep(s => Math.max(s - 1, 0))

  const stepProps = { data, update, onNext: next, onBack: back }

  const handleTranscription = useCallback((text: string) => {
    setData(prev => ({
      ...prev,
      walkthroughNotes: prev.walkthroughNotes ? `${prev.walkthroughNotes}\n\n${text}` : text
    }))
  }, [])

  const insertLabel = (label: string) => {
    const header = `\n\n--- ${label} ---\n`
    update({ walkthroughNotes: data.walkthroughNotes + header })
  }

  const handleProcess = async () => {
    setProcessing(true)
    setProcessError(null)
    try {
      const res = await fetch('/api/ai/extract-property-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: data.walkthroughNotes, existingData: data.propertyDetails }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Processing failed')
      }
      const result = await res.json()
      setExtracted(result.extracted)
      setMissing(result.missing || [])
      update({ propertyDetails: result.extracted })
      next()
    } catch (e) {
      setProcessError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">New Listing</h1>
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-forest-green/10 text-forest-green">🎙️ Smart Capture</span>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-cabin-timber dark:text-gray-500 mb-2">
          <span>Step {step + 1} of {SMART_STEPS.length}</span>
          <span>{SMART_STEPS[step]}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-forest-green rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / SMART_STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        {/* Step 0: Property Basics */}
        {step === 0 && <Step1TypeAddress {...stepProps} />}

        {/* Step 1: Key Details */}
        {step === 1 && <Step2Details {...stepProps} />}

        {/* Step 2: Walk-Through Notes */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Walk-Through Notes</h2>
            <p className="text-sm text-cabin-timber dark:text-gray-400">
              Record voice notes or type as you walk through the property. Tap section labels to organize.
            </p>

            {/* Section labels */}
            <div className="flex flex-wrap gap-2">
              {SECTION_LABELS.map(label => (
                <button key={label} type="button" onClick={() => insertLabel(label)}
                  className="px-3 py-1.5 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-cabin-timber dark:text-gray-400 hover:border-forest-green hover:text-forest-green transition-colors min-h-[36px]">
                  {label}
                </button>
              ))}
            </div>

            {/* Voice recorder */}
            <VoiceRecorder onTranscription={handleTranscription} />

            {/* Notes textarea */}
            <textarea
              rows={12}
              value={data.walkthroughNotes}
              onChange={e => update({ walkthroughNotes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y text-sm font-mono"
              placeholder="Start typing or recording your walkthrough notes...&#10;&#10;Example: Kitchen has granite counters, stainless steel appliances. Dishwasher about 3 years old. Vinyl flooring in good condition..."
            />

            <div className="flex justify-between pt-2">
              <button onClick={back} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium min-h-[48px]">← Back</button>
              <button onClick={handleProcess} disabled={!data.walkthroughNotes.trim() || processing}
                className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]">
                {processing ? '✨ Processing...' : '✨ Process Notes'}
              </button>
            </div>
            {processError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {processError}
              </div>
            )}
          </div>
        )}

        {/* Step 3: AI Processing results */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">AI Extracted Details</h2>
            <p className="text-sm text-cabin-timber dark:text-gray-400">
              Review what the AI extracted from your notes. You can edit any field.
            </p>

            {missing.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">Missing recommended fields:</p>
                <ul className="text-xs text-yellow-600 dark:text-yellow-500">
                  {missing.map(m => <li key={m}>• {m}</li>)}
                </ul>
              </div>
            )}

            {extracted && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3 text-sm">
                <pre className="whitespace-pre-wrap text-xs text-charcoal-ink dark:text-gray-300 overflow-auto max-h-96">
                  {JSON.stringify(extracted, null, 2)}
                </pre>
              </div>
            )}

            <p className="text-xs text-cabin-timber dark:text-gray-500">
              💡 You can go back to add more notes, or continue to add photos and pricing.
            </p>

            <div className="flex justify-between pt-2">
              <button onClick={back} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium min-h-[48px]">← Back</button>
              <button onClick={next} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
            </div>
          </div>
        )}

        {/* Step 4: Photos & Pricing */}
        {step === 4 && <Step9DescriptionPricing {...stepProps} />}

        {/* Step 5: Review */}
        {step === 5 && <Step10Review {...stepProps} />}
      </div>
    </div>
  )
}
