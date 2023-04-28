"use client";

// AddToCartButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import {
  itemInCartSelector,
  removeFromCart,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function RemoveFromCartButtonBase({
  beatData,
}: {
  beatData: BeatData;
}) {
  const itemInCart = useAppSelector((state) =>
    itemInCartSelector(state, beatData.id)
  );
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={itemInCart ? true : false}
      onClick={() => dispatch(removeFromCart(beatData.id))}
      className={`btn btn-primary btn-sm ${itemInCart ? "btn-disabled" : ""}`}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
}
