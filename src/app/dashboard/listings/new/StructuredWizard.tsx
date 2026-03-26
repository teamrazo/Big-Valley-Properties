'use client'

import { useState } from 'react'
import { defaultWizardData } from './wizardTypes'
import type { WizardData } from './wizardTypes'
import Step1TypeAddress from './steps/Step1TypeAddress'
import Step2Details from './steps/Step2Details'
import Step3Structure from './steps/Step3Structure'
import Step4Utilities from './steps/Step4Utilities'
import Step5Rooms from './steps/Step5Rooms'
import Step6Bedrooms from './steps/Step6Bedrooms'
import Step7Bathrooms from './steps/Step7Bathrooms'
import Step8Outdoor from './steps/Step8Outdoor'
import Step9DescriptionPricing from './steps/Step9DescriptionPricing'
import Step10Review from './steps/Step10Review'

const STEPS = [
  'Type & Address',
  'Key Details',
  'Structure',
  'Utilities',
  'Interior Rooms',
  'Bedrooms',
  'Bathrooms',
  'Outdoor & Extras',
  'Description & Pricing',
  'Review & Submit',
]

export default function StructuredWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultWizardData)

  const update = (partial: Partial<WizardData>) => setData(prev => ({ ...prev, ...partial }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => step === 0 ? onBack() : setStep(s => Math.max(s - 1, 0))

  const stepProps = { data, update, onNext: next, onBack: back }
  const STEP_COMPONENTS = [
    Step1TypeAddress, Step2Details, Step3Structure, Step4Utilities,
    Step5Rooms, Step6Bedrooms, Step7Bathrooms, Step8Outdoor,
    Step9DescriptionPricing, Step10Review,
  ]
  const CurrentStep = STEP_COMPONENTS[step]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">New Listing</h1>
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-forest-green/10 text-forest-green">📋 Wizard</span>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-cabin-timber dark:text-gray-500 mb-2">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-forest-green rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-3">
          {STEPS.map((label, i) => (
            <div key={i} title={label}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < step ? 'bg-forest-green' : i === step ? 'bg-forest-green ring-2 ring-forest-green/30' : 'bg-gray-300 dark:bg-gray-700'
              }`} />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <CurrentStep {...stepProps} />
      </div>

      <p className="text-xs text-cabin-timber/60 dark:text-gray-600 text-center mt-4">
        Progress is auto-saved locally. You can return to this form anytime.
      </p>
    </div>
  )
}
