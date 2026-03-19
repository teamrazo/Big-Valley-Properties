import Image from 'next/image'
import AgentCard from '@/components/AgentCard'
import { agents } from '@/data/agents'

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/areas/trinity-alps-1.jpg" alt="Trinity Alps" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-forest-green/80" />
        </div>
        <div className="container-bvp relative z-10 text-center">
          <p className="text-river-stone font-body text-sm uppercase tracking-brand-widest mb-3">Our People</p>
          <h1 className="font-heading text-h1 text-white mb-4">Meet the Team</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Our experienced team of real estate professionals is dedicated to helping you navigate the unique markets of Trinity and Shasta Counties.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <h2 className="section-heading">Join Our Team</h2>
          <p className="section-subheading mx-auto mb-8">
            Are you a licensed real estate agent looking to grow your career in Northern California? Big Valley Properties is always looking for talented, passionate professionals to join our team.
          </p>
          <a href="mailto:retta@bvptrinity.com?subject=Career Inquiry" className="btn-primary">
            Get In Touch
          </a>
        </div>
      </section>
    </>
  )
}
