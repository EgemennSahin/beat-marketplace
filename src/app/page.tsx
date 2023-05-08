import BeatCarousel from "@/components/beat/BeatCarousel";
import { BeatData } from "@/interfaces/BeatData";
import { callApi } from "./api/helpers";
import Image from "next/image";
import PlayButton from "@/components/beat/PlayButton";

// Prevent caching
export const revalidate = 0;

export default async function Home() {
  const beats = await callApi("search?q=").then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16 w-screen">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "/hero.jpg",
        }}
      >
        <Image
          src="/hero.jpg"
          fill
          style={{ objectFit: "cover" }}
          className="hero-overlay opacity-40"
          alt="Hero Image"
        />
        <div className="hero-content flex-col gap-2">
          <h1 className="mb-5 text-5xl font-bold">Beat Ustaları</h1>
          <p className="mb-5">
            Eşsiz ritimler, sınırsız yaratıcılık, hayallerinizi gerçeğe
            dönüştürün
          </p>
          <PlayButton beatData={beats[0]} />
        </div>
        <div className="max-w-md"></div>
      </div>
      <BeatCarousel title="En çok dinlenilenler" beats={beats} />
    </main>
  );
}
