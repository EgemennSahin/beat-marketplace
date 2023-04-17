import BeatCarousel from "@/components/beat/BeatCarousel";
import { getBeats, realtimeData } from "@/helpers/database";

export default async function Home() {
  const beats = await getBeats();

  const realtime = realtimeData();

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
    </main>
  );
}
