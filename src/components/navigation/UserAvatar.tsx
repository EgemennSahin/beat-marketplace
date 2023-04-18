import { Database } from "@/interfaces/supabase";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { handleLogout } from "@/helpers/auth";
import { LogoutButton } from "./LogoutButton";

export default async function UserAvatar() {
  const supabase = createServerComponentSupabaseClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    headers,
    cookies,
  });

  const { data } = await supabase.auth.getUser();
  const user = data.user!;

  if (!user?.id) {
    return (
      <div className="flex gap-2">
        <Link href="/auth" className="btn btn-primary">
          Giriş yap
        </Link>
        <Link href="/auth" className="btn btn-primary btn-outline">
          Kayıt ol
        </Link>
      </div>
    );
  }

  return (
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
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
