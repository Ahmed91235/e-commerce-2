'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
  ProductGrid, 
  FilterSidebar, 
  SearchBar 
} from '@/components/product';
import { ProductFilter } from '@/types/product';
import { sampleProducts, sampleCategories, sampleBrands } from '@/lib/sample-data';
import { Filter, SortAsc, Grid3X3, List, ChevronDown } from 'lucide-react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilter>({});
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<number[]>([1, 3, 5]); // Mock wishlist

  // Sort options for dropdown
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = [...sampleProducts];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(product =>
        filters.categories!.includes(product.category_id)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      results = results.filter(product =>
        product.price >= filters.priceRange!.min &&
        product.price <= filters.priceRange!.max
      );
    }

    // Brand filter (mock - would normally be in product data)
    if (filters.brands && filters.brands.length > 0) {
      results = results.filter(product =>
        filters.brands!.some(brand =>
          product.name.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    // Rating filter
    if (filters.rating) {
      results = results.filter(product =>
        product.rating && product.rating >= filters.rating!
      );
    }

    // Stock filter
    if (filters.inStock) {
      results = results.filter(product => product.inventory_count > 0);
    }

    // Tag filters
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(product =>
        filters.tags!.some(tag => product.tags.includes(tag))
      );
    }

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return results;
  }, [searchQuery, filters, sortBy]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: ProductFilter) => {
    setFilters(newFilters);
  }, []);



  // Handle wishlist toggle
  const handleToggleWishlist = useCallback((productId: number) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // Search suggestions (mock)
  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    
    return sampleProducts
      .filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(product => ({
        type: 'product' as const,
        value: product.name,
        id: product.id,
        price: product.price
      }));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search products, brands, categories..."
                suggestions={searchSuggestions}
                recentSearches={['iPhone', 'Nike shoes', 'Samsung']}
                trendingSearches={['MacBook', 'AirPods', 'Gaming laptop']}
                isLoading={false}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isFilterOpen ? 'rotate-180' : ''
                }`} />
              </button>
            </div>

            <FilterSidebar
              categories={sampleCategories}
              brands={sampleBrands}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              priceRange={{ min: 0, max: 2500 }}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              className="lg:block"
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
                {searchQuery && (
                  <span className="text-sm text-gray-500">
                    for &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Grid Columns (only show in grid mode) */}
                {viewMode === 'grid' && (
                  <div className="hidden sm:flex items-center gap-1">
                    {[2, 3, 4].map((cols) => (
                      <button
                        key={cols}
                        onClick={() => setGridColumns(cols as 2 | 3 | 4)}
                        className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
                          gridColumns === cols
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-label={`${cols} columns`}
                      >
                        {cols}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onToggleWishlist={handleToggleWishlist}
              wishlistItems={wishlistItems}
              showQuickView={true}
              gridCols={viewMode === 'grid' ? gridColumns : 2}
            />

            {/* Load More Button (for pagination) */}
            {filteredProducts.length >= 8 && (
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}