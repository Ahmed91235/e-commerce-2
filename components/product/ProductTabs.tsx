'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { Star, Truck, RotateCcw, Shield } from 'lucide-react';

interface ProductTabsProps {
  product: Product;
}

type TabType = 'description' | 'reviews' | 'shipping' | 'returns';

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: null },
    { id: 'reviews', label: 'Reviews', icon: null },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
  ] as const;

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      author: 'John D.',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent product!',
      content: 'Really happy with this purchase. The quality is outstanding and it arrived quickly.',
      verified: true,
    },
    {
      id: 2,
      author: 'Sarah M.',
      rating: 4,
      date: '2024-01-12',
      title: 'Good value for money',
      content: 'Works as expected. The build quality is solid and the design is sleek.',
      verified: true,
    },
    {
      id: 3,
      author: 'Mike R.',
      rating: 5,
      date: '2024-01-10',
      title: 'Highly recommended',
      content: 'This exceeded my expectations. Will definitely buy again.',
      verified: false,
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>
            
            <h4 className="text-lg font-semibold mb-3">Specifications</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>Availability:</strong> {product.inventory_count} in stock</li>
              {product.variants.length > 0 && (
                <li>
                  <strong>Available Options:</strong>{' '}
                  {Array.from(new Set(product.variants.map(v => v.type))).join(', ')}
                </li>
              )}
            </ul>

            <h4 className="text-lg font-semibold mb-3 mt-6">Features</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Premium quality materials</li>
              <li>Professional design and craftsmanship</li>
              <li>Backed by manufacturer warranty</li>
              <li>Fast and reliable performance</li>
            </ul>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Write Review
              </button>
            </div>

            {/* Review Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.rating?.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.floor(product.rating || 0))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Based on {product.review_count} reviews
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = Math.floor(Math.random() * 50) + 1;
                    const percentage = (count / (product.review_count || 100)) * 100;
                    return (
                      <div key={stars} className="flex items-center space-x-2 text-sm">
                        <span className="w-4">{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {review.author}
                          {review.verified && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'shipping':
        return (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="w-6 h-6 mr-2" />
              Shipping Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Shipping Options</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">5-7 business days</div>
                    </div>
                    <div className="text-green-600 font-medium">FREE</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</div>
                    </div>
                    <div className="font-medium">$9.99</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium">Overnight Shipping</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Next business day</div>
                    </div>
                    <div className="font-medium">$19.99</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Delivery Details</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Free standard shipping on orders over $50</li>
                  <li>• Items ship within 1-2 business days</li>
                  <li>• Tracking information provided via email</li>
                  <li>• Signature required for orders over $200</li>
                  <li>• PO Boxes and APO/FPO addresses supported</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'returns':
        return (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <RotateCcw className="w-6 h-6 mr-2" />
              Return Policy
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Return Window</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You have <strong>30 days</strong> from the date of delivery to return your item 
                  for a full refund or exchange.
                </p>
                
                <h4 className="text-lg font-semibold mb-3">Return Conditions</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Item must be in original condition</li>
                  <li>• All original packaging and tags must be included</li>
                  <li>• Item must not show signs of wear or damage</li>
                  <li>• Some items may be subject to restocking fee</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">How to Return</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>1. Contact our customer service team</li>
                  <li>2. Receive return authorization and shipping label</li>
                  <li>3. Package item securely with all original materials</li>
                  <li>4. Drop off at any authorized shipping location</li>
                  <li>5. Refund processed within 5-7 business days</li>
                </ol>
                
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="font-medium text-green-800 dark:text-green-200 mb-2">
                    Free Returns
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All returns are free when using our prepaid return label.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}