'use client'

import { Suspense } from 'react'
import PropertiesContent from './PropertiesContent'

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-forest-green font-body">Loading properties…</div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  )
}
