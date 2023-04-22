import AuthenticationForm from "@/components/AuthenticationForm";
import { getSupabaseServerComponent } from "@/helpers/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AuthPage() {
  const supabase = await getSupabaseServerComponent();

  const { data } = await supabase.auth.getUser();
  console.log(data);
  // Check if user is logged in
  // If so, redirect to home page
  if (data?.user?.id) {
    console.log(data);

    redirect("/");
  }

  // Check if user signed up but not confirmed
  // If so, redirect to confirmation page
  if (data?.user?.confirmation_sent_at) {
    redirect("/auth/confirm");
  }

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
}
