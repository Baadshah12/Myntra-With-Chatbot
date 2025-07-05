import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { RootState } from '../../store';
import { setFilters, clearFilters } from '../../store/slices/productsSlice';
import { FilterState } from '../../types';
import { brands, categories } from '../../data/products';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    handleFilterChange('category', newCategories);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    handleFilterChange('brand', newBrands);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '28', '30', '32', '34', '36'];
  const colors = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'pink', 'purple', 'grey', 'brown'];

  const handleSizeChange = (size: string) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size];
    handleFilterChange('size', newSizes);
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    handleFilterChange('color', newColors);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose} 
        />
      )}
      
      {/* Horizontal Filter Bar for Desktop */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-4 py-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-pink-500 hover:text-pink-600"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Categories</h3>
            <div className="space-y-1">
              {categories.slice(0, 3).map((category) => (
                <label key={category.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-3 h-3 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <span className="capitalize">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Brands</h3>
            <div className="space-y-1">
              {brands.slice(0, 3).map((brand) => (
                <label key={brand} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-3 h-3 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Size</h3>
            <div className="flex flex-wrap gap-1">
              {sizes.slice(0, 6).map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-2 py-1 text-xs border rounded transition-colors ${
                    filters.size.includes(size)
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Color</h3>
            <div className="flex flex-wrap gap-1">
              {colors.slice(0, 6).map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    filters.color.includes(color) ? 'border-pink-500 scale-110' : 'border-gray-300'
                  } ${
                    color === 'black' ? 'bg-black' :
                    color === 'white' ? 'bg-white' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'red' ? 'bg-red-500' :
                    color === 'green' ? 'bg-green-500' :
                    color === 'yellow' ? 'bg-yellow-500' :
                    color === 'pink' ? 'bg-pink-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    color === 'grey' ? 'bg-gray-500' :
                    color === 'brown' ? 'bg-amber-700' :
                    'bg-gray-400'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div className={`fixed lg:hidden inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearFilters}
                className="text-sm text-pink-500 hover:text-pink-600"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-sm capitalize">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="font-medium mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                      filters.size.includes(size)
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      filters.color.includes(color) ? 'border-pink-500 scale-110' : 'border-gray-300'
                    } ${
                      color === 'black' ? 'bg-black' :
                      color === 'white' ? 'bg-white' :
                      color === 'blue' ? 'bg-blue-500' :
                      color === 'red' ? 'bg-red-500' :
                      color === 'green' ? 'bg-green-500' :
                      color === 'yellow' ? 'bg-yellow-500' :
                      color === 'pink' ? 'bg-pink-500' :
                      color === 'purple' ? 'bg-purple-500' :
                      color === 'grey' ? 'bg-gray-500' :
                      color === 'brown' ? 'bg-amber-700' :
                      'bg-gray-400'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange('rating', rating)}
                      className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{rating}★ & above</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;