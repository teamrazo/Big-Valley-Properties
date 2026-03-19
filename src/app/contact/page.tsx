'use client'

import Image from 'next/image'

export default function ContactPage() {
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
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">First Name *</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Last Name *</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Email *</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-ink mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none" placeholder="(530) 555-0123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-ink mb-1.5">I am a... *</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none">
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
                  <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm bg-white focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none resize-none" placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
                <p className="text-xs text-alpine-slate/60">
                  By submitting this form, you agree to our privacy policy. We&apos;ll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-canvas-sand rounded p-8 mb-8">
                <h3 className="font-heading text-h4 text-charcoal-ink mb-6">Office Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Address</p>
                      <p className="text-cabin-timber text-sm mt-0.5">1313 Main St A<br />Weaverville, CA 96093</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Phone</p>
                      <a href="tel:5304101992" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green">(530) 410-1992</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Email</p>
                      <a href="mailto:retta@bvptrinity.com" className="text-cabin-timber text-sm mt-0.5 hover:text-forest-green">retta@bvptrinity.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">Office Hours</p>
                      <p className="text-cabin-timber text-sm mt-0.5">Monday – Friday: 10am – 5pm<br />Weekends: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-[4/3] bg-canvas-sand rounded flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto text-river-stone/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="text-alpine-slate text-sm font-medium">1313 Main St A</p>
                  <p className="text-alpine-slate text-sm">Weaverville, CA 96093</p>
                  <p className="text-xs text-alpine-slate/60 mt-2">Interactive map coming soon</p>
                </div>
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
          <a href="tel:5304101992" className="btn-primary bg-white text-forest-green hover:bg-gray-100 text-lg px-12 py-4">
            (530) 410-1992
          </a>
        </div>
      </section>
    </>
  )
}
