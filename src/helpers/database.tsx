import { supabase } from "@/config/supabaseClient";
import { BeatData } from "@/interfaces/BeatData";

// Convert the supabase response to a BeatData object
function convertResponseToBeatData(response: any): BeatData {
  return {
    id: response.id,
    name: response.name,
    src: "/beat.mp3",
    price: response.price,
    image: "/beat.jpg",
    userId: response.user_id,
    userName: response.user_name,
  };
}

// Get a single beat from the database
export async function getBeatData(id: string): Promise<BeatData> {
  let { data: beat, error } = await supabase
    .from("beats")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!beat) {
    beat = {
      id: "",
      name: "",
      price: 0,
      user_id: "",
      user_name: "",
    };
  }

  return convertResponseToBeatData(beat);
}

// Get all beats from the database
// This is for testing, not for production
export async function getBeats(): Promise<BeatData[]> {
  let { data: beats, error } = await supabase.from("beats").select("*");

  if (error) {
    throw error;
  }

  if (!beats) {
    beats = [];
  }

  // Convert the supabase response to a more usable format
  return beats.map((beat) => convertResponseToBeatData(beat));
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
