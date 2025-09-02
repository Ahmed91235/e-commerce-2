'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { openCart, summary } = useCart();

  return (
    <button
      onClick={openCart}
      className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      aria-label={`Open cart with ${summary.itemCount} items`}
    >
      <ShoppingBag className="w-6 h-6" />
      
      {/* Cart Badge */}
      {summary.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce">
          {summary.itemCount > 99 ? '99+' : summary.itemCount}
        </span>
      )}
    </button>
  );
}