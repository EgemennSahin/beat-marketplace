"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { formatTime } from "@/helpers/getBeatData";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import AddToCartButton from "../cart/AddToCartButton";
import Link from "next/link";
import { getBeatUrl, getUserUrl } from "@/helpers/getRoutings";

export default function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { selectedBeat: beatData } = usePlayerContext();
  const [beatURL, setBeatURL] = useState("");
  const [userURL, setUserURL] = useState("");

  // Reset when selected beat changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (beatData) {
      setBeatURL(getBeatUrl(beatData));
      setUserURL(getUserUrl(beatData.userId));
    }

    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
    audioRef.current.play();
  }, [beatData]);

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
      setCurrentTime(audioRef.current!.currentTime);
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

  if (!beatData) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 flex items-end w-screen">
      <div className="gap-4 p-3 items-end bg-base-300 rounded-tr-md">
        <div className="relative w-48 h-48 ">
          <Image
            src={beatData.image}
            alt={beatData.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex gap-4 bg-base-300 pl-2 pr-4 py-4 items-center rounded-tr-md flex-grow">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <Link
              className="text-primary-content text-xl hover:underline"
              href={beatURL}
            >
              {beatData.name}
            </Link>
            <Link href={userURL} className="text-base-content hover:underline">
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
            max={audioRef.current?.duration || 100}
            value={currentTime}
            onChange={handleRangeChange}
            className="range range-accent"
          />
        </div>

        <span className="text-base-content">
          {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
        </span>
        <audio ref={audioRef} src={beatData.src} />
        <AddToCartButton beatData={beatData} />
      </div>
    </div>
  );
}
