import AuthenticationForm from "@/components/AuthenticationForm";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AuthPage() {
  const supabase = await getSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user?.id) {
    redirect("/");
  }

  if (data?.user?.confirmation_sent_at) {
    redirect("/auth/confirm");
  }

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
}
