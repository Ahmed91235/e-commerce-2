'use client';

import React from 'react';
import { CheckoutStep } from '@/types/checkout';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const steps: { key: CheckoutStep; label: string; index: number }[] = [
  { key: 'information', label: 'Information', index: 0 },
  { key: 'shipping', label: 'Shipping', index: 1 },
  { key: 'payment', label: 'Payment', index: 2 },
  { key: 'confirmation', label: 'Confirmation', index: 3 }
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = steps.find(step => step.key === currentStep)?.index || 0;

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <React.Fragment key={step.key}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${isActive ? 'bg-blue-600 border-blue-600 text-white' : ''}
                    ${isCompleted ? 'bg-green-600 border-green-600 text-white' : ''}
                    ${isUpcoming ? 'border-gray-300 text-gray-400 bg-white' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium transition-colors duration-300
                    ${isActive ? 'text-blue-600' : ''}
                    ${isCompleted ? 'text-green-600' : ''}
                    ${isUpcoming ? 'text-gray-400' : ''}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-px mx-4 transition-colors duration-300
                    ${index < currentIndex ? 'bg-green-600' : 'bg-gray-300'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}