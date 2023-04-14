import BeatCarousel from "@/components/beat/BeatCarousel";
import { getBeats } from "@/helpers/getBeatData";

export default function Home() {
  const beats = getBeats();

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
      <BeatCarousel title="En Cok Satilanlar" beats={beats} />
    </main>
  );
}
