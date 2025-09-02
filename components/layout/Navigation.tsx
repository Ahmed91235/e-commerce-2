'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', href: '/categories/electronics' },
  { id: 2, name: 'Fashion', slug: 'fashion', href: '/categories/fashion' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden', href: '/categories/home-garden' },
  { id: 4, name: 'Sports', slug: 'sports', href: '/categories/sports' },
  { id: 5, name: 'Beauty', slug: 'beauty', href: '/categories/beauty' },
  { id: 6, name: 'Books', slug: 'books', href: '/categories/books' },
];

export default function Navigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-sm font-medium text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md transition-colors duration-200 font-semibold"
            >
              All Products
            </Link>
            
            <Link 
              href="/deals" 
              className="text-sm font-medium text-red-600 hover:text-red-500 px-3 py-2 rounded-md transition-colors duration-200"
            >
              🔥 Hot Deals
            </Link>
            
            {categories.map((category) => (
              <div key={category.id} className="relative">
                <Link
                  href={category.href}
                  onMouseEnter={() => setActiveCategory(category.slug)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white"
                >
                  {category.name}
                </Link>
                
                {/* Dropdown placeholder - we'll implement this later with actual subcategories */}
                {activeCategory === category.slug && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <p className="text-sm text-gray-500">
                        {category.name} subcategories coming soon...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link 
              href="/new" 
              className="text-sm font-medium text-green-600 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200"
            >
              ✨ New Arrivals
            </Link>
            
            <Link 
              href="/sale" 
              className="text-sm font-medium text-purple-600 hover:text-purple-500 px-3 py-2 rounded-md transition-colors duration-200"
            >
              💜 Sale
            </Link>
          </div>

          {/* Mobile horizontal scroll categories */}
          <div className="flex lg:hidden overflow-x-auto scrollbar-hide space-x-4 py-2">
            <Link 
              href="/products" 
              className="flex-shrink-0 text-xs font-bold text-blue-700 hover:text-blue-800 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 whitespace-nowrap"
            >
              All Products
            </Link>
            
            <Link 
              href="/deals" 
              className="flex-shrink-0 text-xs font-medium text-red-600 hover:text-red-500 px-3 py-1 rounded-full bg-red-50 border border-red-200 whitespace-nowrap"
            >
              🔥 Deals
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex-shrink-0 text-xs font-medium text-gray-600 hover:text-gray-800 px-3 py-1 rounded-full bg-white border border-gray-200 whitespace-nowrap hover:bg-gray-50 transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
            
            <Link 
              href="/new" 
              className="flex-shrink-0 text-xs font-medium text-green-600 hover:text-green-500 px-3 py-1 rounded-full bg-green-50 border border-green-200 whitespace-nowrap"
            >
              ✨ New
            </Link>
            
            <Link 
              href="/sale" 
              className="flex-shrink-0 text-xs font-medium text-purple-600 hover:text-purple-500 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 whitespace-nowrap"
            >
              💜 Sale
            </Link>
          </div>

          {/* Additional navigation items */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/support" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Help
            </Link>
            <Link 
              href="/track-order" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}