"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import BeatInCart from "./BeatInCart";
import {
  totalItemSelector,
  totalPriceSelector,
} from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";

export default function VideoCartButton() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalItems = useAppSelector(totalItemSelector);
  const totalPrice = useAppSelector(totalPriceSelector);

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
        // If the user clicks on the button or outside of the dropdown, close it

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
        className="mt-4 card card-compact dropdown-content w-72 bg-base-200 shadow-2xl"
      >
        <div className="card-body gap-4">
          <span className="font-bold text-lg">{totalItems} Beat</span>
          {cartItems.map((beatData) => (
            <BeatInCart key={beatData.id} beatData={beatData} />
          ))}
          <span className="text-info text-end mr-1.5">
            Toplam: {totalPrice} TL
          </span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">Devam et</button>
          </div>
        </div>
      </div>
    </div>
  );
}