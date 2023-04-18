"use client";

// components/PlayBeatButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { usePlayerContext } from "@/providers/BottomPlayerProvider";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

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
      className="flex absolute h-full w-full z-50 bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity"
    >
      <PlayCircleIcon className="w-16 h-16 text-white  bg-accent rounded-full hover:bg-accent-focus" />
    </button>
  );
}
