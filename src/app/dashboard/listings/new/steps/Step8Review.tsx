'use client'

import { useState } from 'react'
import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
      <h3 className="text-sm font-semibold text-cabin-timber dark:text-gray-500 uppercase tracking-wide mb-2">{title}</h3>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | number | undefined }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-1">
      <span className="text-sm text-cabin-timber dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-charcoal-ink dark:text-white text-right max-w-[60%]">{value}</span>
    </div>
  )
}

export default function Step8Review({ data, onBack }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    // TODO: POST to /api/listings when API is wired
    await new Promise(r => setTimeout(r, 2000))
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-2">Listing Submitted!</h2>
        <p className="text-cabin-timber dark:text-gray-400 text-sm mb-6">
          Your listing has been sent to the broker for review. You&apos;ll be notified when it&apos;s approved.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/dashboard/listings" className="px-6 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">
            View Listings
          </a>
          <a href="/dashboard/listings/new" className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">
            Create Another
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Review & Submit</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">Review your listing before submitting for broker approval.</p>

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

        <Section title="Features">
          {data.features.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {data.features.map(f => (
                <span key={f} className="text-xs bg-forest-green/10 text-forest-green px-2 py-1 rounded-full">{f}</span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No features selected</p>
          )}
        </Section>

        <Section title="Description">
          <p className="text-sm text-charcoal-ink dark:text-gray-300 whitespace-pre-wrap">
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
          <Row label="Listing Date" value={data.listingContractDate} />
          <Row label="Expiration" value={data.expirationDate} />
        </Section>
      </div>

      {/* Phase 3 sync button */}
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-lg px-4 py-3">
        <span>🔒</span>
        <span>&quot;Submit & Sync to MLS&quot; available in Phase 3</span>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]"
        >
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </div>
  )
}
