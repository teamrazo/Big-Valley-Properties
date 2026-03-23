'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [saving, setSaving] = useState(false)

  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-6">My Profile</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 max-w-2xl">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSaving(true); setTimeout(() => setSaving(false), 1000) }}>
          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-2xl">
                👤
              </div>
              <button type="button" className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[44px]">
                Upload Photo
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Phone</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
              placeholder="(530) 555-0000"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Bio</label>
            <textarea
              id="bio"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition resize-y"
              placeholder="Tell clients about yourself..."
            />
          </div>

          {/* Specialties */}
          <div>
            <label htmlFor="specialties" className="block text-sm font-medium text-charcoal-ink dark:text-gray-300 mb-1">Specialties</label>
            <input
              id="specialties"
              type="text"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal-ink dark:text-white focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition min-h-[48px]"
              placeholder="Residential, Ranch, Land (comma separated)"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-50 min-h-[48px]"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
