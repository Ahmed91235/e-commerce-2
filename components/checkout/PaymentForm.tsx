'use client';

import React from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { CreditCard, Shield, Lock } from 'lucide-react';

export function PaymentForm() {
  const { /* state, updateData */ } = useCheckout();
  const [paymentMethod, setPaymentMethod] = React.useState('credit_card');
  const [billingOption, setBillingOption] = React.useState('same');

  const [cardData, setCardData] = React.useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleCardChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Payment</h2>

      {/* Payment Methods */}
      <div className="mb-6">
        <div className="space-y-2">
          <label className={`
            flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
            ${paymentMethod === 'credit_card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
          `}>
            <input
              type="radio"
              name="payment"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <CreditCard className="ml-3 w-5 h-5 text-gray-600" />
            <span className="ml-2 font-medium">Credit Card</span>
          </label>

          <label className={`
            flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
            ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
          `}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-3 w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              P
            </div>
            <span className="ml-2 font-medium">PayPal</span>
          </label>
        </div>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === 'credit_card' && (
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Card number *
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardData.number}
              onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
              placeholder="1234 1234 1234 1234"
              maxLength={19}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry date *
              </label>
              <input
                type="text"
                id="expiry"
                value={cardData.expiry}
                onChange={(e) => handleCardChange('expiry', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
                CVC *
              </label>
              <input
                type="text"
                id="cvc"
                value={cardData.cvc}
                onChange={(e) => handleCardChange('cvc', e.target.value.replace(/\D/g, '').substring(0, 4))}
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
              Name on card *
            </label>
            <input
              type="text"
              id="cardName"
              value={cardData.name}
              onChange={(e) => handleCardChange('name', e.target.value)}
              placeholder="Full name as shown on card"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* PayPal Section */}
      {paymentMethod === 'paypal' && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-blue-600 text-lg font-bold mb-2">PayPal</div>
          <p className="text-sm text-gray-600">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {/* Billing Address */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Billing Address</h3>
        
        <div className="space-y-2">
          <label className={`
            flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
            ${billingOption === 'same' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
          `}>
            <input
              type="radio"
              name="billing"
              value="same"
              checked={billingOption === 'same'}
              onChange={(e) => setBillingOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Same as shipping address</span>
          </label>

          <label className={`
            flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
            ${billingOption === 'different' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
          `}>
            <input
              type="radio"
              name="billing"
              value="different"
              checked={billingOption === 'different'}
              onChange={(e) => setBillingOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Use a different billing address</span>
          </label>
        </div>
      </div>

      {/* Different Billing Address Form */}
      {billingOption === 'different' && (
        <div className="space-y-4 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-sm">Billing Address</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <input
            type="text"
            placeholder="Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">State</option>
              <option value="CA">CA</option>
              <option value="NY">NY</option>
              <option value="TX">TX</option>
            </select>
            <input
              type="text"
              placeholder="ZIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">Secure Payment</span>
        </div>
        <div className="text-sm text-green-700 space-y-1">
          <p className="flex items-center">
            <Lock className="w-4 h-4 mr-1" />
            256-bit SSL encryption
          </p>
          <p>• Your payment information is secure and encrypted</p>
          <p>• We never store your credit card details</p>
        </div>
      </div>
    </div>
  );
}