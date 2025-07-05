import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, FilterState } from '../../types';
import { products } from '../../data/products';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct: Product | null;
  filters: FilterState;
  loading: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: products,
  filteredItems: products,
  selectedProduct: null,
  filters: {
    category: [],
    brand: [],
    priceRange: [0, 10000],
    size: [],
    color: [],
    rating: 0,
  },
  loading: false,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters, state.searchQuery);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = applyFilters(state.items, state.filters, action.payload);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.filteredItems = state.items;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

function applyFilters(items: Product[], filters: FilterState, searchQuery: string): Product[] {
  return items.filter(item => {
    // Search query filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false;
    }

    // Brand filter
    if (filters.brand.length > 0 && !filters.brand.includes(item.brand)) {
      return false;
    }

    // Price range filter
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
      return false;
    }

    // Size filter
    if (filters.size.length > 0 && !filters.size.some(size => item.sizes.includes(size))) {
      return false;
    }

    // Color filter
    if (filters.color.length > 0 && !filters.color.some(color => item.colors.includes(color))) {
      return false;
    }

    // Rating filter
    if (filters.rating > 0 && item.ratings < filters.rating) {
      return false;
    }

    return true;
  });
}

export const {
  setProducts,
  setSelectedProduct,
  setFilters,
  setSearchQuery,
  clearFilters,
  setLoading,
} = productsSlice.actions;

export default productsSlice.reducer;