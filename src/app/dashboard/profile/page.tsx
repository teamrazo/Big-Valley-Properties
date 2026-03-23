'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    specialties: '',
    licenseNumber: '',
  })

  const updateForm = (updates: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...updates }))

  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-8">Agent Profile</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800 max-w-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input value={form.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input value={form.lastName} onChange={(e) => updateForm({ lastName: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">License Number</label>
            <input value={form.licenseNumber} onChange={(e) => updateForm({ licenseNumber: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea value={form.bio} onChange={(e) => updateForm({ bio: e.target.value })} rows={4} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Specialties (comma-separated)</label>
            <input value={form.specialties} onChange={(e) => updateForm({ specialties: e.target.value })} className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Residential, Land, Ranch" />
          </div>

          {/* Photo upload placeholder */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">👤</div>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Upload Photo</button>
            </div>
          </div>

          <button className="w-full py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-forest-green/90 transition-colors">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}
