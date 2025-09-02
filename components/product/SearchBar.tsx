'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';


interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'recent' | 'trending';
  value: string;
  id?: string | number;
  image?: string;
  price?: number;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
  autoFocus?: boolean;
  className?: string;
  showSuggestions?: boolean;
  isLoading?: boolean;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  maxSuggestions?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  autoFocus = false,
  className = '',
  showSuggestions = true,
  isLoading = false,
  onSuggestionClick,
  maxSuggestions = 8
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine all suggestions
  const allSuggestions = useMemo(() => {
    const combined: SearchSuggestion[] = [];
    
    // Add direct product/category/brand matches
    combined.push(...suggestions.slice(0, maxSuggestions));
    
    // Add recent searches if query is empty
    if (!query && recentSearches.length > 0) {
      const recentItems = recentSearches
        .slice(0, 3)
        .map(search => ({
          type: 'recent' as const,
          value: search
        }));
      combined.push(...recentItems);
    }
    
    // Add trending searches if query is empty
    if (!query && trendingSearches.length > 0) {
      const trendingItems = trendingSearches
        .slice(0, 3)
        .map(search => ({
          type: 'trending' as const,
          value: search
        }));
      combined.push(...trendingItems);
    }
    
    return combined.slice(0, maxSuggestions);
  }, [suggestions, query, recentSearches, trendingSearches, maxSuggestions]);

  // Handle search submission
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
      setSelectedIndex(-1);
      // Store in recent searches
      const updatedRecent = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    }
  }, [query, onSearch, recentSearches]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.value);
    setShowDropdown(false);
    setSelectedIndex(-1);
    
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    } else {
      onSearch(suggestion.value);
    }
  }, [onSearch, onSuggestionClick]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showDropdown || allSuggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(allSuggestions[selectedIndex]);
        } else {
          handleSubmit();
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showDropdown, allSuggestions, selectedIndex, handleSubmit, handleSuggestionClick]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (showSuggestions) {
      setShowDropdown(value.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0);
    }
  }, [showSuggestions, recentSearches.length, trendingSearches.length]);

  // Handle focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (showSuggestions) {
      setShowDropdown(query.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0);
    }
  }, [showSuggestions, query.length, recentSearches.length, trendingSearches.length]);

  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Delay to allow clicks on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    }, 150);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Auto-focus if needed
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  // Render suggestion icon
  const renderSuggestionIcon = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'recent':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-gray-400" />;
      case 'product':
        return suggestion.image ? (
          <div className="w-4 h-4 rounded bg-gray-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={suggestion.image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <Search className="w-4 h-4 text-gray-400" />
        );
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
        }`}>
          <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 bg-white"
            disabled={isLoading}
            autoComplete="off"
            role="combobox"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
          />
          
          {/* Loading Spinner or Clear Button */}
          <div className="absolute right-3">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : query && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && showSuggestions && allSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {/* Recent Searches Header */}
          {!query && recentSearches.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Searches
              </h4>
            </div>
          )}

          {/* Trending Searches Header */}
          {!query && trendingSearches.length > 0 && recentSearches.length === 0 && (
            <div className="px-4 py-2 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </h4>
            </div>
          )}

          {/* Suggestions List */}
          <div className="py-2">
            {allSuggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.value}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors duration-150 ${
                  selectedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={selectedIndex === index}
              >
                {renderSuggestionIcon(suggestion)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate">{suggestion.value}</span>
                    {suggestion.price && (
                      <span className="text-sm font-medium text-gray-900">
                        ${suggestion.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {suggestion.type === 'product' && (
                    <span className="text-xs text-gray-500">Product</span>
                  )}
                  {suggestion.type === 'category' && (
                    <span className="text-xs text-gray-500">Category</span>
                  )}
                  {suggestion.type === 'brand' && (
                    <span className="text-xs text-gray-500">Brand</span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}