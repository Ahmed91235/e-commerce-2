'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye, 
  Zap
} from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

// Convert product name to slug format
function toSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple consecutive hyphens
}

interface ProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: number) => void;
  showQuickView?: boolean;
  isInWishlist?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  onToggleWishlist,
  showQuickView = true,
  isInWishlist = false,
  className = ''
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  
  const { addItem } = useCart();

  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    try {
      addItem(product, selectedVariant, 1);
      // Add a visual feedback delay
      setTimeout(() => setIsAddingToCart(false), 600);
    } catch (error) {
      setIsAddingToCart(false);
      console.error('Error adding to cart:', error);
    }
  }, [product, selectedVariant, addItem]);

  const handleToggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  }, [product.id, onToggleWishlist]);

  const finalPrice = selectedVariant?.price_adjustment 
    ? product.price + selectedVariant.price_adjustment 
    : product.price;

  const hasDiscount = product.compare_price && product.compare_price > finalPrice;
  const discountPercentage = hasDiscount && product.compare_price
    ? Math.round(((product.compare_price - finalPrice) / product.compare_price) * 100)
    : null;

  const isOutOfStock = product.inventory_count === 0;
  const isLowStock = product.inventory_count > 0 && product.inventory_count <= 5;

  // Use primary image, fallback to placeholder
  const primaryImage = product.images?.[0] || '/placeholder-product.jpg';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div 
      className={`group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Link Wrapper */}
      <Link href={`/products/${toSlug(product.name)}`} className="block">
        
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered && secondaryImage !== primaryImage ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Secondary Image (hover) */}
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
                Low Stock
              </span>
            )}
            {product.tags?.includes('new') && (
              <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
            {product.tags?.includes('bestseller') && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Best Seller
              </span>
            )}
          </div>

          {/* Action Buttons - Show on Hover */}
          <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            {onToggleWishlist && (
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-600 hover:text-red-500'
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isInWishlist ? 'scale-110 fill-current' : ''
                  }`} 
                />
              </button>
            )}
            
            {showQuickView && (
              <button
                className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-blue-600 transition-colors duration-300"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Add to Cart - Bottom Hover Action */}
          <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
            isHovered && !isOutOfStock ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAddingToCart}
              className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                isAddingToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Added!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Quick Add
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.review_count || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.compare_price!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Variants Preview */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Available in:</span>
              <div className="flex gap-1">
                {product.variants.slice(0, 3).map((variant) => (
                  <div
                    key={variant.id}
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                      variant.type === 'color'
                        ? variant.value === 'red' ? 'bg-red-500 border-red-600'
                        : variant.value === 'blue' ? 'bg-blue-500 border-blue-600'
                        : variant.value === 'green' ? 'bg-green-500 border-green-600'
                        : variant.value === 'black' ? 'bg-black border-gray-800'
                        : variant.value === 'white' ? 'bg-white border-gray-300'
                        : 'bg-gray-400 border-gray-500'
                        : 'bg-gray-200 border-gray-300'
                    } ${selectedVariant?.id === variant.id ? 'scale-110 shadow-md' : ''}`}
                    title={variant.value}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariant(variant);
                    }}
                  />
                ))}
                {product.variants.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.variants.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}