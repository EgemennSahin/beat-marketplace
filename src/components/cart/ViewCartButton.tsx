"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import BeatInCart from "./BeatInCart";

export default function VideoCartButton() {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsOpen(true);
    }
  }, [totalItems]);

  // When the user clicks anywhere outside of the dropdown, close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && event.target instanceof HTMLElement) {
        if (!event.target.closest(".dropdown")) {
          // Blur the button so that the focus ring is removed
          event.target.blur();
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}>
      <button
        onClick={() => setIsOpen(false)}
        tabIndex={0}
        className="btn btn-ghost btn-circle"
      >
        <div className="indicator">
          <ShoppingCartIcon className="w-8 h-8" />
          <span className="badge badge-md indicator-item">{totalItems}</span>
        </div>
      </button>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-64 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{totalItems} Beat</span>
          {cartItems.map((beatData) => (
            <BeatInCart key={beatData.id} beatData={beatData} />
          ))}
          <span className="text-info">Toplam: {totalPrice} TL</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">Devam et</button>
          </div>
        </div>
      </div>
    </div>
  );
}
