'use client';

import React, { useMemo } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onToggleWishlist?: (productId: number) => void;
  wishlistItems?: number[];
  showQuickView?: boolean;
  gridCols?: 2 | 3 | 4 | 6;
  className?: string;
}

export default function ProductGrid({
  products,
  isLoading = false,
  onToggleWishlist,
  wishlistItems = [],
  showQuickView = true,
  gridCols = 4,
  className = ''
}: ProductGridProps) {
  
  // Create wishlist lookup for performance
  const wishlistSet = useMemo(() => new Set(wishlistItems), [wishlistItems]);

  // Grid responsive classes based on column count
  const gridClasses = useMemo(() => {
    const baseClasses = 'grid gap-4 sm:gap-6';
    
    switch (gridCols) {
      case 2:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
      case 3:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
      case 4:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      case 6:
        return `${baseClasses} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`;
      default:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
    }
  }, [gridCols]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-5 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21h2m4 0h2"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        We couldn&apos;t find any products matching your criteria. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Refresh Results
      </button>
    </div>
  );

  // Error boundary for individual products
  const ProductCardWrapper = ({ product }: { product: Product }) => {
    try {
      return (
        <ProductCard
          key={product.id}
          product={product}
          onToggleWishlist={onToggleWishlist}
          showQuickView={showQuickView}
          isInWishlist={wishlistSet.has(product.id)}
        />
      );
    } catch (error) {
      console.error('Error rendering product card:', error);
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-gray-600">Error loading product</p>
        </div>
      );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={gridClasses}>
        {/* Loading State */}
        {isLoading && (
          <>
            {Array.from({ length: gridCols * 2 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && <EmptyState />}

        {/* Product Cards */}
        {!isLoading && products.length > 0 && (
          products.map((product) => (
            <ProductCardWrapper key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Grid Statistics */}
      {!isLoading && products.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}