export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isSelected?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'google_pay' | 'apple_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}

export interface CheckoutData {
  email: string;
  shippingAddress: Address;
  billingAddress?: Address;
  sameBillingAddress: boolean;
  shippingOption: ShippingOption;
  paymentMethod?: PaymentMethod;
  giftMessage?: string;
  acceptsMarketing: boolean;
  textUpdates: boolean;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  user_id?: string;
  email: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  shippingOption: ShippingOption;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: {
    size?: string;
    color?: string;
  };
}

export type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

export interface CheckoutState {
  currentStep: CheckoutStep;
  data: Partial<CheckoutData>;
  isLoading: boolean;
  errors: Record<string, string>;
  isGuestCheckout: boolean;
}