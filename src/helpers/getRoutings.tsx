import { BeatData } from "@/types/BeatData";

export function getBeatUrl(beat: BeatData) {
  return `/beat/${beat.userId}/${beat.id}`;
}

export function getUserUrl(userId: string) {
  return `/user/${userId}`;
}
