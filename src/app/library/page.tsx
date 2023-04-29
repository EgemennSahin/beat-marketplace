// pages/search.tsx
import { Beat } from "@/components/beat/Beat";
import { convertResponseToBeatData } from "@/app/api/helpers";
import { getSupabaseServerClient } from "@/helpers/supabase";

export const revalidate = 0;

export default async function LibraryPage() {
  // const beats = await callApi("list_bought_beats", 0).then(
  //   (res) => res.json() as Promise<BeatData[]>
  // );

  const supabase = getSupabaseServerClient();

  // Query into the transactions table to get all transactions for the user
  const { data, error } = await supabase.from("transactions").select(
    `
      beats (
        *,
        users (user_name)
      )
    `
  );

  if (!data) {
    return <div>Yükleniyor...</div>;
  }

  const beats = data.map((transaction) =>
    convertResponseToBeatData(transaction.beats, supabase)
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
