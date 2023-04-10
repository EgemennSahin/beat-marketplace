import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  const s = (
    <Link href="/upload" className="btn btn-primary normal-case">
      Yükle
    </Link>
  );

  return (
    <div className="sticky top-0 navbar justify-between py-2 px-16 bg-base-200 z-50">
      <div className="flex-1 space-x-4">
        <Link href="/" className="font-bold text-xl">
          BeatStore
        </Link>
        <div className="form-control">
          <input
            type="text"
            placeholder="Beat ara"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex-none space-x-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/avatar.png" alt="avatar" width={40} height={40} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profil</a>
            </li>
            <li>
              <a>Ayarlar</a>
            </li>
            <li>
              <a>Oturumu kapat</a>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCartIcon className="w-8 h-8" />
              <span className="badge badge-md indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
