import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartItemCountBadge from "./CartItemCountBadge";
import CartDropdown from "./CartDropdown";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="z-50 dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon className="w-8 h-8" />
          <CartItemCountBadge />
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-4 card card-compact dropdown-content w-72 bg-base-200 shadow-2xl"
      >
        <div className="card-body gap-4">
          <span className="font-bold text-lg">Beatler</span>

          <CartDropdown />
          <div className="card-actions">
            <Link href="/checkout" className="btn btn-primary btn-block">
              Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
