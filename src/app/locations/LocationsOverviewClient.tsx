'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Location } from '@/data/locations'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function LocationCard({ location }: { location: Location }) {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/locations/${location.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-luxury-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={location.heroImage}
            alt={location.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-heading text-xl text-white">{location.name}</h3>
            <p className="text-white/70 font-body text-sm">{location.county} County</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-forest-green font-body text-xs tracking-[0.15em] uppercase font-semibold mb-2">
            {location.tagline}
          </p>
          <p className="text-gray-600 font-body text-sm leading-relaxed line-clamp-3">
            {location.overview.slice(0, 180)}…
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 font-body">
            <span>Pop. {location.population}</span>
            <span>·</span>
            <span>Elev. {location.elevation}</span>
          </div>
          <span className="inline-block mt-4 text-sm font-body font-semibold text-forest-green group-hover:underline">
            Explore {location.name} →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function LocationsOverviewClient({
  trinity,
  shasta,
}: {
  trinity: Location[]
  shasta: Location[]
}) {
  return (
    <main className="bg-warm-alabaster">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image
          src="/images/locations/trinity-alps-lake.jpg"
          alt="Northern California landscapes"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center container-bvp">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-river-stone font-body text-sm tracking-[0.2em] uppercase mb-3">
            Our Communities
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-heading text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Service Areas
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/80 font-body text-lg mt-4 max-w-2xl">
            Explore 8 beautiful Northern California communities across Trinity and Shasta Counties
          </motion.p>
        </div>
      </section>

      {/* Trinity County */}
      <section className="py-20 md:py-28">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-12">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Trinity County</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Mountain Communities</h2>
              <p className="text-gray-600 font-body mt-3 max-w-2xl leading-relaxed">
                Trinity County is one of California&apos;s most beautiful and unspoiled regions. From the historic charm of Weaverville to the riverside serenity of Lewiston, these communities offer an unmatched quality of life.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trinity.map((loc) => (
                <LocationCard key={loc.slug} location={loc} />
              ))}
            </div>
            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link href="/properties?county=Trinity" className="inline-flex items-center gap-2 text-forest-green font-body font-semibold hover:underline">
                View All Trinity County Properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Shasta County */}
      <section className="py-20 md:py-28 bg-canvas-sand">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-12">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Shasta County</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Valley & Lakeside Living</h2>
              <p className="text-gray-600 font-body mt-3 max-w-2xl leading-relaxed">
                Shasta County offers the perfect blend of urban convenience and outdoor adventure. From the vibrant hub of Redding to the lakeside lifestyle of Shasta Lake, find your ideal Northern California home.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shasta.map((loc) => (
                <LocationCard key={loc.slug} location={loc} />
              ))}
            </div>
            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link href="/properties?county=Shasta" className="inline-flex items-center gap-2 text-forest-green font-body font-semibold hover:underline">
                View All Shasta County Properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-ink text-center">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-white mb-4">
              Find Your Perfect Community
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 font-body max-w-xl mx-auto mb-8">
              Our team lives and works in these communities. Let us help you find the perfect home in Northern California.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties" className="btn-primary px-8 py-3.5 text-sm tracking-[0.15em] uppercase">
                Browse All Properties
              </Link>
              <Link href="/contact" className="px-8 py-3.5 border border-white/30 text-white rounded-sm font-body text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-colors">
                Contact Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
