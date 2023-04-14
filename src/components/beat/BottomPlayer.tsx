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

  // Reset on end
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);

      // TODO: Play next beat
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current!.removeEventListener("ended", handleEnded);
    };
  }, [audioRef.current]);

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
      <div className="gap-4 p-3 items-end bg-base-300 rounded-tr-md pointer-events-auto lg:flex hidden">
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

      <div className="flex gap-12 bg-base-300 pl-2 pr-8 pb-4 pt-2 items-end justify-between rounded-tr-md flex-grow z-10 pointer-events-auto">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <Link
              className="text-primary-content text-xl hover:underline truncate max-w-xs"
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
        <div className="flex flex-col items-center grow gap-1">
          <div className="flex justify-between w-full items-end px-2">
            <span className="text-base-content">{formatTime(currentTime)}</span>
            <button
              className="text-primary-content w-10 h-10 mb-1"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseCircleIcon className="text-white" />
              ) : (
                <PlayCircleIcon className="text-white" />
              )}
            </button>
            <span className="text-base-content">
              {audioRef.current ? formatTime(duration) : "0:00"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleRangeChange}
            className="range range-xs"
          />
          <audio
            ref={audioRef}
            src={beatData.src}
            onLoadedMetadata={onLoadedMetadata}
          />
        </div>
        <div className="lg:flex flex-col items-end gap-1 w-40 hidden">
          <span className="text-primary-content text-xl mr-2">
            {beatData.price} TL
          </span>

          <AddToCartButton beatData={beatData} />
        </div>
      </div>
    </div>
  );
}
