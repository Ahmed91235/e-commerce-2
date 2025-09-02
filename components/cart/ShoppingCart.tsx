'use client';

import React, { useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import Link from 'next/link';

interface ShoppingCartProps {
  className?: string;
}

export default function ShoppingCart({ className = '' }: ShoppingCartProps) {
  const { 
    items, 
    isOpen, 
    summary, 
    isLoading, 
    closeCart, 
    updateQuantity, 
    removeItem 
  } = useCart();

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when cart is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeCart]);

  // Don't render if not open
  if (!isOpen) return null;

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - summary.subtotal);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Cart Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${className}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Cart ({summary.itemCount})</span>
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Empty Cart */}
          {!isLoading && items.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started!</p>
              <button
                onClick={closeCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* Cart Items */}
          {!isLoading && items.length > 0 && (
            <>
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="p-4 bg-blue-50 border-b border-gray-200">
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">
                      Add <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (summary.subtotal / freeShippingThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {summary.shipping === 0 && summary.subtotal >= freeShippingThreshold && (
                <div className="p-4 bg-green-50 border-b border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-green-800">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="font-medium">🎉 You qualify for free shipping!</span>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Footer with Summary and Checkout */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${summary.subtotal.toFixed(2)}</span>
                  </div>
                  
                  {summary.shipping > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>${summary.shipping.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {summary.shipping === 0 && summary.subtotal >= freeShippingThreshold && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (estimated)</span>
                    <span>${summary.tax.toFixed(2)}</span>
                  </div>

                  {summary.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-${summary.discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${summary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={closeCart}
                    className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-[10px]">✓</span>
                  </div>
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}