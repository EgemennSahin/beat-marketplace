import BeatCarousel from "@/components/beat/BeatCarousel";
import { BeatData } from "@/interfaces/BeatData";
import { callApi } from "./api/helpers";

// Prevent caching
export const revalidate = 0;

export default async function Home() {
  const beats = await callApi("search?q=").then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16 w-screen">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
    </main>
  );
}
