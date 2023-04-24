// pages/search.tsx
import { redirect } from "next/navigation";
import { Beat } from "@/components/beat/Beat";
import { getBeatsBoughtByUser, searchBeats } from "@/helpers/database";
import { getSupabaseServerClient } from "@/helpers/supabase";

export const revalidate = 0;

export default async function LibraryPage() {
  const supabase = await getSupabaseServerClient();

  // If the user is not logged in, redirect to the login page
  if ((await supabase.auth.getUser()).data.user === null) {
    redirect("/auth");
    return;
  }

  // Get the user id from the session
  const beats = await getBeatsBoughtByUser(supabase);

  return (
    <div>
      <h1>Satın Aldığın Beatler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {beats.map((beat, index) => (
          <Beat key={index} beatData={beat} />
        ))}
      </div>
    </div>
  );
}
