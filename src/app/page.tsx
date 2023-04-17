import BeatCarousel from "@/components/beat/BeatCarousel";
import { getBeats } from "@/helpers/database";

export const revalidate = 0;

export default async function Home() {
  const beats = await getBeats();

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <BeatCarousel title="Bugunun Favorileri" beats={beats} />
    </main>
  );
}
