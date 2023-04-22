"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { formatTime } from "@/helpers/database";
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
  }, []);

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

  // Handle spacebar press
  useEffect(() => {
    const handleSpacePress = (event: KeyboardEvent) => {
      console.log("here");
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleSpacePress);

    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, [togglePlay]);

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
      <div className="p-3 bg-base-300 rounded-tr-md pointer-events-auto lg:flex hidden">
        <div className="relative w-48 h-48">
          <Image
            src={beatData.image}
            alt={beatData.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-b from-transparent to-base-300 opacity-100 rounded-md" />
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 px-2 hidden z-10 lg:flex flex-col items-start w-full">
            <Link
              className="text-primary-content text-xl hover:underline truncate w-full"
              href={getBeatUrl(beatData)}
            >
              adfakjshdfkasdfkgsdhjkasgdfaskdjhgf
            </Link>
            <Link
              href={getUserUrl(beatData.userId)}
              className="text-base-content hover:underline truncate w-full"
            >
              {beatData.userName}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-12 bg-base-300 lg:pr-12 lg:pl-2 px-8 py-4 items-center rounded-tr-md flex-grow z-10 pointer-events-auto">
        <div className="flex flex-grow gap-4">
          <button
            className="text-primary-content hidden lg:block"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <PauseCircleIcon className="w-12 h-12" />
            ) : (
              <PlayCircleIcon className="w-12 h-12" />
            )}
          </button>
          <div className="flex flex-col items-center grow gap-2 lg:gap-1">
            <div className="flex justify-between w-full items-end lg:px-2">
              <span className="text-base-content w-8">
                {formatTime(currentTime)}
              </span>

              <span className="text-base-content w-8">
                {audioRef.current ? formatTime(duration) : "0:00"}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleRangeChange}
              className="range range-xs order-first lg:order-2"
            />
            <div className="flex lg:hidden w-full justify-between items-center">
              <button
                className="text-primary-content lg:hidden"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <PauseCircleIcon className="w-12 h-12" />
                ) : (
                  <PlayCircleIcon className="w-12 h-12" />
                )}
              </button>

              <div className="flex flex-col items-start">
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
              <AddToCartButton beatData={beatData} />
            </div>

            <audio
              ref={audioRef}
              src={beatData.src}
              onLoadedMetadata={onLoadedMetadata}
            />
          </div>
        </div>

        <div className="lg:flex items-end gap-1 hidden ">
          <span className="text-primary-content text-xl mr-2">
            {beatData.price} TL
          </span>

          <AddToCartButton beatData={beatData} />
        </div>
      </div>
    </div>
  );
}
