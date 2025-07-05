import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size: string; color: string }>) => {
      const { product, size, color } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          quantity: 1,
          size,
          color,
        });
      }

      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; size: string; color: string }>) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        item => !(item.product.id === productId && item.size === size && item.color === color)
      );
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; size: string; color: string; quantity: number }>) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        item => item.product.id === productId && item.size === size && item.color === color
      );

      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(
            i => !(i.product.id === productId && i.size === size && i.color === color)
          );
        }
      }

      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;