import { BeatData } from "@/interfaces/BeatData";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartState {
  cartItems: BeatData[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BeatData>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      // If item already exists, don't add it again
      if (item) {
        return;
      }

      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<BeatData>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      // If item doesn't exist, don't remove its
      if (!item) {
        return;
      }

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// Custom selector: getter function for the cart items

const cartItems = (state: RootState) => state.cart.cartItems;

export const itemInCartSelector = createSelector(
  [cartItems, (cartItems, beatId: string) => beatId],
  (cartItems, beatId) => {
    return cartItems.find((item) => item.id === beatId);
  }
);

export const totalItemSelector = createSelector([cartItems], (cartItems) => {
  return cartItems.length;
});

export const totalPriceSelector = createSelector([cartItems], (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.price, 0);
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
