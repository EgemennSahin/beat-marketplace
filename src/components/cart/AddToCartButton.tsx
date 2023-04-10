"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AddToCartButton({ beatData }: { beatData: BeatData }) {
  const { addToCart } = useCart()!;

  return (
    <button
      onClick={() => addToCart(beatData)}
      className="btn btn-primary btn-sm"
    >
      <ShoppingCartIcon className="w-5 h-5 mr-2" />
      Satın Al
    </button>
  );
}
