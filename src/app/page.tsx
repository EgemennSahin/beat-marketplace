import BeatCarousel from "@/components/BeatCarousel";
import { getBeats } from "@/helpers/getBeatData";
import { BeatData } from "@/types/BeatData";

export default function Home() {
  const beats = getBeats();

  console.log(beats);

  return (
    <main className="flex flex-col bg-base-100">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
    </main>
  );
}
