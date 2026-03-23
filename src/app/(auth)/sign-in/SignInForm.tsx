'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [magicSent, setMagicSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}${redirectTo}` },
      })
      if (error) {
        setError(error.message)
      } else {
        setMagicSent(true)
      }
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  if (magicSent) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-2">Check Your Email</h2>
          <p className="text-cabin-timber dark:text-gray-400 text-sm">
            We sent a sign-in link to <strong>{email}</strong>. Click it to access your dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
          <h1 className="font-heading text-h3 text-charcoal-ink dark:text-white mb-2 text-center">
            Agent Sign In
          </h1>
          <p className="text-cabin-timber dark:text-gray-400 text-sm text-center mb-8">
            Access your Big Valley Properties dashboard
          </p>

          {/* Mode toggle */}
          <div className="flex mb-6 bg-canvas-sand dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setMode('password')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'password'
                  ? 'bg-white dark:bg-gray-700 text-charcoal-ink dark:text-white shadow-sm'
                  : 'text-cabin-timber dark:text-gray-400'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setMode('magic')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'magic'
                  ? 'bg-white dark:bg-gray-700 text-charcoal-ink dark:text-white shadow-sm'
                  : 'text-cabin-timber dark:text-gray-400'
              }`}
            >
              Magic Link
            </button>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition"
                placeholder="agent@bvptrinity.com"
              />
            </div>

            {mode === 'password' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]"
            >
              {loading ? 'Signing in...' : mode === 'magic' ? 'Send Magic Link' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-cabin-timber dark:text-gray-500 text-center mt-6">
            Agent accounts are created by the broker.{' '}
            <Link href="/contact" className="text-forest-green hover:text-deep-pine underline">
              Contact us
            </Link>{' '}
            for access.
          </p>
        </div>
      </div>
    </div>
  )
}
