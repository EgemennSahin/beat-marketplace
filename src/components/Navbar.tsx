import Image from "next/image";
import Link from "next/link";
import ViewCartButton from "./cart/ViewCartButton";

export default function Navbar() {
  return (
    <div className="sticky top-0 navbar justify-between py-2 px-4 space-x-4 w-screen lg:px-16 bg-base-300 z-50">
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

        <ViewCartButton />
      </div>
    </div>
  );
}
