import AuthenticationForm from "@/components/AuthenticationForm";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AuthPage() {
  const supabase = await getSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  // If user is logged in, redirect to home page
  if (data?.user?.id) {
    redirect("/");
  }

  // If user has not confirmed their email, redirect to confirm page
  if (data?.user?.confirmation_sent_at) {
    redirect("/auth/confirm");
  }

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
}
