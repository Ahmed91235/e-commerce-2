import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Related Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You might also be interested in these products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onToggleWishlist={(productId) => {
              console.log('Toggled wishlist:', productId);
              // Here you would typically dispatch to wishlist context
            }}
          />
        ))}
      </div>
    </div>
  );
}