'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PropertyCard from '@/components/PropertyCard'
import MotionWrapper from '@/components/animations/MotionWrapper'
import StaggerContainer, { staggerItem } from '@/components/animations/StaggerContainer'
import ParallaxImage from '@/components/animations/ParallaxImage'
import CountUp from '@/components/animations/CountUp'
import type { Property } from '@/data/properties'
import type { Agent } from '@/data/agents'

interface Props {
  featured: Property[]
  trinityProperties: Property[]
  shastaProperties: Property[]
  trinityAgents: Agent[]
  shastaAgents: Agent[]
  allAgents: Agent[]
}

export default function HomeClient({
  featured,
  trinityProperties,
  shastaProperties,
  trinityAgents,
  shastaAgents,
  allAgents,
}: Props) {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO — Parallax + animated text
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <ParallaxImage
          src="/images/areas/trinity-alps-2.jpg"
          alt="Trinity Alps wilderness"
          className="absolute inset-0"
          speed={0.25}
          overlay="bg-gradient-to-r from-black/75 via-black/45 to-transparent"
          priority
        />

        <div className="container-bvp relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-river-stone font-body text-sm uppercase tracking-brand-widest mb-4"
            >
              Top-Selling Brokerage in Trinity County
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-heading text-hero text-white leading-tight mb-6"
            >
              Making Dreams<br />
              Become Reality
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Big Valley Properties specializes in mountain cabins, ranch land, and unique homes
              across Trinity and Shasta Counties in Northern California.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/properties" className="btn-primary btn-glow">
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="btn-outline border-white text-white hover:bg-white hover:text-forest-green"
              >
                Schedule a Consultation
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED NEIGHBORHOODS — Prominent section
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-14">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Explore the Region
            </p>
            <h2 className="section-heading">Featured Neighborhoods</h2>
            <p className="section-subheading mx-auto">
              Discover the breathtaking landscapes and welcoming communities of Northern California&apos;s
              most sought-after counties.
            </p>
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Trinity County Card */}
            <MotionWrapper variant="fadeLeft" delay={0.1}>
              <Link href="/properties?county=Trinity" className="group block neighborhood-card rounded-lg h-[420px] lg:h-[480px]">
                <Image
                  src="/images/areas/trinity-alps-1.jpg"
                  alt="Trinity Alps meadow"
                  fill
                  className="object-cover card-image rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="card-overlay rounded-lg" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 card-content">
                  <span className="inline-block text-xs uppercase tracking-brand-widest text-white/70 mb-2 font-body">
                    Trinity County
                  </span>
                  <h3 className="font-heading text-h2 text-white mb-3">
                    Trinity Alps &amp; Beyond
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-md mb-4">
                    Pristine rivers, ancient forests, and towering peaks — discover authentic mountain living
                    in Weaverville, Hayfork, Lewiston, and beyond.
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-body text-sm font-medium uppercase tracking-brand-wide group-hover:gap-3 transition-all duration-300">
                    Explore Trinity County
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </MotionWrapper>

            {/* Shasta County Card */}
            <MotionWrapper variant="fadeRight" delay={0.2}>
              <Link href="/properties?county=Shasta" className="group block neighborhood-card rounded-lg h-[420px] lg:h-[480px]">
                <Image
                  src="/images/areas/mt-shasta-1.jpg"
                  alt="Mt. Shasta reflection"
                  fill
                  className="object-cover card-image rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="card-overlay rounded-lg" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 card-content">
                  <span className="inline-block text-xs uppercase tracking-brand-widest text-white/70 mb-2 font-body">
                    Shasta County
                  </span>
                  <h3 className="font-heading text-h2 text-white mb-3">
                    Majestic Mt. Shasta Region
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-md mb-4">
                    From rolling ranchlands to lakeside retreats near Mt. Shasta and Shasta Lake —
                    Northern California living at its finest.
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-body text-sm font-medium uppercase tracking-brand-wide group-hover:gap-3 transition-all duration-300">
                    Explore Shasta County
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BROKER SPOTLIGHT — Retta Treanor
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-canvas-sand overflow-hidden">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <MotionWrapper variant="fadeLeft">
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
                Meet Your Broker
              </p>
              <h2 className="section-heading">Retta Treanor</h2>
              <p className="text-forest-green font-medium text-lg mb-2">Broker / Owner, CRS</p>
              <p className="text-alpine-slate text-xs mb-6">CA DRE #01301868</p>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Retta Treanor is the founder and Broker/Owner of Big Valley Properties, the top-selling
                brokerage in Trinity County. With deep roots in Northern California and a passion for
                helping families find their dream homes, Retta brings unmatched local expertise and
                dedication to every transaction.
              </p>
              <p className="text-cabin-timber leading-relaxed mb-8">
                Her philosophy is simple:{' '}
                <strong className="text-forest-green">Educate, Negotiate, Communicate.</strong> Whether
                you&apos;re buying your first mountain cabin or selling a multi-generational ranch,
                Retta&apos;s personalized approach ensures a seamless experience from start to finish.
              </p>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: '#1', label: 'Brokerage in Trinity County', isText: true },
                  { value: '2', label: 'Counties Served', isText: false },
                  { value: '100%', label: 'Client Dedication', isText: true },
                ].map((stat) => (
                  <MotionWrapper key={stat.label} variant="scale" delay={0.2} className="text-center">
                    <p className="font-heading text-3xl text-forest-green">{stat.value}</p>
                    <p className="text-xs text-alpine-slate mt-1 leading-tight">{stat.label}</p>
                  </MotionWrapper>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="tel:5304101992" className="btn-primary btn-glow">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (530) 410-1992
                </a>
                <Link href="/agents/retta-treanor" className="btn-outline">
                  Full Profile
                </Link>
              </div>
            </MotionWrapper>

            {/* Image collage */}
            <MotionWrapper variant="fadeRight" delay={0.15}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-lg img-zoom">
                      <Image
                        src="/images/properties/river-deck.jpg"
                        alt="River view from deck"
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-[3/4] relative rounded overflow-hidden shadow-brand-lg img-zoom">
                      <Image
                        src="/images/properties/cabin-creek.jpg"
                        alt="Creek-side cabin"
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-forest-green/20 rounded -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 border-2 border-river-stone/20 rounded -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PROPERTIES — Staggered grid
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Handpicked For You
            </p>
            <h2 className="section-heading">Featured Properties</h2>
            <p className="section-subheading mx-auto">
              Discover our curated selection of the finest homes, cabins, and ranches in Northern
              California.
            </p>
          </MotionWrapper>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.slice(0, 6).map((property) => (
              <motion.div key={property.id} variants={staggerItem}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </StaggerContainer>

          <MotionWrapper className="text-center mt-12" delay={0.3}>
            <Link href="/properties" className="btn-outline">
              View All Properties
            </Link>
          </MotionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRINITY COUNTY — Deep dive section
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-5 gap-12">
            <MotionWrapper variant="fadeLeft" className="lg:col-span-2">
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Explore</p>
              <h2 className="section-heading">Trinity County</h2>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Nestled in the heart of the Trinity Alps, Trinity County offers unparalleled natural
                beauty, from pristine rivers and ancient forests to towering mountain peaks. It&apos;s a
                haven for those seeking peace, adventure, and authentic mountain living.
              </p>
              <div className="relative aspect-video rounded overflow-hidden mb-6 shadow-brand-md img-zoom">
                <Image
                  src="/images/areas/trinity-alps-1.jpg"
                  alt="Trinity Alps meadow"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              <h4 className="font-heading text-h4 text-charcoal-ink mb-4">Our Trinity County Agents</h4>
              <div className="space-y-3">
                {trinityAgents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agents/${agent.slug}`}
                    className="flex items-center gap-4 p-3 rounded hover:bg-white transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 group-hover:bg-forest-green/20 transition-colors duration-300">
                      <span className="text-forest-green font-heading text-sm">
                        {agent.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm group-hover:text-forest-green transition-colors">
                        {agent.name}
                      </p>
                      <p className="text-alpine-slate text-xs">{agent.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </MotionWrapper>

            <div className="lg:col-span-3">
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                {trinityProperties.map((property) => (
                  <motion.div key={property.id} variants={staggerItem}>
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </StaggerContainer>
              <MotionWrapper className="mt-8" delay={0.2}>
                <Link href="/properties?county=Trinity" className="btn-outline text-sm">
                  All Trinity County Properties →
                </Link>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SHASTA COUNTY
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                {shastaProperties.map((property) => (
                  <motion.div key={property.id} variants={staggerItem}>
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </StaggerContainer>
              <MotionWrapper className="mt-8" delay={0.2}>
                <Link href="/properties?county=Shasta" className="btn-outline text-sm">
                  All Shasta County Properties →
                </Link>
              </MotionWrapper>
            </div>

            <MotionWrapper variant="fadeRight" className="lg:col-span-2 order-1 lg:order-2">
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Explore</p>
              <h2 className="section-heading">Shasta County</h2>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Home to the majestic Mt. Shasta and Shasta Lake, Shasta County combines small-town charm
                with big outdoor adventure. From rolling ranchlands to lakeside retreats, this is Northern
                California living at its finest.
              </p>
              <div className="relative aspect-video rounded overflow-hidden mb-6 shadow-brand-md img-zoom">
                <Image
                  src="/images/areas/mt-shasta-1.jpg"
                  alt="Mt. Shasta reflection"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              <h4 className="font-heading text-h4 text-charcoal-ink mb-4">Our Shasta County Agents</h4>
              <div className="space-y-3">
                {shastaAgents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agents/${agent.slug}`}
                    className="flex items-center gap-4 p-3 rounded hover:bg-canvas-sand transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 group-hover:bg-forest-green/20 transition-colors duration-300">
                      <span className="text-forest-green font-heading text-sm">
                        {agent.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-ink text-sm group-hover:text-forest-green transition-colors">
                        {agent.name}
                      </p>
                      <p className="text-alpine-slate text-xs">{agent.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT BVP — Enhanced with image gallery
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-canvas-sand overflow-hidden">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image mosaic */}
            <MotionWrapper variant="fadeLeft">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7 img-zoom rounded overflow-hidden shadow-brand-md">
                  <div className="aspect-[4/3] relative">
                    <Image src="/images/properties/river-deck-porch.jpg" alt="River deck view" fill className="object-cover" sizes="350px" />
                  </div>
                </div>
                <div className="col-span-5 img-zoom rounded overflow-hidden shadow-brand-md">
                  <div className="aspect-[3/4] relative">
                    <Image src="/images/properties/hyampom-road.jpg" alt="Mountain cabin" fill className="object-cover" sizes="250px" />
                  </div>
                </div>
                <div className="col-span-5 img-zoom rounded overflow-hidden shadow-brand-md">
                  <div className="aspect-[3/4] relative">
                    <Image src="/images/properties/riverside-cabin-2.jpg" alt="Riverside cabin" fill className="object-cover" sizes="250px" />
                  </div>
                </div>
                <div className="col-span-7 img-zoom rounded overflow-hidden shadow-brand-md">
                  <div className="aspect-[4/3] relative">
                    <Image src="/images/properties/mountain-farmhouse-aerial.jpg" alt="Mountain farmhouse aerial" fill className="object-cover" sizes="350px" />
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Content */}
            <MotionWrapper variant="fadeRight" delay={0.1}>
              <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">Our Story</p>
              <h2 className="section-heading">About Big Valley Properties</h2>
              <p className="text-cabin-timber leading-relaxed text-lg mb-6">
                Big Valley Properties is more than a brokerage — we&apos;re your neighbors, your advocates,
                and your guides to Northern California&apos;s most beautiful landscapes.
              </p>
              <p className="text-cabin-timber leading-relaxed mb-6">
                Founded by Retta Treanor with a vision of personalized, ethical real estate service,
                we&apos;ve grown to become the top-selling brokerage in Trinity County. Our team of
                dedicated agents brings deep local knowledge, strong negotiation skills, and a genuine
                passion for the communities we serve.
              </p>
              <p className="text-cabin-timber leading-relaxed mb-8">
                Whether you&apos;re searching for a mountain retreat, expansive ranch land, or your
                family&apos;s forever home, Big Valley Properties is committed to making your real estate
                dreams a reality. With two office locations in Weaverville and Hayfork, we&apos;re always
                close to the action.
              </p>

              {/* Values */}
              <StaggerContainer className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '📖', title: 'Educate' },
                  { icon: '🛡️', title: 'Negotiate' },
                  { icon: '💬', title: 'Communicate' },
                ].map((v) => (
                  <motion.div
                    key={v.title}
                    variants={staggerItem}
                    className="text-center p-4 bg-white rounded value-card cursor-default"
                  >
                    <span className="text-2xl mb-2 block">{v.icon}</span>
                    <p className="font-heading text-sm text-charcoal-ink">{v.title}</p>
                  </motion.div>
                ))}
              </StaggerContainer>

              <Link href="/about" className="btn-outline">
                Learn More About Us
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MEET THE TEAM — Full team grid
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-14">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Your Local Experts
            </p>
            <h2 className="section-heading">Meet Our Team</h2>
            <p className="section-subheading mx-auto">
              Our experienced agents live and work in the communities they serve, bringing unmatched
              local knowledge to every transaction.
            </p>
          </MotionWrapper>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allAgents.map((agent) => (
              <motion.div key={agent.id} variants={staggerItem}>
                <Link href={`/agents/${agent.slug}`} className="group block team-card bg-white rounded-lg overflow-hidden border border-gray-100 shadow-brand-sm">
                  {/* Photo placeholder with gradient */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-canvas-sand via-river-stone/20 to-forest-green/10 flex items-center justify-center relative overflow-hidden team-photo">
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 group-hover:bg-forest-green/10 transition-colors duration-400">
                        <span className="text-forest-green font-heading text-2xl">
                          {agent.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #10401c 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }} />
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading text-lg text-charcoal-ink group-hover:text-forest-green transition-colors duration-300">
                      {agent.name}
                    </h3>
                    <p className="text-forest-green text-sm font-medium mt-1">{agent.title}</p>
                    <p className="text-alpine-slate text-xs mt-1">{agent.licenseNumber}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {agent.counties.map((county) => (
                        <span
                          key={county}
                          className="px-2.5 py-0.5 bg-canvas-sand text-cabin-timber text-xs rounded"
                        >
                          {county} County
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-sm text-alpine-slate">{agent.phone}</p>
                      <span className="text-forest-green text-xs font-medium uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                        Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>

          <MotionWrapper className="text-center mt-12" delay={0.2}>
            <Link href="/agents" className="btn-outline">
              View Full Team
            </Link>
          </MotionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Parallax background
      ═══════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <ParallaxImage
          src="/images/areas/mt-shasta-2.jpg"
          alt="Road to Mt. Shasta"
          className="absolute inset-0"
          speed={0.2}
          overlay="bg-forest-green/80"
        />
        <div className="container-narrow relative z-10 text-center">
          <MotionWrapper variant="scale">
            <h2 className="font-heading text-h1 text-white mb-4">Ready to Find Your Place?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Whether you&apos;re looking for a creekside cabin, a sprawling ranch, or your family&apos;s
              forever home — we&apos;re here to help you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary bg-white text-forest-green hover:bg-gray-100 btn-glow"
              >
                Contact Us Today
              </Link>
              <Link
                href="/properties"
                className="btn-outline border-white text-white hover:bg-white hover:text-forest-green"
              >
                Browse Properties
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OFFICE LOCATIONS — Visual cards
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Visit Us
            </p>
            <h2 className="section-heading">Our Offices</h2>
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Weaverville Office',
                address: '1313 S Main St, Suite A',
                city: 'Weaverville, CA 96093',
                phone: '(530) 623-5690',
              },
              {
                name: 'Hayfork Office',
                address: '7050 State Hwy 3',
                city: 'Hayfork, CA 96041',
                phone: '(530) 628-5850',
              },
            ].map((office, i) => (
              <MotionWrapper key={office.name} variant={i === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
                <div className="p-8 bg-canvas-sand rounded-lg border border-river-stone/20 hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-h4 text-charcoal-ink mb-2">{office.name}</h3>
                  <p className="text-cabin-timber text-sm">{office.address}</p>
                  <p className="text-cabin-timber text-sm mb-3">{office.city}</p>
                  <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-forest-green font-medium text-sm hover:text-deep-pine transition-colors">
                    {office.phone}
                  </a>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS — Enhanced cards
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-canvas-sand">
        <div className="container-narrow">
          <MotionWrapper className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Client Stories
            </p>
            <h2 className="section-heading">What Our Clients Say</h2>
          </MotionWrapper>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  'Retta went above and beyond to help us find the perfect cabin in Trinity County. Her knowledge of the area and dedication to our family was remarkable. We couldn\'t be happier!',
                name: 'Sarah & Tom M.',
                role: 'Homebuyers — Junction City',
              },
              {
                quote:
                  'Selling our ranch was emotional, but Big Valley Properties handled it with such care and professionalism. They got us an incredible price and made the whole process smooth.',
                name: 'Robert D.',
                role: 'Seller — Hayfork',
              },
              {
                quote:
                  'Retta is the ultimate professional! She knows our market inside and out and always puts her clients first. I would recommend Big Valley Properties to anyone.',
                name: 'James & Linda K.',
                role: 'Homebuyers — Weaverville',
              },
              {
                quote:
                  'Shannon was a top-selling agent with expert follow-through and attention to detail. She made the process of buying our first home so much easier than we expected.',
                name: 'Mike & Ashley R.',
                role: 'First-Time Buyers — Lewiston',
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 bg-white rounded-lg testimonial-card border border-gray-100"
              >
                <svg className="w-8 h-8 text-forest-green/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="font-accent italic text-charcoal-ink leading-relaxed text-lg mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-charcoal-ink">{t.name}</p>
                  <p className="text-alpine-slate text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
