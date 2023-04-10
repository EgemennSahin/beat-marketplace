"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function VideoCartButton() {
  const { cartItems } = useCart()!;
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon className="w-8 h-8" />
          <span className="badge badge-md indicator-item">{totalItems}</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{totalItems} Items</span>
          <span className="text-info">Subtotal: {totalPrice} TL</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
