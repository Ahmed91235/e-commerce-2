'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleVariantChange = (variantType: string, variantValue: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: variantValue
    }));
  };

  // Get the selected variant for each type (for future use)
  // const getSelectedVariant = (type: string): ProductVariant | undefined => {
  //   const value = selectedVariants[type];
  //   if (!value) return undefined;
  //   return product.variants.find(v => v.type === type && v.value === value);
  // };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div className="space-y-6">
            <ProductGallery 
              images={product.images} 
              name={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo 
              product={product}
              selectedVariants={selectedVariants}
              onVariantChange={handleVariantChange}
            />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}