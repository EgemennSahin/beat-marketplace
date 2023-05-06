import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useSupabase } from "@/providers/SupabaseProvider";
import { getSupabaseServerClient } from "@/helpers/supabase";

export default async function UserAvatar() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user!;

  if (!user?.id) {
    return (
      <div className="flex gap-2">
        <Link href="/auth" className="btn btn-primary normal-case">
          Kayıt / Giriş
        </Link>
      </div>
    );
  }

  // Get user data from table
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get user's profile picture from storage
  const { data: profilePicture } = supabase.storage
    .from("users")
    .getPublicUrl(`${user.id}/profile`);

  if (!userData) {
    return (
      <div className="flex gap-2">
        <Link href="/auth" className="btn btn-primary normal-case">
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
          className="btn btn-primary normal-case hidden lg:flex"
        >
          Stüdyo Paneli
        </Link>
      )}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              src={profilePicture.publicUrl}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {userData.role == "seller" ? (
            <>
              <li>
                <Link href="/dashboard">Stüdyo Paneli</Link>
              </li>
              <li>
                <Link href={`/user/${userData.id}`}>Profil</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/library">Beatlerin</Link>
            </li>
          )}

          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
