"use client";

import { useCart } from "@/contexts/CartContext";
import { BeatData } from "@/types/BeatData";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function BeatInCart({ beatData }: { beatData: BeatData }) {
  const { removeFromCart } = useCart();

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat rounded-md group"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${beatData.image})`,
      }}
    >
      <div className="p-2">
        <div className="flex justify-between items-center gap-4">
          <span className="text-white truncate">{beatData.name}</span>
          <span className="text-white whitespace-nowrap">
            {beatData.price} TL
          </span>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(beatData.id)}
        className="z-10 absolute rounded-r-md top-0 right-0 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100 transition-all duration-200"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <div className="absolute inset-0 rounded-md bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
    </div>
  );
}
