import { BeatData } from "@/interfaces/BeatData";

export function getBeatUrl(beat: BeatData) {
  return `/beat/${beat.id}`;
}

export function getUserUrl(userId: string) {
  return `/user/${userId}`;
}
