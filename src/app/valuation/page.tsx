'use client'

import { useState } from 'react'

export default function ValuationPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: 'Trinity',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateForm = (updates: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...updates }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'valuation',
          message: `Property Valuation Request\nAddress: ${form.address}, ${form.city}, ${form.county} County\n\n${form.message}`,
        }),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-padding">
        <div className="container-bvp max-w-2xl text-center">
          <div className="text-6xl mb-6">🏡</div>
          <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-4">Thank You!</h1>
          <p className="text-cabin-timber dark:text-gray-400 text-lg">We&apos;ve received your valuation request. One of our agents will reach out within 24 hours with a personalized market analysis.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-bvp max-w-2xl">
        <h1 className="section-heading mb-4">Free Property Valuation</h1>
        <p className="text-cabin-timber dark:text-gray-400 text-center max-w-xl mx-auto mb-12">
          Curious what your property is worth? Our agents provide complimentary market analyses for Trinity and Shasta County properties.
        </p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <input required value={form.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <input required value={form.lastName} onChange={(e) => updateForm({ lastName: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input required type="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Property Address *</label>
            <input required value={form.address} onChange={(e) => updateForm({ address: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="123 Mountain View Dr" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input required value={form.city} onChange={(e) => updateForm({ city: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">County *</label>
              <select value={form.county} onChange={(e) => updateForm({ county: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                <option value="Trinity">Trinity</option>
                <option value="Shasta">Shasta</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Additional Details</label>
            <textarea value={form.message} onChange={(e) => updateForm({ message: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Any details about your property..." />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-forest-green/90 transition-colors disabled:opacity-50">
            {loading ? 'Submitting...' : 'Request Free Valuation'}
          </button>
        </form>
      </div>
    </section>
  )
}
