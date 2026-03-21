'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Location, LocationAttraction, LocationResource, CommunityResource } from '@/data/locations'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function PhoneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function WebIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ContactLinks({ phone, website, compact = false }: { phone?: string; website?: string; compact?: boolean }) {
  if (!phone && !website) return null
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? 'mt-2' : 'mt-3'}`}>
      {phone && (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="inline-flex items-center gap-1.5 text-sm text-forest-green hover:text-deep-pine transition-colors font-body font-medium"
          title={`Call ${phone}`}
        >
          <PhoneIcon className="w-3.5 h-3.5" />
          {phone}
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-forest-green hover:text-deep-pine transition-colors font-body font-medium"
          title="Visit website"
        >
          <WebIcon className="w-3.5 h-3.5" />
          Website
        </a>
      )}
    </div>
  )
}

function HealthcareIcon({ category }: { category: LocationResource['category'] }) {
  const cls = 'w-5 h-5'
  switch (category) {
    case 'hospital':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    case 'clinic':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    case 'emergency':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    case 'government':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    case 'specialty':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    default:
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  }
}

function CommunityResourceIcon({ category }: { category: CommunityResource['category'] }) {
  const cls = 'w-5 h-5'
  switch (category) {
    case 'library':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    case 'government':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    case 'chamber':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    case 'post_office':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    case 'community_center':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    case 'visitor_center':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    case 'museum':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    case 'fire_department':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
    default:
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  }
}

function IconForType({ type }: { type: LocationAttraction['icon'] }) {
  const cls = 'w-7 h-7'
  switch (type) {
    case 'hiking':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    case 'water':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
    case 'park':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    case 'historic':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    case 'dining':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    case 'shopping':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    case 'nature':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    case 'sports':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    default:
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
  }
}

export default function LocationDetailClient({ location }: { location: Location }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="bg-warm-alabaster">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={location.heroImage}
            alt={location.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end pb-16 container-bvp">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-river-stone font-body text-sm tracking-[0.2em] uppercase mb-3">
              {location.county} County
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
              {location.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-body text-lg md:text-xl mt-4 max-w-2xl">
              {location.tagline}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-8 text-white/70 text-sm font-body">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Pop. {location.population}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                Elev. {location.elevation}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Est. {location.founded}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Quick Nav ── */}
      <div className="sticky top-[var(--nav-height)] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-bvp flex gap-6 overflow-x-auto py-3 scrollbar-hide text-sm font-body">
          {['Overview', 'Schools', 'Community', 'Healthcare', 'Recreation', 'Why Live Here'].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/ /g, '-')}`}
              className="whitespace-nowrap text-gray-500 hover:text-forest-green transition-colors font-medium"
            >
              {s}
            </a>
          ))}
          <Link
            href={`/properties?county=${location.county}`}
            className="whitespace-nowrap ml-auto text-forest-green font-semibold hover:underline"
          >
            View {location.county} County Properties →
          </Link>
        </div>
      </div>

      {/* ── Overview ── */}
      <section id="overview" className="py-20 md:py-28">
        <div className="container-bvp">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp}>
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-4">About {location.name}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink leading-tight mb-6">
                Discover {location.name}
              </h2>
              <p className="text-gray-600 font-body leading-relaxed text-[17px] mb-6">
                {location.overview}
              </p>
              <p className="text-gray-600 font-body leading-relaxed text-[17px]">
                {location.history}
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {location.galleryImages.slice(0, 3).map((img, i) => (
                <div
                  key={img}
                  className={`relative overflow-hidden rounded-lg shadow-luxury ${i === 0 ? 'col-span-2 h-64' : 'h-48'}`}
                >
                  <Image src={img} alt={`${location.name} scenic ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Schools ── */}
      <section id="schools" className="py-20 md:py-28 bg-canvas-sand">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Education</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Schools & Education</h2>
              <p className="text-gray-600 font-body mt-4 max-w-2xl mx-auto leading-relaxed">{location.schoolsOverview}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {location.schools.map((school) => (
                <div key={school.name} className="bg-white rounded-lg p-6 shadow-luxury-sm hover:shadow-luxury transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                  </div>
                  <h4 className="font-heading text-lg text-charcoal-ink mb-1">{school.name}</h4>
                  <p className="text-sm text-gray-500 font-body mb-2">{school.grades} · {school.type}</p>
                  {school.highlight && <p className="text-sm text-forest-green font-body font-medium">{school.highlight}</p>}
                  <ContactLinks phone={school.phone} website={school.website} compact />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Community Resources ── */}
      <section id="community" className="py-20 md:py-28">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Community</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Community Resources</h2>
              <p className="text-gray-600 font-body mt-4 max-w-2xl mx-auto leading-relaxed">{location.communityResourcesOverview}</p>
            </motion.div>

            {/* Community Resources Grid */}
            {location.communityResources && location.communityResources.length > 0 && (
              <motion.div variants={fadeUp} className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5 mb-16">
                {location.communityResources.map((item) => (
                  <div key={item.name} className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-luxury-sm hover:shadow-luxury transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 text-forest-green">
                      <CommunityResourceIcon category={item.category} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-charcoal-ink font-heading text-[15px] font-semibold leading-snug">{item.name}</h4>
                      <p className="text-gray-500 font-body text-sm leading-relaxed mt-1">{item.description}</p>
                      <ContactLinks phone={item.phone} website={item.website} compact />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Family & Community Life */}
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h3 className="font-heading text-2xl text-charcoal-ink">Family & Community Life</h3>
              <p className="text-gray-600 font-body mt-3 max-w-2xl mx-auto leading-relaxed">{location.lifestyle}</p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div variants={fadeUp}>
                <h3 className="font-heading text-xl text-charcoal-ink mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </span>
                  Family-Friendly Features
                </h3>
                <ul className="space-y-3">
                  {location.familyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-600 font-body text-[15px]">
                      <svg className="w-5 h-5 text-forest-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h3 className="font-heading text-xl text-charcoal-ink mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </span>
                  Community Highlights
                </h3>
                <ul className="space-y-3">
                  {location.communityHighlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-gray-600 font-body text-[15px]">
                      <svg className="w-5 h-5 text-forest-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-5 bg-canvas-sand rounded-lg">
                  <h4 className="font-heading text-sm uppercase tracking-[0.15em] text-forest-green mb-2">Climate</h4>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">{location.climate}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Healthcare ── */}
      <section id="healthcare" className="py-20 md:py-28 bg-canvas-sand">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Healthcare</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Healthcare & Amenities</h2>
              <p className="text-gray-600 font-body mt-4 max-w-2xl mx-auto leading-relaxed">{location.healthcareOverview}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
              {location.healthcare.map((item) => (
                <div key={item.name} className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-luxury-sm hover:shadow-luxury transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-full bg-deep-pine/10 flex items-center justify-center shrink-0 text-deep-pine">
                    <HealthcareIcon category={item.category} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-charcoal-ink font-heading text-[15px] font-semibold leading-snug">{item.name}</h4>
                    <p className="text-gray-500 font-body text-sm leading-relaxed mt-1">{item.description}</p>
                    <ContactLinks phone={item.phone} website={item.website} compact />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Recreation ── */}
      <section id="recreation" className="py-20 md:py-28">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Things To Do</p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal-ink">Recreation & Attractions</h2>
              <p className="text-gray-600 font-body mt-4 max-w-2xl mx-auto leading-relaxed">{location.recreationOverview}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.recreation.map((item) => (
                <div key={item.name} className="group bg-white rounded-lg p-6 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mb-4 text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors duration-300">
                    <IconForType type={item.icon} />
                  </div>
                  <h4 className="font-heading text-lg text-charcoal-ink mb-2">{item.name}</h4>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">{item.description}</p>
                  <ContactLinks phone={item.phone} website={item.website} compact />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Live Here ── */}
      <section id="why-live-here" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={location.galleryImages[0] || location.heroImage}
            alt={`Living in ${location.name}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-green/85" />
        </div>
        <div className="relative z-10 container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-river-stone font-body text-sm tracking-[0.2em] uppercase mb-3">Your Future Home</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white">Why Live in {location.name}?</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {location.whyLiveHere.map((reason, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white font-heading text-sm">
                    {i + 1}
                  </span>
                  <p className="text-white/90 font-body text-[15px] leading-relaxed">{reason}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Nearby Attractions ── */}
      <section className="py-16 bg-canvas-sand">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <p className="text-forest-green font-body text-sm tracking-[0.2em] uppercase mb-3">Explore the Region</p>
            <h2 className="font-heading text-2xl md:text-3xl text-charcoal-ink mb-8">Nearby Attractions</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {location.nearbyAttractions.map((a) => (
                <span key={a} className="px-5 py-2.5 bg-white rounded-full text-sm font-body text-charcoal-ink shadow-luxury-sm hover:shadow-luxury transition-shadow">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-charcoal-ink text-center">
        <div className="container-bvp">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-white mb-4">
              Ready to Call {location.name} Home?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 font-body max-w-xl mx-auto mb-8 leading-relaxed">
              Browse available properties in {location.county} County or contact our local team to start your journey.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/properties?county=${location.county}`} className="btn-primary px-8 py-3.5 text-sm tracking-[0.15em] uppercase">
                View {location.county} County Properties
              </Link>
              <Link href="/contact" className="px-8 py-3.5 border border-white/30 text-white rounded-sm font-body text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Other Locations ── */}
      <section className="py-16">
        <div className="container-bvp text-center">
          <p className="text-gray-500 font-body text-sm mb-4">Explore more communities</p>
          <Link href="/locations" className="text-forest-green font-body font-semibold hover:underline">
            View All Service Areas →
          </Link>
        </div>
      </section>
    </main>
  )
}
