'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { Star, Plus, Minus, Heart, Shield, Truck, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductInfoProps {
  product: Product;
  selectedVariants: Record<string, string>;
  onVariantChange: (variantType: string, variantValue: string) => void;
}

export default function ProductInfo({ product, selectedVariants, onVariantChange }: ProductInfoProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Calculate discounted percentage
  const discountPercentage = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const incrementQuantity = () => {
    if (quantity < product.inventory_count) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      
      // Find the first selected variant (for now, we'll handle multiple variants later)
      let selectedVariant: ProductVariant | undefined;
      const firstSelectedType = Object.keys(selectedVariants)[0];
      if (firstSelectedType && selectedVariants[firstSelectedType]) {
        // Find the matching variant from the product's variants
        selectedVariant = product.variants.find(v => 
          v.type === firstSelectedType && v.value === selectedVariants[firstSelectedType]
        );
      }

      // Add item to cart through context
      addItem(product, selectedVariant, quantity);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAddingToCart(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically make an API call to update wishlist
  };

  // Group variants by type
  const variantTypes = Array.from(new Set(product.variants.map(v => v.type)));

  return (
    <div className="space-y-6">
      {/* Product Title and Tags */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`
                px-2 py-1 text-xs font-semibold rounded-full
                ${tag === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                ${tag === 'bestseller' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${tag === 'premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : ''}
                ${tag === 'sale' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                ${!['new', 'bestseller', 'premium', 'sale'].includes(tag) ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' : ''}
              `}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Rating and Reviews */}
      {product.rating && (
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating.toFixed(1)} ({product.review_count} reviews)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.compare_price && (
            <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
              ${product.compare_price.toFixed(2)}
            </span>
          )}
        </div>
        {discountPercentage > 0 && (
          <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Variants */}
      {variantTypes.map((type) => {
        const variants = product.variants.filter(v => v.type === type);
        return (
          <div key={type} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {type}:
            </label>
            {type === 'color' ? (
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => onVariantChange(type, variant.value)}
                    className={`
                      w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${selectedVariants[type] === variant.value
                        ? 'border-gray-900 dark:border-white shadow-lg scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }
                    `}
                    style={{
                      backgroundColor: variant.value === 'black' ? '#000000' :
                                     variant.value === 'white' ? '#ffffff' :
                                     variant.value === 'blue' ? '#3b82f6' :
                                     variant.value === 'red' ? '#ef4444' :
                                     variant.value === 'green' ? '#10b981' :
                                     variant.value === 'silver' ? '#94a3b8' :
                                     variant.value === 'grey' ? '#6b7280' :
                                     variant.value === 'beige' ? '#d2b48c' :
                                     variant.value
                    }}
                    title={variant.value}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => onVariantChange(type, variant.value)}
                    className={`
                      px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedVariants[type] === variant.value
                        ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
                      }
                    `}
                  >
                    {variant.value}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantity:
        </label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-center font-medium min-w-[60px]">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.inventory_count}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.inventory_count} available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.inventory_count === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isAddingToCart ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
            <span>
              {product.inventory_count === 0 ? 'Out of Stock' : 
               isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </span>
          </button>
          <button
            onClick={toggleWishlist}
            className={`
              px-4 py-3 border rounded-lg transition-all duration-200
              ${isWishlisted
                ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500'
              }
            `}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Features */}
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="w-5 h-5" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <Truck className="w-5 h-5" />
          <span>Free shipping over $50</span>
        </div>
      </div>
    </div>
  );
}