import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { RootState } from '../store';
import ProductCard from '../components/Product/ProductCard';
import ProductFilters from '../components/Product/ProductFilters';

const Products: React.FC = () => {
  const { filteredItems, loading, searchQuery } = useSelector((state: RootState) => state.products);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const sortedProducts = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.ratings - a.ratings;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          {searchQuery && (
            <p className="text-gray-600 mt-1">
              Showing results for "{searchQuery}" ({filteredItems.length} items)
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 px-2 py-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest First</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Single Filter Component - Shows horizontal on desktop, sidebar on mobile */}
      <ProductFilters 
        isOpen={showMobileFilters} 
        onClose={() => setShowMobileFilters(false)} 
      />

      {/* Products Grid */}
      <div className="mt-6">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;