'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'website-contact',
          firstName: fd.get('firstName') as string,
          lastName: fd.get('lastName') as string,
          email: fd.get('email') as string,
          phone: (fd.get('phone') as string) || undefined,
          message: `Type: ${fd.get('contactType') || 'N/A'}\n\n${fd.get('message') || ''}`,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container-bvp text-center">
          <p className="text-river-stone font-body text-sm uppercase tracking-brand-widest mb-3">Get In Touch</p>
          <h1 className="font-heading text-h1 text-white mb-3">Contact Us</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, or just have questions, we&apos;d love to hear from you. Reach out and let&apos;s start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-h3 text-charcoal-ink mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-heading text-h3 text-charcoal-ink mb-2">Message Sent!</h3>
                  <p className="text-cabin-timber">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
              <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">First Name *</label>
                    <input name="firstName" type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Last Name *</label>
                    <input name="lastName" type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Email *</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Phone</label>
                    <input name="phone" type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="(530) 555-0123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-ink mb-1.5">I am a... *</label>
                  <select name="contactType" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none">
                    <option value="">Select one</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="both">Both Buyer & Seller</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Message *</label>
                  <textarea name="message" rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none resize-none" placeholder="Tell us how we can help..." />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
                <p className="text-xs text-alpine-slate/60">
                  By submitting this form, you agree to our privacy policy. We&apos;ll never share your information with third parties.
                </p>
              </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              {/* Weaverville Office */}
              <div className="bg-canvas-sand rounded p-8 mb-6">
                <h3 className="font-heading text-h4 text-charcoal-ink mb-6">Weaverville Office</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Address</p>
                      <a href="https://maps.app.goo.gl/UHEFNkZZn8iDZSJm6" target="_blank" rel="noopener noreferrer" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green transition-colors">
                        1313 Main St A<br />Weaverville, CA 96093
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Phone</p>
                      <a href="tel:5306235690" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green">(530) 623-5690</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Office Hours</p>
                      <p className="text-cabin-timber text-sm mt-0.5">Monday - Friday: 10am - 5pm<br />Weekends: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hayfork Office */}
              <div className="bg-canvas-sand rounded p-8 mb-6">
                <h3 className="font-heading text-h4 text-charcoal-ink mb-6">Hayfork Office</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Address</p>
                      <a href="https://maps.app.goo.gl/wxvBHJSNST7N3VBd7" target="_blank" rel="noopener noreferrer" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green transition-colors">
                        7050 CA-3<br />Hayfork, CA 96041
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Phone</p>
                      <a href="tel:5306285850" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green">(530) 628-5850</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Office Hours</p>
                      <p className="text-cabin-timber text-sm mt-0.5">Monday - Saturday: 8am - 5pm<br />Sunday: 8am - 5pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-canvas-sand rounded p-8 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal-ink text-sm">Email</p>
                    <a href="mailto:retta@bvptrinity.com" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green">retta@bvptrinity.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="text-center mb-10">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Our Locations</p>
            <h2 className="section-heading">Visit Our Offices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weaverville Map */}
            <div className="bg-white rounded-lg overflow-hidden shadow-brand-sm">
              <div className="aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3665603640748!2d-122.92990692356076!3d40.721621037025905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d25218948fb5a5%3A0x252645bd3bea600a!2sBig%20Valley%20Properties!5e1!3m2!1sen!2sus!4v1773953605690!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Big Valley Properties Weaverville Office"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-charcoal-ink mb-1">Weaverville Office</h3>
                <p className="text-cabin-timber text-sm">1313 Main St A, Weaverville, CA 96093</p>
                <a href="tel:5306235690" className="text-forest-green text-sm font-medium hover:text-deep-pine mt-1 inline-block">(530) 623-5690</a>
              </div>
            </div>

            {/* Hayfork Map */}
            <div className="bg-white rounded-lg overflow-hidden shadow-brand-sm">
              <div className="aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97006.41932254695!2d-123.33634560273438!3d40.55372550000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d3a7e6133e71a9%3A0xc806b77e1aceb1e9!2sBig%20Valley%20Properties!5e0!3m2!1sen!2sus!4v1773953565688!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Big Valley Properties Hayfork Office"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-charcoal-ink mb-1">Hayfork Office</h3>
                <p className="text-cabin-timber text-sm">7050 CA-3, Hayfork, CA 96041</p>
                <a href="tel:5306285850" className="text-forest-green text-sm font-medium hover:text-deep-pine mt-1 inline-block">(530) 628-5850</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <Image src="/images/properties/river-deck.jpg" alt="River view" fill className="object-cover" quality={80} />
          <div className="absolute inset-0 bg-forest-green/85" />
        </div>
        <div className="container-narrow relative z-10 text-center">
          <h2 className="font-heading text-h2 text-white mb-4">Prefer to Talk?</h2>
          <p className="text-white/80 text-lg mb-8">
            Give us a call and speak directly with one of our agents. We&apos;re always happy to chat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5306235690" className="btn-primary bg-white text-forest-green hover:bg-gray-100 text-lg px-10 py-4">
              Weaverville: (530) 623-5690
            </a>
            <a href="tel:5306285850" className="btn-primary bg-white text-forest-green hover:bg-gray-100 text-lg px-10 py-4">
              Hayfork: (530) 628-5850
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
