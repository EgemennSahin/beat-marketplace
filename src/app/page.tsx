import BeatCarousel from "@/components/beat/BeatCarousel";
import { BeatData } from "@/interfaces/BeatData";
import { callApi } from "./api/helpers";
import Image from "next/image";
import PlayButton from "@/components/beat/PlayButton";
import ParallaxImage from "@/components/ParallaxImage";

// Prevent caching
export const revalidate = 0;

export default async function Home() {
  const beats = await callApi("search?q=").then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <main className="flex flex-col bg-base-100 gap-8 w-screen">
      <div className="hero min-h-[75vh] relative overflow-hidden">
        <ParallaxImage />
        <div className="grid grid-cols-2">
          <div className="flex-col z-0 text-white">
            <h1 className="mb-5 text-5xl font-bold">Beat Ustaları</h1>
            <p className="mb-5">
              Eşsiz ritimler, sınırsız yaratıcılık, hayallerinizi gerçeğe
              dönüştürün
            </p>
            <PlayButton beatData={beats[0]} />
          </div>
          <div className="flex flex-col items-center"></div>
        </div>
      </div>
      <div className="px-4 lg:px-24 space-y-8">
        <BeatCarousel title="Öne Çıkanlar" beats={beats} />
        <BeatCarousel title="Yükselenler" beats={beats} />
      </div>
    </main>
  );
}
