// components/BottomPlayer.tsx
"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { formatTime } from "@/helpers/getBeatData";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import AddToCartButton from "../cart/AddToCartButton";

export default function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { selectedBeat } = usePlayerContext();

  // Download audio once selected beat changes
  useEffect(() => {
    if (!selectedBeat) return;
    console.log(selectedBeat.src);
    fetch(selectedBeat.src)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setAudioSrc(objectURL);
      });
  }, [selectedBeat]);

  // Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Change time
  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => {
      if (!audioRef.current) return;

      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener("timeupdate", updateTime);
    return () => {
      if (!audioRef.current) return;

      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    audioRef.current.play();
  };

  if (!selectedBeat) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-3 flex items-center gap-3">
      <Image
        src={selectedBeat.image}
        alt={selectedBeat.name}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div className="flex flex-col">
        <span className="text-primary-content font-semibold">
          {selectedBeat.name}
        </span>
        <span className="text-base-content">{selectedBeat.userName}</span>
      </div>
      <button
        className="text-primary-content w-8 h-8 text-2xl"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseCircleIcon className="text-white" />
        ) : (
          <PlayCircleIcon className="text-white" />
        )}
      </button>
      <span className="text-base-content mr-2">{formatTime(currentTime)}</span>

      <div className="flex items-center w-1/3">
        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 100}
          value={currentTime}
          onChange={handleRangeChange}
          className="range range-accent"
        />
      </div>
      <span className="text-base-content">
        {audioRef.current && formatTime(audioRef.current.duration)}
      </span>
      <audio ref={audioRef} src={selectedBeat.src} />
      <AddToCartButton beatData={selectedBeat} />
    </div>
  );
}
