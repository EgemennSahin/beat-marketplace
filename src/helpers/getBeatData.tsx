import { BeatData } from "@/types/BeatData";

// Create 10 random beats
const beats: BeatData[] = [];

for (let i = 0; i < 21; i++) {
  const beat: BeatData = {
    id: Math.random().toString(36).substring(7),

    // Random beat name
    name: Math.random().toString(36).substring(7),

    // Random beat src
    src: i % 2 == 0 ? "/beat.mp3" : "/beat2.mp3",

    // Random beat price
    price: Math.floor(Math.random() * 10000),

    // Random beat image
    image: "/beat.jpg",

    // Random beat userId
    userId: Math.random().toString(36).substring(7),

    // Random beat userName
    userName: Math.random().toString(36).substring(7),
  };

  beats.push(beat);
}

export function getBeatData(beatId: number) {
  return beats[beatId];
}

export function getBeats() {
  return beats;
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
