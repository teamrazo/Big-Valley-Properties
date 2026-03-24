'use client'

import { useState } from 'react'
import type { StepProps } from '../wizardTypes'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
      <h3 className="text-sm font-semibold text-cabin-timber dark:text-gray-500 uppercase tracking-wide mb-2">{title}</h3>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | number | undefined | null }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-1">
      <span className="text-sm text-cabin-timber dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-charcoal-ink dark:text-white text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function ChipList({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-gray-400">None</p>
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(f => (
        <span key={f} className="text-xs bg-forest-green/10 text-forest-green px-2 py-1 rounded-full">{f}</span>
      ))}
    </div>
  )
}

export default function Step10Review({ data, onBack }: StepProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pd = data.propertyDetails

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
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
          propertyDetails: Object.keys(pd).length > 0 ? pd : undefined,
          walkthroughNotes: data.walkthroughNotes || undefined,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create listing')
      }
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-2">Listing Submitted!</h2>
        <p className="text-cabin-timber dark:text-gray-400 text-sm mb-6">
          Your listing has been sent to the broker for review.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/dashboard/listings" className="px-6 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">View Listings</a>
          <a href="/dashboard/listings/new" className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium min-h-[48px]">Create Another</a>
        </div>
      </div>
    )
  }

  // Collect warnings for missing recommended fields
  const warnings: string[] = []
  if (!data.publicRemarks) warnings.push('No public description')
  if (!data.photos.length) warnings.push('No photos uploaded')
  if (!pd.structure?.foundation?.length) warnings.push('No foundation type')
  if (!pd.utilities?.waterSource?.length) warnings.push('No water source')

  return (
    <div className="space-y-5">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Review & Submit</h2>

      {warnings.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
          <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">Recommended fields missing:</p>
          <ul className="text-xs text-yellow-600 dark:text-yellow-500 space-y-0.5">
            {warnings.map(w => <li key={w}>• {w}</li>)}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <Section title="Property">
          <Row label="Type" value={data.propertyType} />
          <Row label="Address" value={`${data.streetAddress}, ${data.city}, ${data.county} County, ${data.stateOrProvince} ${data.postalCode}`} />
        </Section>

        <Section title="Details">
          <Row label="Bedrooms" value={data.bedrooms} />
          <Row label="Bathrooms" value={data.bathrooms} />
          <Row label="Living Area" value={data.livingArea ? `${data.livingArea} sqft` : undefined} />
          <Row label="Lot Size" value={data.lotSizeAcres ? `${data.lotSizeAcres} acres` : undefined} />
          <Row label="Year Built" value={data.yearBuilt} />
        </Section>

        {pd.structure && (
          <Section title="Structure">
            {pd.structure.foundation?.length ? <><span className="text-xs text-cabin-timber dark:text-gray-500">Foundation:</span> <ChipList items={pd.structure.foundation} /></> : null}
            {pd.structure.roofType?.length ? <><span className="text-xs text-cabin-timber dark:text-gray-500">Roof:</span> <ChipList items={pd.structure.roofType} /></> : null}
            {pd.structure.siding?.length ? <><span className="text-xs text-cabin-timber dark:text-gray-500">Siding:</span> <ChipList items={pd.structure.siding} /></> : null}
            <Row label="Garage" value={pd.structure.garage?.type} />
          </Section>
        )}

        {pd.utilities && (
          <Section title="Utilities">
            {pd.utilities.waterSource?.length ? <><span className="text-xs text-cabin-timber dark:text-gray-500">Water:</span> <ChipList items={pd.utilities.waterSource} /></> : null}
            <Row label="Sewer" value={pd.utilities.sewer?.type} />
            {pd.utilities.heating?.length ? <><span className="text-xs text-cabin-timber dark:text-gray-500">Heating:</span> <ChipList items={pd.utilities.heating} /></> : null}
          </Section>
        )}

        <Section title="Description">
          <p className="text-sm text-charcoal-ink dark:text-gray-300 whitespace-pre-wrap line-clamp-6">
            {data.publicRemarks || <span className="text-gray-400">No description</span>}
          </p>
        </Section>

        <Section title="Photos">
          {data.photoUrls.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {data.photoUrls.slice(0, 6).map((url, i) => (
                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {data.photoUrls.length > 6 && (
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                  +{data.photoUrls.length - 6}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No photos uploaded</p>
          )}
        </Section>

        <Section title="Pricing">
          <Row label="List Price" value={data.listPrice ? `$${Number(data.listPrice).toLocaleString()}` : undefined} />
          <Row label="HOA" value={data.hasHOA ? `$${data.hoaFeeMonthly || '0'}/mo` : 'None'} />
        </Section>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={handleSubmit} disabled={submitting}
          className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]">
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </div>
  )
}
