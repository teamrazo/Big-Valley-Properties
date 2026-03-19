'use client'

import { useState, useEffect, useRef } from 'react'

export default function HeroVideo() {
  const [isMobile, setIsMobile] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only show video on screens >= 768px (tablet+)
    const mq = window.matchMedia('(min-width: 768px)')
    setIsMobile(!mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    // Lazy-load: wait until idle or after 2s to start loading the video
    if (isMobile || isLoaded) return

    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = '/videos/hero.mp4'
        videoRef.current.load()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isMobile, isLoaded])

  if (isMobile) return null

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      onLoadedData={() => setIsLoaded(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  )
}
