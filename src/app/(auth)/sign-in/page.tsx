import { Suspense } from 'react'
import SignInForm from './SignInForm'

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-forest-green">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
