"use client";

import { useEffect, useRef, useState } from "react";
import { Beat } from "./Beat";
import { BeatData } from "@/interfaces/BeatData";
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
  const canNavigateRight = carouselIndex < (beats.length - 5) / 5;

  const navigateLeft = () => {
    if (canNavigateLeft) setCarouselIndex(carouselIndex - 1);
  };

  const navigateRight = () => {
    if (canNavigateRight) setCarouselIndex(carouselIndex + 1);
  };

  useEffect(() => {
    if (beatRef.current) {
      const width = beatRef.current.getBoundingClientRect().width;
      setBeatWidth(width + 4);
    }
  }, []);

  return (
    <div className="flex flex-col px-4 lg:px-16 py-8 gap-6 max-w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium text-base-content">{title}</h2>
        <div className="flex gap-4">
          <button
            className={`hidden lg:block bg-black bg-opacity-50 text-white p-3 rounded-full ${
              !canNavigateLeft && "opacity-50 cursor-not-allowed"
            }`}
            onClick={navigateLeft}
            disabled={!canNavigateLeft}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            className={`hidden lg:block bg-black bg-opacity-50 text-white p-3 rounded-full ${
              !canNavigateRight && "opacity-50 cursor-not-allowed"
            }`}
            onClick={navigateRight}
            disabled={!canNavigateRight}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto lg:overflow-x-hidden overflow-y-hidden whitespace-nowrap scrollbar-hide">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${carouselIndex * 5 * beatWidth}px)`,
          }}
        >
          {beats.map((beat, index) => (
            <div
              key={index}
              ref={index === 0 ? beatRef : null}
              className="first:pl-0 last:pr-0 p-1"
            >
              <Beat key={index} beatData={beat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
