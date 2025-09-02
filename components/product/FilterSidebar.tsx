'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Filter,
  Star
} from 'lucide-react';
import { ProductFilter, Category } from '@/types/product';

interface FilterSidebarProps {
  categories: Category[];
  brands: string[];
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
  priceRange?: { min: number; max: number };
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}

function FilterSection({ title, children, defaultOpen = true, count }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{title}</span>
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
              {count}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  categories,
  brands,
  filters,
  onFiltersChange,
  priceRange = { min: 0, max: 1000 },
  isOpen = true,
  onClose,
  className = ''
}: FilterSidebarProps) {
  const [localPriceRange, setLocalPriceRange] = useState({
    min: filters.priceRange?.min ?? priceRange.min,
    max: filters.priceRange?.max ?? priceRange.max
  });

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories && filters.categories.length > 0) count++;
    if (filters.brands && filters.brands.length > 0) count++;
    if (filters.priceRange && (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max)) count++;
    if (filters.rating && filters.rating > 0) count++;
    if (filters.inStock) count++;
    if (filters.tags && filters.tags.length > 0) count++;
    return count;
  }, [filters, priceRange]);

  // Category handlers
  const handleCategoryChange = useCallback((categoryId: number, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined
    });
  }, [filters, onFiltersChange]);

  // Brand handlers
  const handleBrandChange = useCallback((brand: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter(b => b !== brand);
    
    onFiltersChange({
      ...filters,
      brands: newBrands.length > 0 ? newBrands : undefined
    });
  }, [filters, onFiltersChange]);

  // Price range handlers
  const handlePriceChange = useCallback((type: 'min' | 'max', value: number) => {
    setLocalPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  const applyPriceRange = useCallback(() => {
    onFiltersChange({
      ...filters,
      priceRange: localPriceRange
    });
  }, [filters, localPriceRange, onFiltersChange]);

  // Rating handler
  const handleRatingChange = useCallback((rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    });
  }, [filters, onFiltersChange]);

  // Stock filter handler
  const handleStockChange = useCallback((checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked || undefined
    });
  }, [filters, onFiltersChange]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setLocalPriceRange({ min: priceRange.min, max: priceRange.max });
    onFiltersChange({});
  }, [onFiltersChange, priceRange]);

  // Create hierarchical category tree
  const categoryTree = useMemo(() => {
    const parentCategories = categories.filter(cat => !cat.parent_id);
    return parentCategories.map(parent => ({
      ...parent,
      children: categories.filter(cat => cat.parent_id === parent.id)
    }));
  }, [categories]);

  const sidebarClasses = `
    bg-white border-r border-gray-200 transition-all duration-300
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    ${className}
  `.trim();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarClasses} fixed lg:relative inset-y-0 left-0 w-80 lg:w-72 z-50 lg:z-auto overflow-y-auto`}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Categories */}
          {categoryTree.length > 0 && (
            <FilterSection 
              title="Categories" 
              count={filters.categories?.length}
            >
              <div className="space-y-2">
                {categoryTree.map((category) => (
                  <div key={category.id}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.categories?.includes(category.id) || false}
                        onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {category.name}
                      </span>
                    </label>
                    {/* Subcategories */}
                    {category.children && category.children.length > 0 && (
                      <div className="ml-7 mt-2 space-y-2">
                        {category.children.map((subcategory) => (
                          <label key={subcategory.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={filters.categories?.includes(subcategory.id) || false}
                              onChange={(e) => handleCategoryChange(subcategory.id, e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-800">
                              {subcategory.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={localPriceRange.min}
                    onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="text-gray-400">-</div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={localPriceRange.max}
                    onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={applyPriceRange}
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Apply Price Range
              </button>
            </div>
          </FilterSection>

          {/* Brands */}
          {brands.length > 0 && (
            <FilterSection 
              title="Brands" 
              count={filters.brands?.length}
            >
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.brands?.includes(brand) || false}
                      onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Rating */}
          <FilterSection title="Customer Rating">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-700 ml-2">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => handleStockChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                In Stock Only
              </span>
            </label>
          </FilterSection>
        </div>
      </div>
    </>
  );
}