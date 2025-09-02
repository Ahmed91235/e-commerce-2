'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, AlertTriangle } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0) return;
    if (newQuantity > item.maxQuantity) return;

    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onUpdateQuantity(item.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.productImage}
          alt={item.productName}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        {/* Product Name & Link */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              href={`/products/${item.productSlug}`}
              className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-sm line-clamp-2"
            >
              {item.productName}
            </Link>
            
            {/* Variants */}
            {item.variant && (
              <div className="mt-1 space-y-1">
                {item.variant.color && (
                  <p className="text-xs text-gray-500">
                    Color: <span className="font-medium capitalize">{item.variant.color}</span>
                  </p>
                )}
                {item.variant.size && (
                  <p className="text-xs text-gray-500">
                    Size: <span className="font-medium uppercase">{item.variant.size}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status */}
        {!item.inStock && (
          <div className="flex items-center space-x-1 mt-1">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          </div>
        )}

        {/* Price and Quantity Controls */}
        <div className="mt-2 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating || !item.inStock}
                className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-3 h-3" />
              </button>
              
              <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                {isUpdating ? '...' : item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.maxQuantity || isUpdating || !item.inStock}
                className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            {item.quantity >= item.maxQuantity && (
              <span className="text-xs text-orange-600">Max {item.maxQuantity}</span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </div>
            {item.originalPrice && item.price < item.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </div>
            )}
            <div className="text-xs text-gray-500">
              ${item.price.toFixed(2)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}