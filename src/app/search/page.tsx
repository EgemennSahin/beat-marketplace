// pages/search.tsx
import { BeatData } from "@/interfaces/BeatData";
import { Beat } from "@/components/beat/Beat";
import { callApi } from "@/helpers/api";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = searchParams;

  const searchResults = await callApi(`search?q=${q}`).then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <div>
      <h1>Search Results for {q}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchResults.map((beat) => (
          <Beat key={beat.id} beatData={beat} />
        ))}
      </div>
    </div>
  );
}
