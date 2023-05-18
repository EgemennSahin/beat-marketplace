"use client";

// components/PlayBeatButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { usePlayerContext } from "@/providers/BottomPlayerProvider";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

interface PlayButtonProps {
  beatData: BeatData;
}

export default function PlayButton({ beatData }: PlayButtonProps) {
  const { setSelectedBeat } = usePlayerContext();

  const showPlayer = () => {
    setSelectedBeat(beatData);

    // Scroll down by 90% of the viewport height on desktop
    // 50% on mobile
    const isMobile = window.innerWidth <= 768;

    const scrollAmount = isMobile
      ? window.innerHeight * 0.5
      : window.innerHeight * 0.9;

    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={showPlayer} className="btn btn-primary gap-2">
      <PlayCircleIcon className="w-6 h-6" />
      Bir sonraki hiti bul
    </button>
  );
}
