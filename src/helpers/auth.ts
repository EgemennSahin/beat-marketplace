// auth.ts
import { supabase } from "@/config/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "@/interfaces/supabase";

export async function handleSignUp() {
  await supabase.auth.signUp({
    email: "testing@example.com",
    password: "123456",
  });
}

export async function handleLogin() {
  await supabase.auth.signInWithPassword({
    email: "testing@example.com",
    password: "123456",
  });
}

export async function handleLogout(supabase: SupabaseClient) {
  await supabase.auth.signOut();
}

function translateError(errorCode: string): string {
  const errorTranslations: { [key: string]: string } = {
    "Password should be at least 6 characters":
      "Şifre en az 6 karakter uzunluğunda olmalıdır.",
  };

  return (
    errorTranslations[errorCode] || "Bir hata oluştu. Lütfen tekrar deneyin."
  );
}

export async function getSupabaseServerComponent() {
  const supabase = createServerComponentSupabaseClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    headers,
    cookies,
  });

  return supabase;
}
