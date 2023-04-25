import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useSupabase } from "@/providers/SupabaseProvider";
import { getSupabaseServerClient } from "@/helpers/supabase";

export default async function UserAvatar() {
  const supabase = await getSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user!;

  // Get user data from table
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!user?.id || !userData?.id) {
    return (
      <div className="flex gap-2">
        <Link
          href="/auth"
          className="btn bg-gradient-to-br from-primary hover:from-primary-focus to-secondary hover:to-secondary-focus text-white normal-case"
        >
          Kayıt / Giriş
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {userData.role == "seller" && (
        <Link
          href="/dashboard"
          className="btn bg-gradient-to-br from-primary hover:from-primary-focus to-secondary hover:to-secondary-focus text-white normal-case"
        >
          Beat Yükle
        </Link>
      )}
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
            <Link href="/library">Beatlerin</Link>
          </li>
          <li>
            <a>Ayarlar</a>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
