'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/utils/supabase/client'
import { User, Mail, Phone, Camera, Save } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ProfileFormData {
  fullName: string
  email: string
  phone: string
  // avatar_url: string
}

export const UserProfileForm: React.FC = () => {
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    phone: '',
    // avatar_url: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        // avatar_url: user.user_metadata?.avatar_url || ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setMessage(null)
    
    const supabase = createClient()

    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        }
      })

      if (updateError) {
        throw updateError
      }

      // Update or insert profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })

      if (profileError) {
        throw profileError
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: unknown) {
      console.error('Error updating profile:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile. Please try again.'
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account information and preferences
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-8">
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
                  <p className="text-xs text-gray-500">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </button>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                        placeholder="Enter your email"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed from this form
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Created</p>
                      <p className="text-sm text-gray-600">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Sign In</p>
                      <p className="text-sm text-gray-600">
                        {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account ID</p>
                      <p className="text-sm text-gray-600 font-mono">{user.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Verified</p>
                      <p className="text-sm text-gray-600">
                        {user.email_confirmed_at ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between">
              <div>
                {message && (
                  <div className={`text-sm ${
                    message.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message.text}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    // Reset form to original values
                    if (user) {
                      setFormData({
                        fullName: user.user_metadata?.full_name || '',
                        email: user.email || '',
                        phone: user.user_metadata?.phone || '',
                      })
                    }
                    setMessage(null)
                  }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
              <p className="text-sm text-gray-500">Manage your password and security settings</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Password</h4>
                  <p className="text-sm text-gray-500">Last updated: Never</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}