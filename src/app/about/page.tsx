import Image from 'next/image'
import Link from 'next/link'
import AgentCard from '@/components/AgentCard'
import { agents } from '@/data/agents'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/areas/trinity-alps-2.jpg" alt="Trinity Alps" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-green/90 to-forest-green/60" />
        </div>
        <div className="container-bvp relative z-10">
          <p className="text-river-stone font-body text-sm uppercase tracking-brand-widest mb-3">Our Story</p>
          <h1 className="font-heading text-h1 text-white mb-4 max-w-2xl">Making Dreams Become Reality, One Property at a Time</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Big Valley Properties is the top-selling brokerage in Trinity County, serving families across Trinity and Shasta Counties with integrity, expertise, and heart.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">About Us</p>
              <h2 className="section-heading">Rooted in Northern California</h2>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Big Valley Properties was founded by Retta Treanor with a simple mission: to provide exceptional, personalized real estate service to the communities of Northern California. What started as one broker&apos;s passion for helping families find their perfect home has grown into the region&apos;s most trusted brokerage.
              </p>
              <p className="text-cabin-timber leading-relaxed mb-6">
                We specialize in the unique properties that define life in Trinity and Shasta Counties: from riverside cabins and historic homesteads to sprawling ranches and lakeside retreats. Our agents don&apos;t just sell homes; they help people find their place in one of America&apos;s most beautiful landscapes.
              </p>
              <p className="text-cabin-timber leading-relaxed">
                Every transaction is guided by our core values: <strong className="text-forest-green">Educate, Negotiate, Communicate.</strong> We believe that informed clients make the best decisions, and our job is to ensure you feel confident and supported every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-md">
                  <Image src="/images/properties/hyampom-road.jpg" alt="Mountain homestead" fill className="object-cover" sizes="300px" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-md">
                  <Image src="/images/areas/trinity-alps-1.jpg" alt="Trinity Alps meadow" fill className="object-cover" sizes="300px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Where We Serve</p>
            <h2 className="section-heading">Our Service Areas</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Trinity County */}
            <div className="bg-white rounded overflow-hidden shadow-brand-sm">
              <div className="relative aspect-video">
                <Image src="/images/areas/trinity-alps-2.jpg" alt="Trinity County" fill className="object-cover" sizes="600px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 font-heading text-2xl text-white">Trinity County</h3>
              </div>
              <div className="p-6">
                <p className="text-cabin-timber leading-relaxed mb-4">
                  The heart of our business. Trinity County offers unmatched natural beauty with the Trinity Alps Wilderness, pristine rivers, and charming mountain communities. We serve Weaverville, Hayfork, Lewiston, Junction City, Big Bar, Hyampom, and surrounding areas.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Weaverville', 'Hayfork', 'Lewiston', 'Junction City', 'Big Bar', 'Hyampom'].map(area => (
                    <span key={area} className="px-3 py-1 bg-canvas-sand text-sm text-cabin-timber rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Shasta County */}
            <div className="bg-white rounded overflow-hidden shadow-brand-sm">
              <div className="relative aspect-video">
                <Image src="/images/areas/mt-shasta-1.jpg" alt="Shasta County" fill className="object-cover" sizes="600px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 font-heading text-2xl text-white">Shasta County</h3>
              </div>
              <div className="p-6">
                <p className="text-cabin-timber leading-relaxed mb-4">
                  From the majesty of Mt. Shasta to the shores of Shasta Lake, Shasta County offers diverse living opportunities. We serve Redding, Anderson, Cottonwood, Shasta Lake, Lakehead, and surrounding communities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Redding', 'Anderson', 'Cottonwood', 'Shasta Lake', 'Lakehead'].map(area => (
                    <span key={area} className="px-3 py-1 bg-canvas-sand text-sm text-cabin-timber rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Our People</p>
            <h2 className="section-heading">The Team</h2>
            <p className="section-subheading mx-auto">
              Meet the dedicated professionals who make Big Valley Properties the most trusted brokerage in Northern California.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image src="/images/areas/mt-shasta-2.jpg" alt="Mt. Shasta" fill className="object-cover" quality={85} />
          <div className="absolute inset-0 bg-forest-green/80" />
        </div>
        <div className="container-narrow relative z-10 text-center">
          <h2 className="font-heading text-h1 text-white mb-4">Let&apos;s Work Together</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Ready to buy, sell, or just explore your options? Our team is here to help.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-forest-green hover:bg-gray-100">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  )
}
