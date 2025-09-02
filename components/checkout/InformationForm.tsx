'use client';

import React from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckoutData } from '@/types/checkout';

export function InformationForm() {
  const { state, updateData, clearErrors, setGuestMode } = useCheckout();
  const { user } = useAuth();
  // const [showSignUp, setShowSignUp] = React.useState(false);

  // Auto-populate email if user is logged in
  React.useEffect(() => {
    if (user?.email && !state.data.email) {
      updateData({ email: user.email });
      setGuestMode(false);
    }
  }, [user, state.data.email, updateData, setGuestMode]);

  const handleInputChange = (field: keyof CheckoutData, value: string | boolean) => {
    updateData({ [field]: value });
    clearErrors();
  };

  const handleAddressChange = (field: string, value: string) => {
    updateData({
      shippingAddress: {
        ...state.data.shippingAddress!,
        [field]: value
      }
    });
    clearErrors();
  };

  // const isValid = validateForm();

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email address *
        </label>
        <input
          type="email"
          id="email"
          value={state.data.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            state.errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your email"
          readOnly={!!user}
        />
        {state.errors.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      {/* Newsletter Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={state.data.acceptsMarketing || false}
            onChange={(e) => handleInputChange('acceptsMarketing', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Email me with news and offers
          </span>
        </label>
      </div>

      <h3 className="text-lg font-semibold mb-4 mt-8">Shipping Address</h3>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First name *
          </label>
          <input
            type="text"
            id="firstName"
            value={state.data.shippingAddress?.firstName || ''}
            onChange={(e) => handleAddressChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {state.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{state.errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last name *
          </label>
          <input
            type="text"
            id="lastName"
            value={state.data.shippingAddress?.lastName || ''}
            onChange={(e) => handleAddressChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {state.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{state.errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Company Field (Optional) */}
      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company (optional)
        </label>
        <input
          type="text"
          id="company"
          value={state.data.shippingAddress?.company || ''}
          onChange={(e) => handleAddressChange('company', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Address Fields */}
      <div className="mb-4">
        <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          type="text"
          id="address1"
          value={state.data.shippingAddress?.address1 || ''}
          onChange={(e) => handleAddressChange('address1', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            state.errors.address1 ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {state.errors.address1 && (
          <p className="mt-1 text-sm text-red-600">{state.errors.address1}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          id="address2"
          value={state.data.shippingAddress?.address2 || ''}
          onChange={(e) => handleAddressChange('address2', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={state.data.shippingAddress?.city || ''}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {state.errors.city && (
            <p className="mt-1 text-sm text-red-600">{state.errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            value={state.data.shippingAddress?.state || ''}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select state</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            {/* Add more states as needed */}
          </select>
          {state.errors.state && (
            <p className="mt-1 text-sm text-red-600">{state.errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP code *
          </label>
          <input
            type="text"
            id="zipCode"
            value={state.data.shippingAddress?.zipCode || ''}
            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {state.errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{state.errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Phone Field */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone (optional) 
        </label>
        <input
          type="tel"
          id="phone"
          value={state.data.shippingAddress?.phone || ''}
          onChange={(e) => handleAddressChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="For delivery updates"
        />
      </div>

      {/* Text Updates Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={state.data.textUpdates || false}
            onChange={(e) => handleInputChange('textUpdates', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Text me with news and offers
          </span>
        </label>
      </div>

      {/* Guest Checkout Note */}
      {state.isGuestCheckout && !user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Continue as guest</strong> or create an account for faster checkout.
          </p>
          <button
            onClick={() => {/* setShowSignUp(true) - TODO: implement signup flow */}}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Create account instead
          </button>
        </div>
      )}
    </div>
  );
}