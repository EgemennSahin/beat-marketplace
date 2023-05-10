import Link from "next/link";
import ViewCartButton from "../cart/Cart";
import UserAvatar from "./UserAvatar";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="fixed top-0 navbar bg-base-200 z-50 flex-col gap-3">
      <div className="flex justify-between w-screen px-2 lg:px-48 space-x-4">
        <div className="flex flex-1 space-x-12">
          <Link href="/" className="font-bold text-xl text-base-content">
            Beat market
          </Link>

          <div className="hidden lg:flex w-1/3">
            <Search />
          </div>
        </div>
        {/* @ts-expect-error Server Component */}
        <ViewCartButton />

        {/* @ts-expect-error Server Component */}
        <UserAvatar />
      </div>
      <div className="flex lg:hidden w-screen px-2">
        <Search />
      </div>
    </div>
  );
}
