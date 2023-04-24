import { Beat } from "@/components/beat/Beat";
import { getBeatsUploadedByUser, getUserData } from "@/helpers/database";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = params;

  const supabase = await getSupabaseServerClient();

  const userData = await supabase
    .from("users")
    .select("*")
    .eq("id", user)
    .single();

  if (userData.error) {
    redirect("/404");
  }

  const beats = await getBeatsUploadedByUser(supabase, user);

  return (
    <main className="bg-base-100">
      <h1 className="text-4xl font-bold text-center">
        {userData?.data.user_name}
      </h1>

      <div className="flex flex-col items-center min-w-96">
        <h2 className="text-2xl font-bold text-center">Beats</h2>
        <div className="flex flex-col items-center min-w-96">
          {beats.map((beat, index) => (
            <Beat key={index} beatData={beat} />
          ))}
        </div>
      </div>
    </main>
  );
}
