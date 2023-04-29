"use client";

// AddToCartButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { itemInCartSelector, removeFromCart } from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function RemoveFromCartButtonBase({
  beatId,
}: {
  beatId: number;
}) {
  const itemInCart = useAppSelector((state) =>
    itemInCartSelector(state, beatId)
  );
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={itemInCart ? false : true}
      onClick={() => dispatch(removeFromCart(beatId))}
      className="btn btn-sm"
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
}
