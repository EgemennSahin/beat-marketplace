"use client";

import CheckoutButton from "@/components/cart/CheckoutButton";
import { totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";

export default function CartReview() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  return (
    <>
      <div className="mb-4">
        <span className="font-bold text-xl">Toplam: {totalPrice} TL</span>
      </div>
      <CheckoutButton beats={cartItems} />
    </>
  );
}
