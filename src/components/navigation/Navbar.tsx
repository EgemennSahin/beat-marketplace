import Link from "next/link";
import ViewCartButton from "../cart/CartButton";
import UserAvatar from "./UserAvatar";
import Search from "./Search";

export default async function Navbar() {
  return (
    <div className="fixed top-0 navbar justify-between p-4 h-16 space-x-4 w-screen lg:px-16 bg-base-200 z-50">
      <div className="flex-1 space-x-4">
        <Link href="/" className="font-bold text-xl text-base-content">
          B
        </Link>

        <Search />
      </div>
      <div className="flex-none space-x-4">
        {/* @ts-expect-error Server Component */}
        <UserAvatar />

        <ViewCartButton />
      </div>
    </div>
  );
}
