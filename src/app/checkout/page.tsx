"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  totalItemSelector,
  totalPriceSelector,
  removeFromCart,
} from "@/store/features/cartSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import BeatInCart from "@/components/cart/BeatInCart";

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);
  const dispatch = useAppDispatch();

  const removeItemFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {cartItems.map((beatData) => (
              <BeatInCart key={beatData.id} beatData={beatData} />
            ))}
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <div className="mb-4">
              <span className="font-bold text-xl">Total: {totalPrice} TL</span>
            </div>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
}
