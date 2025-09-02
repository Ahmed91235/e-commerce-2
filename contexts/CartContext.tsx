'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType, CartSummary } from '@/types/cart';
import { Product, ProductVariant } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/utils/supabase/client';

// Cart Action Types
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

// Cart State Interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
}

// Initial State
const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
};

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload };
      
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
      
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.productId === action.payload.productId &&
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = Math.min(
          existingItem.quantity + action.payload.quantity,
          existingItem.maxQuantity
        );
        updatedItems[existingItemIndex] = { ...existingItem, quantity: newQuantity };
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    
    case 'UPDATE_ITEM': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(action.payload.quantity, item.maxQuantity) }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      return { ...state, items: updatedItems };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Props
interface CartProviderProps {
  children: ReactNode;
}

// Utility Functions
const calculateSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Simple tax calculation (8% for demo)
  const tax = subtotal * 0.08;
  
  // Free shipping over $50
  const shipping = subtotal >= 50 ? 0 : 10;
  
  // No discount for now
  const discount = 0;
  
  const total = subtotal + tax + shipping - discount;
  
  return {
    subtotal,
    tax,
    shipping,
    discount,
    total,
    itemCount
  };
};

const generateCartItemId = (productId: number, variant?: any): string => {
  const variantStr = variant ? JSON.stringify(variant) : 'default';
  return `${productId}-${btoa(variantStr)}`;
};

const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const productToCartItem = (product: Product, variant?: ProductVariant, quantity: number = 1): CartItem => {
  const cartItemId = generateCartItemId(product.id, variant);
  
  return {
    id: cartItemId,
    productId: product.id,
    productName: product.name,
    productSlug: toSlug(product.name),
    productImage: product.images[0] || '/placeholder-product.jpg',
    price: product.compare_price ? product.compare_price : product.price,
    originalPrice: product.compare_price ? product.price : undefined,
    quantity,
    variant: variant ? {
      color: variant.type === 'color' ? variant.value : undefined,
      size: variant.type === 'size' ? variant.value : undefined,
    } : undefined,
    inStock: product.is_active && product.inventory_count > 0,
    maxQuantity: product.inventory_count || 50,
  };
};

// Cart Provider Component
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();
  const supabase = createClient();

  // Load cart from localStorage or database
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        if (user) {
          // Load from database for authenticated users
          const { data: cartData, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error loading cart from database:', error);
          } else if (cartData) {
            // Convert database format to cart items format
            const cartItems: CartItem[] = cartData.map(item => ({
              id: `${item.product_id}-${item.id}`,
              productId: item.product_id,
              productName: item.variant_data?.productName || 'Product',
              productSlug: item.variant_data?.productSlug || 'product',
              productImage: item.variant_data?.productImage || '/placeholder-product.jpg',
              price: item.price,
              originalPrice: item.variant_data?.originalPrice,
              quantity: item.quantity,
              variant: item.variant_data?.variant,
              inStock: true,
              maxQuantity: 50,
            }));
            
            dispatch({ type: 'SET_ITEMS', payload: cartItems });
          }
        } else {
          // Load from localStorage for guests
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            const cartItems = JSON.parse(savedCart);
            dispatch({ type: 'SET_ITEMS', payload: cartItems });
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCart();
  }, [user, supabase]);

  // Save cart to localStorage or database
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        // Save to database for authenticated users
        try {
          // First, clear existing cart items
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);

          // Then insert new cart items
          if (state.items.length > 0) {
            const cartData = state.items.map(item => ({
              user_id: user.id,
              product_id: item.productId,
              quantity: item.quantity,
              price: item.price,
              variant_data: {
                productName: item.productName,
                productSlug: item.productSlug,
                productImage: item.productImage,
                originalPrice: item.originalPrice,
                variant: item.variant,
              },
            }));

            const { error } = await supabase
              .from('cart_items')
              .insert(cartData);

            if (error) {
              console.error('Error saving cart to database:', error);
            }
          }
        } catch (error) {
          console.error('Error saving cart to database:', error);
        }
      } else {
        // Save to localStorage for guests
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    };

    // Only save if not loading to avoid saving empty cart on initial load
    if (!state.isLoading) {
      saveCart();
    }
  }, [state.items, user, supabase, state.isLoading]);

  // Cart Actions
  const addItem = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const cartItem = productToCartItem(product, variant, quantity);
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    
    // Show cart drawer when item is added
    dispatch({ type: 'SET_CART_OPEN', payload: true });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      dispatch({ type: 'UPDATE_ITEM', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'SET_CART_OPEN', payload: true });
  };

  const closeCart = () => {
    dispatch({ type: 'SET_CART_OPEN', payload: false });
  };

  // Computed Values
  const summary = calculateSummary(state.items);

  const contextValue: CartContextType = {
    items: state.items,
    isOpen: state.isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    summary,
    isLoading: state.isLoading,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}