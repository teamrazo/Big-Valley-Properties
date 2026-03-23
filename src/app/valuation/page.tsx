'use client'

import { useState } from 'react'

export default function ValuationPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'valuation-request',
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: `Valuation Request — ${form.address}, ${form.city}\n\n${form.message}`,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-padding">
        <div className="container-bvp max-w-2xl text-center">
          <div className="text-5xl mb-4">🏡</div>
          <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-4">Request Received!</h1>
          <p className="text-cabin-timber dark:text-gray-400">
            Thank you, {form.firstName}. Our broker will review your property details and provide a complimentary market valuation within 48 hours.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container-bvp text-center">
          <h1 className="font-heading text-hero text-white mb-4">What&apos;s Your Home Worth?</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Get a free, no-obligation market valuation from the top-selling brokerage in Trinity and Shasta Counties.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-bvp max-w-2xl">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 -mt-12 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">First Name *</label>
                  <input id="firstName" type="text" required value={form.firstName} onChange={e => update('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Last Name *</label>
                  <input id="lastName" type="text" required value={form.lastName} onChange={e => update('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Email *</label>
                  <input id="email" type="email" required value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Phone</label>
                  <input id="phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Property Address *</label>
                  <input id="address" type="text" required value={form.address} onChange={e => update('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
                    placeholder="1234 Mountain Rd" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">City *</label>
                  <input id="city" type="text" required value={form.city} onChange={e => update('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
                    placeholder="Weaverville" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Additional Details</label>
                <textarea id="message" rows={3} value={form.message} onChange={e => update('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
                  placeholder="Recent improvements, timeline for selling, special features..." />
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}

              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]">
                {submitting ? 'Submitting...' : 'Get My Free Valuation'}
              </button>

              <p className="text-xs text-cabin-timber/60 dark:text-gray-600 text-center">
                No obligation. Your information is kept confidential and used only for the valuation.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
