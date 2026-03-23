import { Suspense } from 'react'
import SignInForm from './SignInForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Big Valley Properties',
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-forest-green font-body">Loading...</div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  )
}
