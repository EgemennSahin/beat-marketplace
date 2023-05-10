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
      onClick={() => dispatch(removeFromCart(itemInCart!.id))}
      className="btn btn-sm btn-error btn-outline btn-square p-1"
    >
      <TrashIcon className="h-full w-full" />
    </button>
  );
}
