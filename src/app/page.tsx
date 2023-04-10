import BeatCarousel from "@/components/beat/BeatCarousel";
import { getBeats } from "@/helpers/getBeatData";

export default function Home() {
  const beats = getBeats();

  return (
    <main className="flex flex-col bg-base-100">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
    </main>
  );
}
