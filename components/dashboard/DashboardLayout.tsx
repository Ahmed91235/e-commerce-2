'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingBag,
    badge: 3
  },
  {
    name: 'Wishlist',
    href: '/dashboard/wishlist',
    icon: Heart,
    badge: 8
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    name: 'Addresses',
    href: '/dashboard/addresses',
    icon: MapPin,
  },
  {
    name: 'Payment Methods',
    href: '/dashboard/payment',
    icon: CreditCard,
  },
  {
    name: 'Reviews',
    href: '/dashboard/reviews',
    icon: Star,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        
        <div className={`fixed inset-y-0 left-0 flex w-full max-w-xs transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="relative flex w-full flex-col bg-white py-4 pb-4 shadow-xl">
            <div className="absolute right-0 top-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex flex-shrink-0 items-center px-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <div className="w-6 h-6 bg-white rounded text-blue-600 flex items-center justify-center font-bold text-sm">
                    E
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">ECommerce</span>
              </Link>
            </div>

            <nav className="mt-8 flex-1 space-y-1 px-6">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-gray-100 text-gray-600">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto px-6">
              <button
                onClick={handleSignOut}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <div className="w-6 h-6 bg-white rounded text-blue-600 flex items-center justify-center font-bold text-sm">
                  E
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">ECommerce</span>
            </Link>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-1">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 ${
                              isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                            }`}
                          />
                          {item.name}
                          {item.badge && (
                            <span className="ml-auto w-6 h-5 text-center bg-gray-100 text-gray-600 rounded-full text-xs leading-5 font-medium">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
              
              <li className="mt-auto">
                <button
                  onClick={handleSignOut}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-700 w-full"
                >
                  <LogOut className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-600" />
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.full_name || user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}