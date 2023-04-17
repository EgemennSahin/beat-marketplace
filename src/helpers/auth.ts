// auth.ts
import { supabase } from "@/config/supabaseClient";

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  const { user, session } = data;

  if (error) {
    throw new Error(translateError(error.message));
  }

  return user;
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
