"use client";

import { totalItemSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";

export default function CartItemCountBadge() {
  const totalItems = useAppSelector(totalItemSelector);

  return (
    <span className="badge border-none bg-gradient-to-br from-secondary to-primary text-white indicator-item">
      {totalItems}
    </span>
  );
}
