// pages/search.tsx
import { redirect } from "next/navigation";
import { Beat } from "@/components/beat/Beat";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { BeatData } from "@/interfaces/BeatData";
import { callApi } from "@/helpers/api";

export const revalidate = 0;

export default async function LibraryPage() {
  const beats = await callApi("list_bought_beats").then(
    (res) => res.json() as Promise<BeatData[]>
  );

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
