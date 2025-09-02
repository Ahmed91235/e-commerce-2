'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useCart } from '@/contexts/CartContext';
import { CheckoutProgress } from './CheckoutProgress';
import { InformationForm } from './InformationForm';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import { OrderConfirmation } from './OrderConfirmation';
import { OrderSummary } from './OrderSummary';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';

export function CheckoutFlow() {
  const router = useRouter();
  const { state, updateStep, setLoading } = useCheckout();
  const { items } = useCart();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0 && state.currentStep !== 'confirmation') {
      router.push('/products');
    }
  }, [items.length, state.currentStep, router]);

  const handleBack = () => {
    switch (state.currentStep) {
      case 'shipping':
        updateStep('information');
        break;
      case 'payment':
        updateStep('shipping');
        break;
      case 'confirmation':
        updateStep('payment');
        break;
      default:
        router.push('/products');
    }
  };

  const handleContinue = async () => {
    setLoading(true);

    try {
      switch (state.currentStep) {
        case 'information':
          // Validate information form
          if (validateInformation()) {
            updateStep('shipping');
          }
          break;

        case 'shipping':
          // Validate shipping selection
          if (state.data.shippingOption) {
            updateStep('payment');
          }
          break;

        case 'payment':
          // Process payment (simulate with delay)
          await new Promise(resolve => setTimeout(resolve, 2000));
          updateStep('confirmation');
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateInformation = (): boolean => {
    const { data } = state;
    return !!(
      data.email &&
      data.shippingAddress?.firstName &&
      data.shippingAddress?.lastName &&
      data.shippingAddress?.address1 &&
      data.shippingAddress?.city &&
      data.shippingAddress?.state &&
      data.shippingAddress?.zipCode
    );
  };

  const canContinue = () => {
    switch (state.currentStep) {
      case 'information':
        return validateInformation();
      case 'shipping':
        return !!state.data.shippingOption;
      case 'payment':
        return true; // Add payment validation here
      default:
        return false;
    }
  };

  const getStepContent = () => {
    switch (state.currentStep) {
      case 'information':
        return <InformationForm />;
      case 'shipping':
        return <ShippingForm />;
      case 'payment':
        return <PaymentForm />;
      case 'confirmation':
        return <OrderConfirmation />;
      default:
        return null;
    }
  };

  const isConfirmationStep = state.currentStep === 'confirmation';
  
  if (items.length === 0 && !isConfirmationStep) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-4">Add some items to your cart to continue with checkout.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          {!isConfirmationStep && (
            <p className="text-gray-600">Complete your order in just a few steps</p>
          )}
        </div>

        {/* Progress Indicator */}
        {!isConfirmationStep && <CheckoutProgress currentStep={state.currentStep} />}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {getStepContent()}
            </div>

            {/* Navigation Buttons */}
            {!isConfirmationStep && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={state.isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {state.currentStep === 'information' ? 'Return to cart' : 'Back'}
                </button>

                <button
                  onClick={handleContinue}
                  disabled={!canContinue() || state.isLoading}
                  className={`
                    flex items-center px-8 py-3 rounded-lg text-white font-medium transition-all
                    ${canContinue() && !state.isLoading
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {state.isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {state.currentStep === 'payment' ? 'Complete Order' : 'Continue'}
                      {state.currentStep === 'payment' ? (
                        <Lock className="w-4 h-4 ml-2" />
                      ) : (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {!isConfirmationStep && (
            <div className="lg:w-96">
              <div className="sticky top-8">
                <OrderSummary isCollapsible={false} />
                
                {/* Security Badge */}
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-800">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}