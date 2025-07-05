import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        if (!state.currentUser.wishlist.includes(action.payload)) {
          state.currentUser.wishlist.push(action.payload);
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.wishlist = state.currentUser.wishlist.filter(
          id => id !== action.payload
        );
      }
    },
  },
});

export const {
  setUser,
  logout,
  addToWishlist,
  removeFromWishlist,
} = userSlice.actions;

export default userSlice.reducer;