import AuthenticationForm from "@/components/AuthenticationForm";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AuthPage() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  const user = data.session?.user;

  // If user is logged in, redirect to home page
  if (user?.id) {
    redirect("/");
  }

  // If user has not confirmed their email, redirect to confirm page
  if (user?.confirmation_sent_at) {
    redirect("/auth/confirm");
  }

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
}
