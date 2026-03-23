'use client'

import { useState } from 'react'

const STEPS = [
  'Type & Address',
  'Details',
  'Features',
  'Description',
  'Photos',
  'Pricing',
  'Showing Info',
  'Review & Submit',
] as const

const propertyTypes = ['Single Family', 'Cabin', 'Ranch', 'Land', 'Farm', 'Multi-Family', 'Commercial']
const propertySubTypes = ['Detached', 'Attached', 'Manufactured', 'Log Home', 'A-Frame']

export default function NewListingWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    propertyType: '',
    propertySubType: '',
    streetAddress: '',
    city: '',
    county: 'Trinity',
    postalCode: '',
    bedrooms: '',
    bathrooms: '',
    livingArea: '',
    lotSizeAcres: '',
    yearBuilt: '',
    features: [] as string[],
    publicRemarks: '',
    voiceNotes: '',
    photos: [] as File[],
    listPrice: '',
    previousListPrice: '',
    hasHOA: false,
    hoaFeeMonthly: '',
    showingInstructions: '',
    privateRemarks: '',
    directions: '',
  })

  const updateForm = (updates: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...updates }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-2">New Listing</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <button
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                i === step ? 'bg-forest-green text-white' : i < step ? 'bg-forest-green/20 text-forest-green' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{i + 1}</span>
              {label}
            </button>
            {i < STEPS.length - 1 && <div className="w-4 h-px bg-gray-300 dark:bg-gray-700 mx-1" />}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800">
        {/* Step 1: Type & Address */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Property Type *</label>
              <select value={form.propertyType} onChange={(e) => updateForm({ propertyType: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                <option value="">Select type...</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Property Sub-Type</label>
              <select value={form.propertySubType} onChange={(e) => updateForm({ propertySubType: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                <option value="">Select sub-type...</option>
                {propertySubTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Street Address *</label>
              <input value={form.streetAddress} onChange={(e) => updateForm({ streetAddress: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="123 Mountain View Dr" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input value={form.city} onChange={(e) => updateForm({ city: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">County *</label>
                <select value={form.county} onChange={(e) => updateForm({ county: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                  <option value="Trinity">Trinity</option>
                  <option value="Shasta">Shasta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP *</label>
                <input value={form.postalCode} onChange={(e) => updateForm({ postalCode: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <input type="number" value={form.bedrooms} onChange={(e) => updateForm({ bedrooms: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <input type="number" step="0.5" value={form.bathrooms} onChange={(e) => updateForm({ bathrooms: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Living Area (sqft)</label>
                <input type="number" value={form.livingArea} onChange={(e) => updateForm({ livingArea: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Lot Size (acres)</label>
                <input type="number" step="0.01" value={form.lotSizeAcres} onChange={(e) => updateForm({ lotSizeAcres: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year Built</label>
              <input type="number" value={form.yearBuilt} onChange={(e) => updateForm({ yearBuilt: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
        )}

        {/* Step 3: Features */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-cabin-timber dark:text-gray-400">Select features that apply to this property:</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {['Creek Frontage', 'Mountain Views', 'Well Water', 'City Water', 'Septic', 'Sewer', 'Propane Heat', 'Central Heat/Air', 'Wood Stove', 'Fireplace', 'Garage', 'Carport', 'Workshop', 'Barn', 'Fenced', 'Gated', 'Solar', 'Generator', 'Wraparound Deck', 'Pool'].map((f) => (
                <label key={f} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="checkbox"
                    checked={form.features.includes(f)}
                    onChange={(e) => {
                      if (e.target.checked) updateForm({ features: [...form.features, f] })
                      else updateForm({ features: form.features.filter((x) => x !== f) })
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Description */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Public Remarks *</label>
              <textarea value={form.publicRemarks} onChange={(e) => updateForm({ publicRemarks: e.target.value })} rows={6} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Describe this property..." />
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span>🎙️</span>
                <span className="text-sm font-medium text-gray-500">Voice Notes</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-400 px-2 py-0.5 rounded">Coming Soon</span>
              </div>
              <p className="text-xs text-gray-400">Record voice notes about this property (Phase 3)</p>
            </div>
          </div>
        )}

        {/* Step 5: Photos */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-sm text-cabin-timber dark:text-gray-400 mb-4">Drag and drop photos here, or click to browse</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) updateForm({ photos: [...form.photos, ...Array.from(e.target.files)] })
                }}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="inline-flex px-6 py-3 bg-forest-green text-white rounded-lg font-medium text-sm cursor-pointer hover:bg-forest-green/90 transition-colors">
                Choose Files
              </label>
            </div>
            {form.photos.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {form.photos.map((file, i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <p className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 6: Pricing */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">List Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={form.listPrice} onChange={(e) => updateForm({ listPrice: e.target.value })} className="w-full pl-8 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.hasHOA} onChange={(e) => updateForm({ hasHOA: e.target.checked })} className="rounded" />
                <span className="text-sm">Has HOA</span>
              </label>
              {form.hasHOA && (
                <div>
                  <input type="number" value={form.hoaFeeMonthly} onChange={(e) => updateForm({ hoaFeeMonthly: e.target.value })} className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-sm" placeholder="Monthly HOA $" />
                </div>
              )}
            </div>
            {/* Grayed Phase 3 MLS fields */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-60">
              <div className="flex items-center gap-2 mb-2">
                <span>🔒</span>
                <span className="text-sm font-medium text-gray-500">MLS Pricing Fields</span>
              </div>
              <p className="text-xs text-gray-400">Original List Price, Close Price, Close Date — available in Phase 3</p>
            </div>
          </div>
        )}

        {/* Step 7: Showing Info */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Showing Instructions</label>
              <textarea value={form.showingInstructions} onChange={(e) => updateForm({ showingInstructions: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="e.g., Call listing agent 24 hours in advance..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Directions</label>
              <textarea value={form.directions} onChange={(e) => updateForm({ directions: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Driving directions to property..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Private Remarks (agents only)</label>
              <textarea value={form.privateRemarks} onChange={(e) => updateForm({ privateRemarks: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Internal notes..." />
            </div>
          </div>
        )}

        {/* Step 8: Review & Submit */}
        {step === 7 && (
          <div className="space-y-6">
            <h2 className="font-heading text-lg">Review Your Listing</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Type:</span> {form.propertyType || '—'}</div>
              <div><span className="text-gray-500">Address:</span> {form.streetAddress || '—'}, {form.city}</div>
              <div><span className="text-gray-500">County:</span> {form.county}</div>
              <div><span className="text-gray-500">Price:</span> {form.listPrice ? `$${Number(form.listPrice).toLocaleString()}` : '—'}</div>
              <div><span className="text-gray-500">Beds/Baths:</span> {form.bedrooms || '—'} / {form.bathrooms || '—'}</div>
              <div><span className="text-gray-500">Sqft:</span> {form.livingArea || '—'}</div>
              <div><span className="text-gray-500">Acres:</span> {form.lotSizeAcres || '—'}</div>
              <div><span className="text-gray-500">Year Built:</span> {form.yearBuilt || '—'}</div>
              <div><span className="text-gray-500">Photos:</span> {form.photos.length} uploaded</div>
              <div><span className="text-gray-500">Features:</span> {form.features.length} selected</div>
            </div>
            {form.publicRemarks && (
              <div>
                <span className="text-gray-500 text-sm">Description:</span>
                <p className="text-sm mt-1">{form.publicRemarks.slice(0, 200)}...</p>
              </div>
            )}
            <button className="w-full py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-forest-green/90 transition-colors">
              Submit for Review
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button onClick={prev} disabled={step === 0} className="px-6 py-2 text-sm font-medium text-cabin-timber dark:text-gray-400 disabled:opacity-30">
            ← Previous
          </button>
          {step < STEPS.length - 1 && (
            <button onClick={next} className="px-6 py-2 bg-forest-green text-white rounded-lg text-sm font-medium hover:bg-forest-green/90 transition-colors">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
