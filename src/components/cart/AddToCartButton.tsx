"use client";

// AddToCartButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { addToCart, itemInCartSelector } from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AddToCartButton({ beatData }: { beatData: BeatData }) {
  const itemInCart = useAppSelector((state) =>
    itemInCartSelector(state, beatData.id)
  );
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={itemInCart ? true : false}
      onClick={() => dispatch(addToCart(beatData))}
      className={`btn btn-primary btn-sm ${itemInCart ? "btn-disabled" : ""}`}
    >
      <ShoppingCartIcon className="w-5 h-5 mr-2" />
      {itemInCart ? "Beat Sepette" : "Satın Al"}
    </button>
  );
}
