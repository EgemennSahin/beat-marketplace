"use client";

import BeatInCart from "./BeatInCart";
import { totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";

export default function CartDropdown() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  return (
    <>
      {cartItems.map((beatData) => (
        <BeatInCart key={beatData.id} beatData={beatData} />
      ))}
      <span className="text-white text-end mr-2">
        Toplam:
        <span className="font-semibold"> {totalPrice} TL</span>
      </span>
    </>
  );
}
