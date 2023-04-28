"use client";

import BeatInCart from "@/components/cart/BeatInCart";
import { useAppSelector } from "@/store/store";

export default function CartItems() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((beatData) => (
        <BeatInCart key={beatData.id} beatData={beatData} />
      ))}
    </div>
  );
}
