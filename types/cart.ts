export interface CartItem {
  id: string;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
  inStock: boolean;
  maxQuantity: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface CartContextType {
  // Cart State
  items: CartItem[];
  isOpen: boolean;
  
  // Cart Actions
  addItem: (product: any, variant?: any, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Drawer Actions
  openCart: () => void;
  closeCart: () => void;
  
  // Computed Values
  summary: CartSummary;
  isLoading: boolean;
}