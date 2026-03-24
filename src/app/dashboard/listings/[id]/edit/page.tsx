'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Step1TypeAddress from '../../new/steps/Step1TypeAddress'
import Step2Details from '../../new/steps/Step2Details'
import Step3Structure from '../../new/steps/Step3Structure'
import Step4Utilities from '../../new/steps/Step4Utilities'
import Step5Rooms from '../../new/steps/Step5Rooms'
import Step6Bedrooms from '../../new/steps/Step6Bedrooms'
import Step7Bathrooms from '../../new/steps/Step7Bathrooms'
import Step8Outdoor from '../../new/steps/Step8Outdoor'
import Step9DescriptionPricing from '../../new/steps/Step9DescriptionPricing'
import { defaultWizardData } from '../../new/wizardTypes'
import type { WizardData } from '../../new/wizardTypes'

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
]

type ListingResponse = {
  id: string
  propertyType: string
  propertySubType: string | null
  streetAddress: string
  city: string
  county: string
  postalCode: string
  stateOrProvince: string
  bedrooms: number
  bathrooms: number
  livingArea: number | null
  lotSizeAcres: number | null
  yearBuilt: number | null
  publicRemarks: string | null
  listPrice: number
  listingContractDate: string | null
  expirationDate: string | null
  hasHOA: boolean
  hoaFeeMonthly: number | null
  privateRemarks: string | null
  showingInstructions: string | null
  directions: string | null
  features: { featureValue: string }[]
  propertyDetails?: Record<string, unknown> | null
  walkthroughNotes?: string | null
}

export default function EditListingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${params.id}`)
        if (!res.ok) throw new Error('Failed to load listing')
        const listing: ListingResponse = await res.json()
        setData({
          ...defaultWizardData,
          propertyType: listing.propertyType,
          propertySubType: listing.propertySubType || '',
          streetAddress: listing.streetAddress,
          city: listing.city,
          county: listing.county,
          postalCode: listing.postalCode,
          stateOrProvince: listing.stateOrProvince,
          bedrooms: String(listing.bedrooms),
          bathrooms: String(listing.bathrooms),
          livingArea: listing.livingArea ? String(listing.livingArea) : '',
          lotSizeAcres: listing.lotSizeAcres ? String(listing.lotSizeAcres) : '',
          yearBuilt: listing.yearBuilt ? String(listing.yearBuilt) : '',
          features: listing.features.map(f => f.featureValue),
          publicRemarks: listing.publicRemarks || '',
          listPrice: String(listing.listPrice),
          listingContractDate: listing.listingContractDate ? listing.listingContractDate.split('T')[0] : '',
          expirationDate: listing.expirationDate ? listing.expirationDate.split('T')[0] : '',
          hasHOA: listing.hasHOA,
          hoaFeeMonthly: listing.hoaFeeMonthly ? String(listing.hoaFeeMonthly) : '',
          privateRemarks: listing.privateRemarks || '',
          showingInstructions: listing.showingInstructions || '',
          directions: listing.directions || '',
          propertyDetails: (listing.propertyDetails as WizardData['propertyDetails']) || {},
          walkthroughNotes: listing.walkthroughNotes || '',
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.id])

  const update = (partial: Partial<WizardData>) => setData(prev => prev ? { ...prev, ...partial } : prev)
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/listings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType: data.propertyType,
          propertySubType: data.propertySubType || undefined,
          streetAddress: data.streetAddress,
          city: data.city,
          county: data.county,
          postalCode: data.postalCode,
          stateOrProvince: data.stateOrProvince,
          bedrooms: Number(data.bedrooms) || 0,
          bathrooms: Number(data.bathrooms) || 0,
          livingArea: data.livingArea ? Number(data.livingArea) : undefined,
          lotSizeAcres: data.lotSizeAcres ? Number(data.lotSizeAcres) : undefined,
          yearBuilt: data.yearBuilt ? Number(data.yearBuilt) : undefined,
          features: data.features,
          publicRemarks: data.publicRemarks || undefined,
          listPrice: Number(data.listPrice),
          listingContractDate: data.listingContractDate || undefined,
          expirationDate: data.expirationDate || undefined,
          hasHOA: data.hasHOA,
          hoaFeeMonthly: data.hoaFeeMonthly ? Number(data.hoaFeeMonthly) : undefined,
          privateRemarks: data.privateRemarks || undefined,
          showingInstructions: data.showingInstructions || undefined,
          directions: data.directions || undefined,
          propertyDetails: Object.keys(data.propertyDetails).length > 0 ? data.propertyDetails : undefined,
          walkthroughNotes: data.walkthroughNotes || undefined,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save')
      }
      router.push('/dashboard/listings')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto text-center py-12 text-cabin-timber dark:text-gray-400">Loading listing...</div>
  }

  if (error && !data) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400">{error}</div>
        <Link href="/dashboard/listings" className="mt-4 inline-block text-sm text-forest-green hover:underline">← Back to listings</Link>
      </div>
    )
  }

  if (!data) return null

  const stepProps = { data, update, onNext: next, onBack: back }
  const STEP_COMPONENTS = [
    Step1TypeAddress, Step2Details, Step3Structure, Step4Utilities,
    Step5Rooms, Step6Bedrooms, Step7Bathrooms, Step8Outdoor, Step9DescriptionPricing,
  ]
  const CurrentStep = STEP_COMPONENTS[step]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/listings" className="text-cabin-timber dark:text-gray-400 hover:text-charcoal-ink dark:hover:text-white transition-colors">← Back</Link>
        <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white">Edit Listing</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {STEPS.map((label, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              i === step
                ? 'bg-forest-green text-white'
                : 'bg-white dark:bg-gray-900 text-cabin-timber dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}>{label}</button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400 mb-4">{error}</div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <CurrentStep {...stepProps} />
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
