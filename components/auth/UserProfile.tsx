'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { User as UserIcon, Settings, LogOut, Package, Heart, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  user: User;
  onSignOut?: () => void;
}

export default function UserProfile({ user, onSignOut }: UserProfileProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    if (onSignOut) {
      onSignOut();
    } else {
      router.refresh();
    }
    setIsOpen(false);
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return user.email?.[0]?.toUpperCase() || 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-profile-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative user-profile-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          {getInitials(user.user_metadata?.full_name)}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {getUserName()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {getInitials(user.user_metadata?.full_name)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{getUserName()}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <UserIcon className="w-4 h-4" />
              Dashboard
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Package className="w-4 h-4" />
              Order History
            </a>
            <a
              href="/dashboard/wishlist"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </a>
            <a
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              Profile Settings
            </a>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}