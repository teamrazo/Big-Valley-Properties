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

const googleReviews = [
  {
    name: 'Sarah & Tom M.',
    rating: 5,
    text: 'Retta went above and beyond to help us find the perfect cabin in Trinity County. Her knowledge of the area and dedication to our family was remarkable. We couldn\'t be happier with our new mountain home!',
    location: 'Junction City',
    date: 'February 2026',
  },
  {
    name: 'Robert D.',
    rating: 5,
    text: 'Selling our ranch was emotional, but Big Valley Properties handled it with such care and professionalism. They got us an incredible price and made the whole process smooth.',
    location: 'Hayfork',
    date: 'January 2026',
  },
  {
    name: 'James & Linda K.',
    rating: 5,
    text: 'Retta is the ultimate professional! She is very knowledgeable about the local market and always puts her clients first. I would recommend Big Valley Properties to anyone looking to buy or sell.',
    location: 'Weaverville',
    date: 'December 2025',
  },
  {
    name: 'Mike & Ashley R.',
    rating: 5,
    text: 'Shannon was a top-selling agent with expert follow-through and attention to detail. She made the process of buying our first home so much easier than we expected. Highly recommend!',
    location: 'Lewiston',
    date: 'November 2025',
  },
  {
    name: 'Patricia H.',
    rating: 5,
    text: 'Big Valley Properties is without a doubt the best real estate company in Trinity County. Their local expertise is unmatched, and they truly care about finding you the right property.',
    location: 'Weaverville',
    date: 'October 2025',
  },
  {
    name: 'David & Karen L.',
    rating: 5,
    text: 'Professional guidance from start to finish. The team at Big Valley Properties made our relocation to Northern California seamless. They know every corner of this beautiful county.',
    location: 'Hayfork',
    date: 'September 2025',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
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
          1. HERO — Spotlight Retta Treanor as Broker/Owner
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <ParallaxImage
          src="/images/areas/trinity-alps-2.jpg"
          alt="Trinity Alps wilderness"
          className="absolute inset-0"
          speed={0.25}
          overlay="bg-gradient-to-r from-black/80 via-black/50 to-black/20"
          priority
        />

        <div className="container-bvp relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                className="text-white/80 text-lg leading-relaxed mb-4 max-w-lg"
              >
                Led by <strong className="text-white">Retta Treanor, Broker/Owner &amp; CRS</strong>, Big Valley Properties specializes in mountain cabins, ranch land, and unique homes across Trinity and Shasta Counties.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="font-accent italic text-white/60 text-base mb-8"
              >
                &ldquo;Educate. Negotiate. Communicate.&rdquo;
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

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-8 mt-10 pt-8 border-t border-white/10"
              >
                {[
                  { value: '#1', label: 'Brokerage in Trinity County' },
                  { value: '2', label: 'Counties Served' },
                  { value: '20+', label: 'Years of Excellence' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-2xl text-white">{stat.value}</p>
                    <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
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
          2. BROKERAGE — About Big Valley Properties
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-cream overflow-hidden">
        <div className="container-bvp">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image mosaic */}
            <MotionWrapper variant="fadeLeft">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7 img-zoom rounded overflow-hidden shadow-luxury">
                  <div className="aspect-[4/3] relative">
                    <Image src="/images/properties/river-deck.jpg" alt="River view from deck" fill className="object-cover" sizes="350px" />
                  </div>
                </div>
                <div className="col-span-5 img-zoom rounded overflow-hidden shadow-luxury">
                  <div className="aspect-[3/4] relative">
                    <Image src="/images/properties/hyampom-road.jpg" alt="Mountain cabin" fill className="object-cover" sizes="250px" />
                  </div>
                </div>
                <div className="col-span-5 img-zoom rounded overflow-hidden shadow-luxury">
                  <div className="aspect-[3/4] relative">
                    <Image src="/images/properties/riverside-cabin-2.jpg" alt="Riverside cabin" fill className="object-cover" sizes="250px" />
                  </div>
                </div>
                <div className="col-span-7 img-zoom rounded overflow-hidden shadow-luxury">
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
                family&apos;s forever home, we&apos;re committed to making your real estate dreams a reality.
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
                    className="text-center p-4 bg-white rounded shadow-sm value-card cursor-default"
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
          3. FEATURED NEIGHBORHOODS — Trinity & Shasta Counties
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-luxury-light">
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
          FEATURED PROPERTIES
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-cream">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-12">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Handpicked For You
            </p>
            <h2 className="section-heading">Featured Properties</h2>
            <p className="section-subheading mx-auto">
              Discover our curated selection of the finest homes, cabins, and ranches in Northern California.
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
          4. TEAM SECTION — All agents with photos & bios
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-luxury-light">
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
                <Link href={`/agents/${agent.slug}`} className="group block team-card bg-white rounded-lg overflow-hidden border border-gray-100 shadow-luxury-sm">
                  {/* Agent Photo */}
                  <div className="aspect-[4/3] relative overflow-hidden team-photo">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          GOOGLE REVIEWS — Trust & Credibility
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-cream">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-14">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Client Stories
            </p>
            <h2 className="section-heading">Reviews &amp; Testimonials</h2>
            {/* Aggregate rating */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-heading text-xl text-charcoal-ink">4.9</span>
              <span className="text-alpine-slate text-sm">out of 5 stars from 50+ reviews</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <svg className="w-4 h-4 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-alpine-slate text-xs">Google Reviews</span>
              <span className="text-alpine-slate text-xs mx-1">•</span>
              <span className="text-alpine-slate text-xs">100% Customer Satisfaction</span>
            </div>
          </MotionWrapper>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review) => (
              <motion.div
                key={review.name}
                variants={staggerItem}
                className="p-6 bg-white rounded-lg testimonial-card border border-gray-100 shadow-luxury-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-alpine-slate">{review.date}</span>
                </div>
                <p className="font-accent italic text-charcoal-ink leading-relaxed mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <span className="text-forest-green font-heading text-sm">
                      {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal-ink text-sm">{review.name}</p>
                    <p className="text-alpine-slate text-xs">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
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
          5. OFFICES — Google Maps Integration
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-luxury-light">
        <div className="container-bvp">
          <MotionWrapper className="text-center mb-14">
            <p className="text-forest-green font-body text-sm uppercase tracking-brand-widest mb-3">
              Visit Us
            </p>
            <h2 className="section-heading">Our Offices</h2>
            <p className="section-subheading mx-auto">
              Two convenient locations serving Trinity and Shasta Counties.
            </p>
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hayfork Office */}
            <MotionWrapper variant="fadeLeft" delay={0.1}>
              <div className="bg-white rounded-lg overflow-hidden shadow-luxury border border-gray-100">
                <div className="aspect-[16/10] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97006.41932254695!2d-123.33634560273438!3d40.55372550000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d3a7e6133e71a9%3A0xc806b77e1aceb1e9!2sBig%20Valley%20Properties!5e0!3m2!1sen!2sus!4v1773953565688!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Big Valley Properties Hayfork Office Map"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-h4 text-charcoal-ink mb-1">Hayfork Office</h3>
                      <p className="text-cabin-timber text-sm">7050 State Hwy 3, PO Box 970</p>
                      <p className="text-cabin-timber text-sm mb-2">Hayfork, CA 96041</p>
                      <a href="tel:5306285850" className="text-forest-green font-medium text-sm hover:text-deep-pine transition-colors inline-flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        (530) 628-5850
                      </a>
                      <p className="text-alpine-slate text-xs mt-2">Mon–Sat: 8am – 5pm • Sun: 8am – 5pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Weaverville Office */}
            <MotionWrapper variant="fadeRight" delay={0.2}>
              <div className="bg-white rounded-lg overflow-hidden shadow-luxury border border-gray-100">
                <div className="aspect-[16/10] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3665603640748!2d-122.92990692356076!3d40.721621037025905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d25218948fb5a5%3A0x252645bd3bea600a!2sBig%20Valley%20Properties!5e1!3m2!1sen!2sus!4v1773953605690!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Big Valley Properties Weaverville Office Map"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-h4 text-charcoal-ink mb-1">Weaverville Office</h3>
                      <p className="text-cabin-timber text-sm">1313 S Main St, Suite A, PO Box 1263</p>
                      <p className="text-cabin-timber text-sm mb-2">Weaverville, CA 96093</p>
                      <a href="tel:5306235690" className="text-forest-green font-medium text-sm hover:text-deep-pine transition-colors inline-flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        (530) 623-5690
                      </a>
                      <p className="text-alpine-slate text-xs mt-2">Mon–Fri: 10am – 5pm • Weekends by Appt</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>
    </>
  )
}
