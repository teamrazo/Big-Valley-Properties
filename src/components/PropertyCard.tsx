import Link from 'next/link'
import Image from 'next/image'
import type { Property } from '@/data/properties'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block property-card">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 shadow-brand-sm dark:shadow-none hover:shadow-brand-lg dark:hover:border-gray-700">
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
              property.status === 'Active' ? 'bg-forest-green text-white' :
              property.status === 'Pending' ? 'bg-yellow-500 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {property.status}
            </span>
          </div>
          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <p className="font-heading text-xl text-white drop-shadow-lg">{formatPrice(property.price)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-base text-charcoal-ink dark:text-white group-hover:text-forest-green dark:group-hover:text-river-stone transition-colors duration-200 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-alpine-slate dark:text-gray-500 text-sm mt-1">
            {property.city}, {property.county} County
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-cabin-timber dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-forest-green dark:text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              {property.beds} bd
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-forest-green dark:text-river-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              {property.baths} ba
            </span>
            <span className="flex items-center gap-1">
              {property.sqft.toLocaleString()} sqft
            </span>
            <span className="flex items-center gap-1">
              {property.acreage} ac
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
