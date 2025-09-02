export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  compare_price?: number;
  sku: string;
  inventory_count: number;
  category_id: number;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  is_active: boolean;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'style';
  value: string;
  price_adjustment?: number;
  inventory_count?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: number;
  created_at: string;
}

export interface ProductFilter {
  categories?: number[];
  priceRange?: {
    min: number;
    max: number;
  };
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  tags?: string[];
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating' | 'newest';
  filters?: ProductFilter;
  page?: number;
  limit?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}