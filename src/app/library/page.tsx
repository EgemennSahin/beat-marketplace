// pages/search.tsx
import { redirect } from "next/navigation";
import { BeatData } from "@/interfaces/BeatData";
import { Beat } from "@/components/beat/Beat";
import { getBeatsBoughtByUser, searchBeats } from "@/helpers/database";
import { getSupabaseServerComponent } from "@/helpers/auth";

export const revalidate = 0;

export default async function LibraryPage() {
  const supabase = await getSupabaseServerComponent();

  // Get the user id from the session
  const beats = await getBeatsBoughtByUser(supabase);

  return (
    <div>
      <h1>Satın Aldığın Beatler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {beats.map((beat) => (
          <Beat key={beat.id} beatData={beat} />
        ))}
      </div>
    </div>
  );
}
