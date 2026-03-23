'use client'

import { useRef } from 'react'
import type { WizardData } from '../page'

interface Props { data: WizardData; update: (d: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step5Photos({ data, update, onNext, onBack }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(f => {
      const ext = f.name.toLowerCase().split('.').pop()
      return ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext || '') && f.size <= 10 * 1024 * 1024
    })
    const newPhotos = [...data.photos, ...validFiles].slice(0, 40)
    const newUrls = newPhotos.map(f => URL.createObjectURL(f))
    update({ photos: newPhotos, photoUrls: newUrls })
  }

  const removePhoto = (index: number) => {
    const photos = [...data.photos]
    const urls = [...data.photoUrls]
    URL.revokeObjectURL(urls[index])
    photos.splice(index, 1)
    urls.splice(index, 1)
    update({ photos, photoUrls: urls })
  }

  const setPrimary = (index: number) => {
    if (index === 0) return
    const photos = [...data.photos]
    const urls = [...data.photoUrls]
    const [p] = photos.splice(index, 1)
    const [u] = urls.splice(index, 1)
    photos.unshift(p)
    urls.unshift(u)
    update({ photos, photoUrls: urls })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white">Photos</h2>
      <p className="text-sm text-cabin-timber dark:text-gray-400">
        Upload up to 40 photos. First photo becomes the hero image. Tap to set as primary.
      </p>

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-forest-green hover:bg-forest-green/5 transition-colors"
      >
        <div className="text-3xl mb-2">📷</div>
        <p className="text-sm font-medium text-charcoal-ink dark:text-gray-300">Click to add photos</p>
        <p className="text-xs text-cabin-timber dark:text-gray-500 mt-1">JPG, PNG, WebP, HEIC — max 10MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          multiple
          capture="environment"
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {/* Photo grid */}
      {data.photoUrls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {data.photoUrls.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-xs bg-forest-green text-white px-2 py-0.5 rounded-full">Hero</span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setPrimary(i)}
                  className="p-2 bg-white rounded-full text-xs min-w-[36px] min-h-[36px]"
                  title="Set as hero"
                >⭐</button>
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="p-2 bg-red-500 text-white rounded-full text-xs min-w-[36px] min-h-[36px]"
                  title="Remove"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-cabin-timber/60 dark:text-gray-600">{data.photos.length}/40 photos</p>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-charcoal-ink dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]">← Back</button>
        <button onClick={onNext} className="px-8 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors min-h-[48px]">Next →</button>
      </div>
    </div>
  )
}
