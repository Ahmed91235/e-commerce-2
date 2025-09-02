'use client';

import React from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { ShippingOption } from '@/types/checkout';
import { Truck, Zap } from 'lucide-react';

const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
    estimatedDays: '5-7 business days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 9.99,
    estimatedDays: '2-3 business days'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 19.99,
    estimatedDays: 'Next business day'
  }
];

export function ShippingForm() {
  const { state, updateData } = useCheckout();
  const selectedShipping = state.data.shippingOption;

  const handleShippingSelect = (option: ShippingOption) => {
    updateData({
      shippingOption: {
        ...option,
        isSelected: true
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>

      {/* Shipping Address Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-sm text-gray-700 mb-2">Shipping to:</h3>
        <p className="text-sm">
          {state.data.shippingAddress?.firstName} {state.data.shippingAddress?.lastName}
        </p>
        <p className="text-sm text-gray-600">
          {state.data.shippingAddress?.address1}
          {state.data.shippingAddress?.address2 && `, ${state.data.shippingAddress.address2}`}
        </p>
        <p className="text-sm text-gray-600">
          {state.data.shippingAddress?.city}, {state.data.shippingAddress?.state} {state.data.shippingAddress?.zipCode}
        </p>
      </div>

      {/* Shipping Options */}
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50
              ${selectedShipping?.id === option.id 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200'
              }
            `}
            onClick={() => handleShippingSelect(option)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping?.id === option.id}
                onChange={() => handleShippingSelect(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {option.id === 'standard' && <Truck className="w-5 h-5 text-gray-600" />}
                    {option.id === 'express' && <Truck className="w-5 h-5 text-blue-600" />}
                    {option.id === 'overnight' && <Zap className="w-5 h-5 text-yellow-600" />}
                    <div>
                      <p className="font-medium text-sm">{option.name}</p>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">
                      {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Indicator */}
            {selectedShipping?.id === option.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Shipping Information */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Shipping Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• All orders ship Monday through Friday</li>
          <li>• Orders placed after 2PM ET ship the next business day</li>
          <li>• Free standard shipping on orders over $50</li>
          <li>• Express and overnight shipping available for urgent orders</li>
        </ul>
      </div>
    </div>
  );
}