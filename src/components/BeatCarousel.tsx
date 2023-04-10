"use client";

import { useEffect, useRef, useState } from "react";
import { Beat } from "./Beat";
import { BeatData } from "@/types/BeatData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function BeatCarousel({
  title,
  beats,
}: {
  title: string;
  beats: BeatData[];
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [beatWidth, setBeatWidth] = useState(0);
  const beatRef = useRef<HTMLDivElement>(null);

  const canNavigateLeft = carouselIndex > 0;
  const canNavigateRight = carouselIndex < beats.length - 5;

  const navigateLeft = () => {
    if (canNavigateLeft) setCarouselIndex(carouselIndex - 1);
  };

  const navigateRight = () => {
    if (canNavigateRight) setCarouselIndex(carouselIndex + 1);
  };

  useEffect(() => {
    if (beatRef.current) {
      const width = beatRef.current.getBoundingClientRect().width;
      // gap-8 = 32px
      const gap = 32;
      setBeatWidth(width + gap);
    }
  }, []);

  return (
    <div className="flex flex-col px-16 py-8 bg-base-300 gap-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="flex gap-4">
          <button
            className={`bg-black bg-opacity-50 text-white p-3 rounded-full ${
              !canNavigateLeft && "opacity-50 cursor-not-allowed"
            }`}
            onClick={navigateLeft}
            disabled={!canNavigateLeft}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            className={` bg-black bg-opacity-50 text-white p-3 rounded-full ${
              !canNavigateRight && "opacity-50 cursor-not-allowed"
            }`}
            onClick={navigateRight}
            disabled={!canNavigateRight}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-hidden relative">
          <div
            className="flex gap-8 transition-transform duration-300 ease-in"
            style={{ transform: `translateX(-${carouselIndex * beatWidth}px)` }}
          >
            {beats.map((beat, index) => (
              <div key={index} ref={index === 0 ? beatRef : null}>
                <Beat beatData={beat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
