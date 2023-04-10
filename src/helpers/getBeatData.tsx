import { BeatData } from "@/types/BeatData";

// Create 10 random beats
const beats: BeatData[] = [];

for (let i = 0; i < 10; i++) {
  const beat: BeatData = {
    id: i,

    // Random beat name
    name: Math.random().toString(36).substring(7),

    // Random beat src
    src: "https://firebasestorage.googleapis.com/v0/b/beat-marketplace.appspot.com/o/11_30_22%20130%20BPM%20Fm.mp3?alt=media&token=bc8e2ea3-df58-43c9-ac31-e2e526934881",

    // Random beat price
    price: Math.floor(Math.random() * 10000),

    // Random beat image
    image: "/beat.jpg",

    // Random beat userId
    userId: Math.floor(Math.random() * 100),

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
