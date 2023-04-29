"use client";

import { useAppSelector } from "@/store/store";
import BeatInCheckout from "./BeatInCheckout";

export default function CartItems() {
  // Get the cart items from the redux store, but on the server side, so we can
  // fetch the data from the database.
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="flex flex-col gap-8 w-96">
      {cartItems.map((beatData) => (
        <BeatInCheckout key={beatData.id} beatId={beatData.id} />
      ))}
    </div>
  );
}
