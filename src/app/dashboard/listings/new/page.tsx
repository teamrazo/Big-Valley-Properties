'use client'

import { useState } from 'react'
import Step1TypeAddress from './steps/Step1TypeAddress'
import Step2Details from './steps/Step2Details'
import Step3Features from './steps/Step3Features'
import Step4Description from './steps/Step4Description'
import Step5Photos from './steps/Step5Photos'
import Step6Pricing from './steps/Step6Pricing'
import Step7Private from './steps/Step7Private'
import Step8Review from './steps/Step8Review'

export type WizardData = {
  // Step 1
  propertyType: string
  propertySubType: string
  streetAddress: string
  city: string
  county: string
  postalCode: string
  stateOrProvince: string
  // Step 2
  bedrooms: string
  bathrooms: string
  livingArea: string
  lotSizeAcres: string
  yearBuilt: string
  // Step 3
  features: string[]
  // Step 4
  publicRemarks: string
  // Step 5
  photos: File[]
  photoUrls: string[]
  // Step 6
  listPrice: string
  listingContractDate: string
  expirationDate: string
  hasHOA: boolean
  hoaFeeMonthly: string
  // Step 7
  privateRemarks: string
  showingInstructions: string
  directions: string
  // Step 8 (read-only review)
}

const STEPS = [
  'Type & Address',
  'Key Details',
  'Features',
  'Description',
  'Photos',
  'Pricing',
  'Private Notes',
  'Review & Submit',
]

const defaultData: WizardData = {
  propertyType: '', propertySubType: '', streetAddress: '', city: '',
  county: 'Trinity', postalCode: '', stateOrProvince: 'CA',
  bedrooms: '', bathrooms: '', livingArea: '', lotSizeAcres: '', yearBuilt: '',
  features: [], publicRemarks: '', photos: [], photoUrls: [],
  listPrice: '', listingContractDate: '', expirationDate: '', hasHOA: false, hoaFeeMonthly: '',
  privateRemarks: '', showingInstructions: '', directions: '',
}

export default function NewListingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultData)
  const [isOnline] = useState(true) // TODO: wire to navigator.onLine

  const update = (partial: Partial<WizardData>) => setData(prev => ({ ...prev, ...partial }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const stepProps = { data, update, onNext: next, onBack: back }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">New Listing</h1>
        {/* Network status */}
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          isOnline
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {isOnline ? '● Online' : '● Offline'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-cabin-timber dark:text-gray-500 mb-2">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-forest-green rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-3">
          {STEPS.map((label, i) => (
            <div
              key={i}
              title={label}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < step ? 'bg-forest-green' : i === step ? 'bg-forest-green ring-2 ring-forest-green/30' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        {step === 0 && <Step1TypeAddress {...stepProps} />}
        {step === 1 && <Step2Details {...stepProps} />}
        {step === 2 && <Step3Features {...stepProps} />}
        {step === 3 && <Step4Description {...stepProps} />}
        {step === 4 && <Step5Photos {...stepProps} />}
        {step === 5 && <Step6Pricing {...stepProps} />}
        {step === 6 && <Step7Private {...stepProps} />}
        {step === 7 && <Step8Review {...stepProps} />}
      </div>

      {/* Auto-save notice */}
      <p className="text-xs text-cabin-timber/60 dark:text-gray-600 text-center mt-4">
        Progress is auto-saved locally. You can return to this form anytime.
      </p>
    </div>
  )
}
