export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  description?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  currency: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusHistory: OrderStatus[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  variant?: {
    color: string;
    size?: string;
    [key: string]: any;
  };
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  id?: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  isOnSale: boolean;
  variant?: {
    color: string;
    size?: string;
    [key: string]: any;
  };
  added_at: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    name: string;
  };
  paypal?: {
    email: string;
  };
  isDefault: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  activeOrders: number;
  wishlistItems: number;
  rewardPoints?: number;
}

// Dashboard navigation items
export interface DashboardNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// Form data types
export interface ProfileUpdateData {
  fullName: string;
  email: string;
  phone?: string;
  avatar_url?: string;
}

export interface AddressFormData extends Omit<Address, 'id'> {
  // All Address fields except id
}

export interface OrderFilters {
  status?: Order['status'][];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface WishlistFilters {
  inStock?: boolean;
  isOnSale?: boolean;
  priceFrom?: number;
  priceTo?: number;
  search?: string;
}