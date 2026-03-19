'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FavoriteButton({ propertyId }: { propertyId: string }) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <motion.button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFavorited(!isFavorited) }}
      whileTap={{ scale: 0.8 }}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
        isFavorited
          ? 'bg-red-500 text-white shadow-md'
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-red-500 shadow-sm backdrop-blur-sm'
      }`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-4.5 h-4.5"
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </motion.button>
  )
}
