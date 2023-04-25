"use client";

// components/PlayBeatButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { usePlayerContext } from "@/providers/BottomPlayerProvider";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

interface PlayBeatButtonProps {
  beatData: BeatData;
}

export default function PlayBeatButton({ beatData }: PlayBeatButtonProps) {
  const { setSelectedBeat } = usePlayerContext();

  const showPlayer = () => {
    setSelectedBeat(beatData);
  };

  return (
    <button
      onClick={showPlayer}
      className="flex absolute h-full w-full z-50 bottom-1/2 right-1/2 translate-y-1/2 items-center justify-center translate-x-1/2 bg-base-300 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"
    >
      <PlayCircleIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100" />
    </button>
  );
}
