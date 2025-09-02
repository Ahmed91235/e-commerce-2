'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, Search } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import type { WishlistItem } from '@/types/dashboard'

// Mock wishlist data
const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'iPhone 15 Pro Max',
    productImage: '/images/iphone-15-pro-max.jpg',
    productSlug: 'iphone-15-pro-max',
    price: 1199.99,
    compareAtPrice: 1299.99,
    inStock: true,
    isOnSale: true,
    variant: { color: 'Natural Titanium' },
    added_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Samsung Galaxy S24 Ultra',
    productImage: '/images/galaxy-s24-ultra.jpg',
    productSlug: 'samsung-galaxy-s24-ultra',
    price: 1099.99,
    compareAtPrice: 1199.99,
    inStock: true,
    isOnSale: true,
    variant: { color: 'Titanium Black' },
    added_at: '2024-01-12T14:30:00Z'
  },
  {
    id: '3',
    productId: '3',
    productName: 'MacBook Pro 14" M3',
    productImage: '/images/macbook-pro-14.jpg',
    productSlug: 'macbook-pro-14-m3',
    price: 1999.99,
    compareAtPrice: 2199.99,
    inStock: true,
    isOnSale: true,
    variant: { color: 'Space Gray' },
    added_at: '2024-01-10T09:15:00Z'
  },
  {
    id: '4',
    productId: '4',
    productName: 'Nike Air Max 270',
    productImage: '/images/nike-air-max-270.jpg',
    productSlug: 'nike-air-max-270',
    price: 149.99,
    compareAtPrice: 179.99,
    inStock: false,
    isOnSale: true,
    variant: { color: 'White/Black', size: '10' },
    added_at: '2024-01-08T16:45:00Z'
  },
  {
    id: '5',
    productId: '5',
    productName: 'Sony WH-1000XM5 Headphones',
    productImage: '/images/sony-headphones.jpg',
    productSlug: 'sony-wh-1000xm5',
    price: 399.99,
    inStock: true,
    isOnSale: false,
    variant: { color: 'Midnight Black' },
    added_at: '2024-01-05T11:20:00Z'
  },
  {
    id: '6',
    productId: '6',
    productName: 'Apple Watch Series 9',
    productImage: '/images/apple-watch-s9.jpg',
    productSlug: 'apple-watch-series-9',
    price: 329.99,
    inStock: true,
    isOnSale: false,
    variant: { color: 'Midnight', size: '45mm' },
    added_at: '2024-01-03T13:10:00Z'
  }
]

export const WishlistView: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterInStock, setFilterInStock] = useState(false)
  const [filterOnSale, setFilterOnSale] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price_low' | 'price_high'>('newest')
  
  const { addItem } = useCart()

  // Filter and sort items
  const filteredItems = wishlistItems
    .filter(item => {
      if (searchTerm && !item.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (filterInStock && !item.inStock) {
        return false
      }
      if (filterOnSale && !item.isOnSale) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
        case 'oldest':
          return new Date(a.added_at).getTime() - new Date(b.added_at).getTime()
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        default:
          return 0
      }
    })

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.productId,
      name: item.productName,
      price: item.price,
      image: item.productImage,
      quantity: 1,
      variant: item.variant
    })
  }

  const handleAddAllToCart = () => {
    const inStockItems = filteredItems.filter(item => item.inStock)
    inStockItems.forEach(item => handleAddToCart(item))
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as 'newest' | 'oldest' | 'price_low' | 'price_high')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {wishlistItems.length} saved items
          </p>
        </div>
        
        {wishlistItems.length > 0 && filteredItems.filter(item => item.inStock).length > 0 && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      {wishlistItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterInStock}
                  onChange={(e) => setFilterInStock(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterOnSale}
                  onChange={(e) => setFilterOnSale(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">On Sale Only</span>
              </label>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Product Image</span>
                  </div>
                </div>

                {/* Sale Badge */}
                {item.isOnSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                    SALE
                  </div>
                )}

                {/* Stock Badge */}
                {!item.inStock && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              <div className="p-4">
                {/* Product Info */}
                <div className="space-y-2">
                  <Link 
                    href={`/products/${item.productSlug}`}
                    className="block"
                  >
                    <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {item.productName}
                    </h3>
                  </Link>

                  {/* Variant Info */}
                  {item.variant && (
                    <p className="text-sm text-gray-500">
                      {Object.entries(item.variant).map(([key, value]) => 
                        `${key}: ${value}`
                      ).join(', ')}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.compareAtPrice && item.compareAtPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500">
                    Added {new Date(item.added_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      item.inStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>

                  <Link
                    href={`/products/${item.productSlug}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {wishlistItems.length === 0 ? 'Your wishlist is empty' : 'No items match your filters'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {wishlistItems.length === 0 
              ? 'Start adding items to your wishlist to keep track of products you love.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          <div className="mt-6">
            {wishlistItems.length === 0 ? (
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Products
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterInStock(false)
                  setFilterOnSale(false)
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {wishlistItems.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-gray-900">{wishlistItems.length}</p>
              <p className="text-sm text-gray-500">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-green-600">{wishlistItems.filter(i => i.inStock).length}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-600">{wishlistItems.filter(i => i.isOnSale).length}</p>
              <p className="text-sm text-gray-500">On Sale</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-blue-600">
                ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Total Value</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}