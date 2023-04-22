"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import BeatInCart from "./BeatInCart";
import {
  totalItemSelector,
  totalPriceSelector,
} from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { useState } from "react";

export default function VideoCartButton() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalItems = useAppSelector(totalItemSelector);
  const totalPrice = useAppSelector(totalPriceSelector);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown dropdown-end${isOpen ? " open" : ""}`}>
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        onClick={toggleDropdown}
      >
        <div className="indicator">
          <ShoppingCartIcon className="w-8 h-8" />
          <span className="badge badge-md indicator-item">{totalItems}</span>
        </div>
      </button>
      <div
        tabIndex={0}
        className={`mt-4 card card-compact dropdown-content w-72 bg-base-200 shadow-2xl${
          isOpen ? " block" : " hidden"
        }`}
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
            <Link href="/checkout" className="btn btn-primary btn-block">
              Devam et
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
