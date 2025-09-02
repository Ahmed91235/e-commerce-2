'use client';

import React from 'react';
import Link from 'next/link';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Download, Package, Truck } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber?: string;
}

export function OrderConfirmation({ orderNumber = 'ORD-2024-001' }: OrderConfirmationProps) {
  const { state } = useCheckout();
  const { items, summary, clearCart } = useCart();

  // In a real app, this would be called after successful payment
  React.useEffect(() => {
    // Clear cart after successful order
    const timer = setTimeout(() => {
      clearCart();
    }, 2000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Confirmed
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Order number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{state.data.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-lg">${summary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-left">
        <h3 className="font-semibold mb-4">Shipping Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
            <div className="text-sm text-gray-600">
              <p>{state.data.shippingAddress?.firstName} {state.data.shippingAddress?.lastName}</p>
              <p>{state.data.shippingAddress?.address1}</p>
              {state.data.shippingAddress?.address2 && <p>{state.data.shippingAddress.address2}</p>}
              <p>{state.data.shippingAddress?.city}, {state.data.shippingAddress?.state} {state.data.shippingAddress?.zipCode}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Method</h4>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{state.data.shippingOption?.name}</p>
              <p>{state.data.shippingOption?.description}</p>
              <p className="text-green-600">
                {state.data.shippingOption?.price === 0 ? 'FREE' : `$${state.data.shippingOption?.price?.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-b-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex-1 text-left">
                <h4 className="font-medium text-sm">{item.productName}</h4>
                {item.variant && (
                  <p className="text-xs text-gray-500 mt-1">
                    {item.variant.color && `Color: ${item.variant.color}`}
                    {item.variant.color && item.variant.size && ' • '}
                    {item.variant.size && `Size: ${item.variant.size}`}
                  </p>
                )}
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-900 mb-4">What happens next?</h3>
        
        <div className="space-y-4 text-sm text-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold">1</span>
            </div>
            <p>We&apos;ll send you a confirmation email with your order details</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold">2</span>
            </div>
            <p>Your order will be processed and prepared for shipping</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold">3</span>
            </div>
            <p>You&apos;ll receive tracking information once your order ships</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </button>
        
        <button className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Truck className="w-4 h-4 mr-2" />
          Track Order
        </button>
        
        <Link
          href="/products"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Support Information */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p className="mb-2">
          <strong>Need help?</strong> Contact our support team at support@ecommerce.com
        </p>
        <p>
          Order questions: 1-800-123-4567 • Monday - Friday, 9AM - 6PM EST
        </p>
      </div>
    </div>
  );
}