"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ParallaxImage() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        transform: `scale(1.2) translateY(${scrollPosition * 0.2 - 25}px)`,
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <Image
        src="/hero.jpg"
        fill
        style={{ objectFit: "cover" }}
        className="hero-overlay opacity-40"
        alt="Hero Image"
      />
    </div>
  );
}
