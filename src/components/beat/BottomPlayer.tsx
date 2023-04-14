"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { formatTime } from "@/helpers/getBeatData";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import AddToCartButton from "../cart/AddToCartButton";
import Link from "next/link";
import { getBeatUrl, getUserUrl } from "@/helpers/getRoutings";
import { usePlayerContext } from "@/providers/BottomPlayerProvider";

export default function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { selectedBeat: beatData } = usePlayerContext();

  // Reset when selected beat changes
  useEffect(() => {
    if (!audioRef.current || !beatData) return;

    setCurrentTime(0);
    setIsPlaying(true);
  }, [beatData]);

  // Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef.current?.src]);

  // Change time
  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => {
      setCurrentTime(audioRef.current!.currentTime);
    };

    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      audioRef.current!.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef.current, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Controls to change the time of the beat
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!isPlaying) setIsPlaying(true);
  };

  // Get the duration of the beat
  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  if (!beatData) return null;

  return (
    <div className="sticky bottom-0 flex items-end w-screen pointer-events-none">
      <div className="gap-4 p-3 items-end bg-base-300 rounded-tr-md pointer-events-auto">
        <div className="relative w-48 h-48">
          <Image
            src={beatData.image}
            alt={beatData.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex gap-4 bg-base-300 pl-2 pr-4 py-4 items-center rounded-tr-md flex-grow z-10 pointer-events-auto">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <Link
              className="text-primary-content text-xl hover:underline"
              href={getBeatUrl(beatData)}
            >
              {beatData.name}
            </Link>
            <Link
              href={getUserUrl(beatData.userId)}
              className="text-base-content hover:underline"
            >
              {beatData.userName}
            </Link>
          </div>
        </div>

        <button
          className="text-primary-content w-12 h-12 text-2xl"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <PauseCircleIcon className="text-white" />
          ) : (
            <PlayCircleIcon className="text-white" />
          )}
        </button>
        <span className="text-base-content mr-2">
          {formatTime(currentTime)}
        </span>
        <div className="flex items-center w-1/3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleRangeChange}
            className="range range-accent range-xs"
          />
        </div>

        <span className="text-base-content">
          {audioRef.current ? formatTime(duration) : "0:00"}
        </span>
        <audio
          ref={audioRef}
          src={beatData.src}
          onLoadedMetadata={onLoadedMetadata}
        />
        <AddToCartButton beatData={beatData} />
      </div>
    </div>
  );
}
