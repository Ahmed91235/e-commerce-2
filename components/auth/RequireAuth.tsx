'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface RequireAuthProps {
  children: React.ReactNode
  redirectTo?: string
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  redirectTo = '/login?redirect=dashboard' 
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo)
    }
  }, [user, loading, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}