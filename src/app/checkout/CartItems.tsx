"use client";

import { useAppSelector } from "@/store/store";
import BeatInCheckout from "./BeatInCheckout";
import BeatInCart from "@/components/cart/BeatInCart";

export default function CartItems() {
  // Get the cart items from the redux store, but on the server side, so we can
  // fetch the data from the database.
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((beatData) => (
        <BeatInCart key={beatData.id} beatData={beatData} />
      ))}
    </div>
  );
}
