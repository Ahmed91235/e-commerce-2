'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CheckoutState, CheckoutData, CheckoutStep } from '@/types/checkout';

interface CheckoutContextType {
  state: CheckoutState;
  updateStep: (step: CheckoutStep) => void;
  updateData: (data: Partial<CheckoutData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
  resetCheckout: () => void;
  setGuestMode: (isGuest: boolean) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

type CheckoutAction =
  | { type: 'UPDATE_STEP'; payload: CheckoutStep }
  | { type: 'UPDATE_DATA'; payload: Partial<CheckoutData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: { field: string; error: string } }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_CHECKOUT' }
  | { type: 'SET_GUEST_MODE'; payload: boolean };

const initialState: CheckoutState = {
  currentStep: 'information',
  data: {
    email: '',
    sameBillingAddress: true,
    acceptsMarketing: false,
    textUpdates: false,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  },
  isLoading: false,
  errors: {},
  isGuestCheckout: true
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'UPDATE_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    
    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error
        }
      };
    
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    
    case 'RESET_CHECKOUT':
      return initialState;
    
    case 'SET_GUEST_MODE':
      return {
        ...state,
        isGuestCheckout: action.payload
      };
    
    default:
      return state;
  }
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const updateStep = (step: CheckoutStep) => {
    dispatch({ type: 'UPDATE_STEP', payload: step });
  };

  const updateData = (data: Partial<CheckoutData>) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (field: string, error: string) => {
    dispatch({ type: 'SET_ERROR', payload: { field, error } });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const resetCheckout = () => {
    dispatch({ type: 'RESET_CHECKOUT' });
  };

  const setGuestMode = (isGuest: boolean) => {
    dispatch({ type: 'SET_GUEST_MODE', payload: isGuest });
  };

  const value: CheckoutContextType = {
    state,
    updateStep,
    updateData,
    setLoading,
    setError,
    clearErrors,
    resetCheckout,
    setGuestMode
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}