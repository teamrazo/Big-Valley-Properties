import Image from 'next/image'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import AgentCard from '@/components/AgentCard'
import { getFeaturedProperties, getPropertiesByCounty } from '@/data/properties'
import { agents, getAgentsByCounty } from '@/data/agents'

export default function HomePage() {
  const featured = getFeaturedProperties()
  const trinityProperties = getPropertiesByCounty('Trinity').slice(0, 3)
  const shastaProperties = getPropertiesByCounty('Shasta').slice(0, 3)
  const trinityAgents = getAgentsByCounty('Trinity')
  const shastaAgents = getAgentsByCounty('Shasta')

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/areas/trinity-alps-2.jpg"
            alt="Trinity Alps wilderness"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="container-bvp relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-river-stone font-body text-sm uppercase tracking-brand-widest mb-4 animate-fade-in-up">
              Top-Selling Brokerage in Trinity County
            </p>
            <h1 className="font-heading text-hero text-white leading-tight mb-6 animate-fade-in-up animate-delay-100">
              Making Dreams<br />
              Become Reality
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up animate-delay-200">
              Big Valley Properties specializes in mountain cabins, ranch land, and unique homes across Trinity and Shasta Counties in Northern California.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <Link href="/properties" className="btn-primary">
                Browse Properties
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-forest-green">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══ BROKER SPOTLIGHT ═══ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Meet Your Broker</p>
              <h2 className="section-heading">Retta Treanor</h2>
              <p className="text-forest-green font-medium text-lg mb-2">Broker / Owner</p>
              <p className="text-alpine-slate text-xs mb-6">CA DRE #01301868</p>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Retta Treanor is the founder and Broker/Owner of Big Valley Properties, the top-selling brokerage in Trinity County. With deep roots in Northern California and a passion for helping families find their dream homes, Retta brings unmatched local expertise and dedication to every transaction.
              </p>
              <p className="text-cabin-timber leading-relaxed mb-8">
                Her philosophy is simple: <strong className="text-forest-green">Educate, Negotiate, Communicate.</strong> Whether you&apos;re buying your first mountain cabin or selling a multi-generational ranch, Retta&apos;s personalized approach ensures a seamless experience from start to finish.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: '#1', label: 'Brokerage in Trinity County' },
                  { value: '2', label: 'Counties Served' },
                  { value: '100%', label: 'Client Dedication' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-3xl text-forest-green">{stat.value}</p>
                    <p className="text-xs text-alpine-slate mt-1 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="tel:5304101992" className="btn-primary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (530) 410-1992
                </a>
                <Link href="/agents/retta-treanor" className="btn-outline">
                  Full Profile
                </Link>
              </div>
            </div>

            {/* Image collage placeholder */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-lg">
                    <Image src="/images/properties/river-deck.jpg" alt="River view from deck" fill className="object-cover" sizes="300px" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-lg">
                    <Image src="/images/properties/cabin-creek.jpg" alt="Creek-side cabin" fill className="object-cover" sizes="300px" />
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-forest-green/20 rounded -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROPERTIES ═══ */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Handpicked For You</p>
            <h2 className="section-heading">Featured Properties</h2>
            <p className="section-subheading mx-auto">
              Discover our curated selection of the finest homes, cabins, and ranches in Northern California.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.slice(0, 6).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/properties" className="btn-outline">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRINITY COUNTY ═══ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Explore</p>
              <h2 className="section-heading">Trinity County</h2>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Nestled in the heart of the Trinity Alps, Trinity County offers unparalleled natural beauty, from pristine rivers and ancient forests to towering mountain peaks. It&apos;s a haven for those seeking peace, adventure, and authentic mountain living.
              </p>
              <div className="relative aspect-video rounded overflow-hidden mb-6 shadow-brand-md">
                <Image src="/images/areas/trinity-alps-1.jpg" alt="Trinity Alps meadow" fill className="object-cover" sizes="400px" />
              </div>
              
              <h4 className="font-heading text-h4 text-charcoal-ink mb-4">Our Trinity County Agents</h4>
              <div className="space-y-4">
                {trinityAgents.map(agent => (
                  <Link key={agent.id} href={`/agents/${agent.slug}`} className="flex items-center gap-4 p-3 rounded hover:bg-canvas-sand transition-colors">
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <span className="text-forest-green font-heading text-sm">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">{agent.name}</p>
                      <p className="text-alpine-slate text-xs">{agent.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Properties */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-6">
                {trinityProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="mt-8">
                <Link href="/properties?county=Trinity" className="btn-outline text-sm">
                  All Trinity County Properties →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHASTA COUNTY ═══ */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Properties */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="grid sm:grid-cols-2 gap-6">
                {shastaProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="mt-8">
                <Link href="/properties?county=Shasta" className="btn-outline text-sm">
                  All Shasta County Properties →
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Explore</p>
              <h2 className="section-heading">Shasta County</h2>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Home to the majestic Mt. Shasta and Shasta Lake, Shasta County combines small-town charm with big outdoor adventure. From rolling ranchlands to lakeside retreats, this is Northern California living at its finest.
              </p>
              <div className="relative aspect-video rounded overflow-hidden mb-6 shadow-brand-md">
                <Image src="/images/areas/mt-shasta-1.jpg" alt="Mt. Shasta reflection" fill className="object-cover" sizes="400px" />
              </div>

              <h4 className="font-heading text-h4 text-charcoal-ink mb-4">Our Shasta County Agents</h4>
              <div className="space-y-4">
                {shastaAgents.map(agent => (
                  <Link key={agent.id} href={`/agents/${agent.slug}`} className="flex items-center gap-4 p-3 rounded hover:bg-white transition-colors">
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <span className="text-forest-green font-heading text-sm">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm">{agent.name}</p>
                      <p className="text-alpine-slate text-xs">{agent.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT BVP ═══ */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Our Story</p>
          <h2 className="section-heading">About Big Valley Properties</h2>
          <p className="text-cabin-timber leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
            Big Valley Properties is more than a brokerage — we&apos;re your neighbors, your advocates, and your guides to Northern California&apos;s most beautiful landscapes. Founded by Retta Treanor with a vision of personalized, ethical real estate service, we&apos;ve grown to become the top-selling brokerage in Trinity County.
          </p>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                ),
                title: 'Educate',
                desc: 'We empower our clients with market knowledge and insights so they can make confident, informed decisions.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ),
                title: 'Negotiate',
                desc: 'We fight for the best terms and protect your interests at every stage of the transaction.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                ),
                title: 'Communicate',
                desc: 'We keep you informed every step of the way, because transparency builds trust.',
              },
            ].map(item => (
              <div key={item.title} className="p-8 rounded bg-canvas-sand">
                <div className="w-16 h-16 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-4 text-forest-green">
                  {item.icon}
                </div>
                <h3 className="font-heading text-h4 text-charcoal-ink mb-3">{item.title}</h3>
                <p className="text-alpine-slate text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/about" className="btn-outline">Learn More About Us</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA / CONTACT ═══ */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image src="/images/areas/mt-shasta-2.jpg" alt="Road to Mt. Shasta" fill className="object-cover" quality={85} />
          <div className="absolute inset-0 bg-forest-green/80" />
        </div>
        <div className="container-narrow relative z-10 text-center">
          <h2 className="font-heading text-h1 text-white mb-4">Ready to Find Your Place?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for a creekside cabin, a sprawling ranch, or your family&apos;s forever home — we&apos;re here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-forest-green hover:bg-gray-100">
              Contact Us Today
            </Link>
            <Link href="/properties" className="btn-outline border-white text-white hover:bg-white hover:text-forest-green">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Client Stories</p>
            <h2 className="section-heading">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Retta went above and beyond to help us find the perfect cabin in Trinity County. Her knowledge of the area and dedication to our family was remarkable. We couldn't be happier!",
                name: 'Sarah & Tom M.',
                role: 'Homebuyers — Junction City',
              },
              {
                quote: "Selling our ranch was emotional, but Big Valley Properties handled it with such care and professionalism. They got us an incredible price and made the whole process smooth.",
                name: 'Robert D.',
                role: 'Seller — Hayfork',
              },
            ].map(t => (
              <div key={t.name} className="p-8 bg-canvas-sand rounded">
                <svg className="w-8 h-8 text-forest-green/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z"/>
                </svg>
                <p className="font-accent italic text-charcoal-ink leading-relaxed text-lg mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-medium text-charcoal-ink">{t.name}</p>
                  <p className="text-alpine-slate text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
