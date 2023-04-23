import { supabase } from "@/config/supabaseClient";
import { BeatData } from "@/interfaces/BeatData";
import { Database } from "@/interfaces/supabase";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

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

// Convert the supabase response to a User object

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
    throw new Error("Beat not found");
  }

  return convertResponseToBeatData(beat);
}

export async function searchBeats(query: string): Promise<BeatData[]> {
  let { data, error } = await supabase
    .from("beats")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    throw error;
  }

  if (!data) {
    data = [];
  }

  // Convert the supabase response to a more usable format
  return data.map((data) => convertResponseToBeatData(data));
}

// Get all beats bought by a specific user
export async function getBeatsBoughtByUser(
  supabaseServerComponent: any
): Promise<BeatData[]> {
  const { data, error } = await supabaseServerComponent
    .from("transactions")
    .select(
      `
      beat_id,
      beats (
        name,
        user_id,
        user_name,
        price
      )
    `
    );

  console.log("Data: ", data);
  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // Convert the supabase response to a more usable format
  return data.map((data: any) => convertResponseToBeatData(data.beats));
}

// Get all beats uploaded by a specific user
export async function getBeatsUploadedByUser(
  supabaseServerComponent: SupabaseClient<Database, "public">,
  userId: string
): Promise<BeatData[]> {
  const { data, error } = await supabaseServerComponent
    .from("beats")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // Convert the supabase response to a more usable format
  return data.map((data: any) => convertResponseToBeatData(data));
}

// Get the user data from id
export async function getUserData(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
