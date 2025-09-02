'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryProps {
  isCollapsible?: boolean;
  showEditCart?: boolean;
}

export function OrderSummary({ isCollapsible = true, showEditCart = false }: OrderSummaryProps) {
  const { items, summary, removeItem, updateQuantity } = useCart();
  const [isExpanded, setIsExpanded] = React.useState(!isCollapsible);

  // const shipping = 0; // Free shipping for now
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">No items in cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {isCollapsible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="font-medium">Order Summary</span>
            <span className="text-sm text-gray-500">({itemCount} items)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">${summary.total.toFixed(2)}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      )}

      {isExpanded && (
        <div className="px-4 pb-4">
          {!isCollapsible && (
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          )}

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant?.color}-${item.variant?.size}`} 
                   className="flex items-start space-x-3">
                <div className="relative">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.productName}</h4>
                  {item.variant && (
                    <div className="text-xs text-gray-500 mt-1">
                      {item.variant.color && <span>Color: {item.variant.color}</span>}
                      {item.variant.color && item.variant.size && <span> • </span>}
                      {item.variant.size && <span>Size: {item.variant.size}</span>}
                    </div>
                  )}
                  
                  {showEditCart && (
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm min-w-[1rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${summary.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Tax (estimated)</span>
              <span>${summary.tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}