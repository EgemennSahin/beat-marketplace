"use client";

import { BeatData } from "@/types/BeatData";
import { createContext, useState, useContext, ReactNode } from "react";

interface CartContextType {
  cartItems: BeatData[];
  addToCart: (item: BeatData) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<BeatData[]>([]);

  const addToCart = (item: BeatData) => {
    setCartItems([...cartItems, item]);
  };

  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
