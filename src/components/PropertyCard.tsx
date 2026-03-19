import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/data/properties'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="property-card bg-white rounded overflow-hidden shadow-brand-sm border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-brand-wider ${
              property.status === 'Active' ? 'bg-forest-green text-white' :
              property.status === 'Pending' ? 'bg-yellow-500 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {property.status}
            </span>
          </div>
          {/* Price Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
            <p className="text-white font-heading text-2xl">{formatPrice(property.price)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-lg text-charcoal-ink mb-1 group-hover:text-forest-green transition-colors">
            {property.title}
          </h3>
          <p className="text-alpine-slate text-sm mb-3">
            {property.city}, {property.county} County
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-cabin-timber border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span>{property.beds} bd</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              <span>{property.baths} ba</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
              <span>{property.acreage} ac</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
