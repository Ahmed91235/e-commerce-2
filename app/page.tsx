'use client';

import Link from 'next/link'
import { ArrowRight, Zap, Shirt, Home, Dumbbell} from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { sampleProducts, sampleCategories } from '@/lib/sample-data'

export default function HomePage() {
  // Get featured products (first 4)
  const featuredProducts = sampleProducts.slice(0, 4)
  
  // Get top categories for display
  const topCategories = [
    { ...sampleCategories[0], icon: Zap, color: 'bg-blue-100' },  // Electronics
    { ...sampleCategories[1], icon: Shirt, color: 'bg-pink-100' }, // Fashion
    { ...sampleCategories[2], icon: Home, color: 'bg-green-100' }, // Home & Garden
    { ...sampleCategories[3], icon: Dumbbell, color: 'bg-orange-100' } // Sports
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center lg:text-left lg:max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Perfect Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              From cutting-edge electronics to trendy fashion - find premium products 
              at unbeatable prices with fast, reliable delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/products"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections and find exactly what you&apos;re looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {topCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link 
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group text-center"
                >
                  <div className={`${category.color} rounded-2xl w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                    <IconComponent className="w-10 h-10 lg:w-12 lg:h-12 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">{category.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked bestsellers and trending items that our customers love
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleWishlist={(productId) => {
                  // TODO: Implement wishlist toggle
                  console.log('Toggle wishlist:', productId);
                }}
                showQuickView={true}
                isInWishlist={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Deals Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🔥 Limited Time Offers
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Don&apos;t miss out on our incredible deals - ending soon!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">📱 Electronics</h3>
                <p className="text-orange-100 mb-4">Up to 25% off smartphones & laptops</p>
                <Link href="/products?category=electronics" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Shop Electronics
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">👕 Fashion</h3>
                <p className="text-orange-100 mb-4">New arrivals + free shipping</p>
                <Link href="/products?category=fashion" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Shop Fashion
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">🏠 Home</h3>
                <p className="text-orange-100 mb-4">Transform your space for less</p>
                <Link href="/products?category=home-garden" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Shop Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Be the first to know about exclusive deals, new arrivals, and special promotions
            </p>
            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white bg-white placeholder-gray-500"
                />
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                💌 Join 50,000+ happy subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
