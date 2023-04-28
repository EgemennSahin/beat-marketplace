import { supabase } from "@/config/supabaseClient";
import { BeatData } from "@/interfaces/BeatData";
import { Database } from "@/interfaces/supabase";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

// Convert the supabase response to a BeatData object
function convertResponseToBeatData(response: any): BeatData {
  // Get the image from supabase storage
  // user_id/beat_id/image
  const image = supabase.storage
    .from("beats")
    .getPublicUrl(`${response.user_id}/${response.id}/image`).data.publicUrl;

  const beat = supabase.storage
    .from("beats")
    .getPublicUrl(`${response.user_id}/${response.id}/beat`).data.publicUrl;

  return {
    id: response.id,
    name: response.name,
    src: beat,
    price: response.price,
    image: image,
    userId: response.user_id,
    userName: response.users.user_name,
  };
}

// Insert user row into the database
export async function insertUserIntoDatabase(
  id: string,
  username: string,
  role: string
) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: id, user_name: username, role: role }])
    .select();

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data;
}

// Get a single beat from the database
export async function getBeatData(id: string): Promise<BeatData> {
  let { data: beat, error } = await supabase
    .from("beats")
    .select("*, users (user_name)")
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

async function getUsersWithMatchingUsername(query: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .ilike("user_name", `%${query}%`);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map((user) => user.id);
}

export async function searchBeats(query: string): Promise<BeatData[]> {
  // Fetch the ids of users that match the query
  const userIds = await getUsersWithMatchingUsername(query);

  let { data, error } = await supabase
    .from("beats")
    .select("*, users (user_name)")
    .or(`name.ilike.%${query}%,user_id.in.(${userIds.join(",")})`);

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
  supabaseServerComponent: SupabaseClient<Database, "public">
): Promise<BeatData[]> {
  const { data, error } = await supabaseServerComponent
    .from("transactions")
    .select(
      `
      beat_id,
      beats (
        id,
        name,
        user_id,
        users (user_name),
        price
      )
    `
    );

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // Convert the supabase response to a more usable format
  return data.map((data) => convertResponseToBeatData(data.beats));
}

export async function addTransactionToTable(
  supabase: SupabaseClient,
  beatId: number
) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData || !userData.user?.id) {
    throw new Error("User not found");
  }

  const user = userData.user;

  const { data, error } = await supabase
    .from("transactions")
    .insert([{ buyer_id: user.id, beat_id: beatId }]);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data;
}

// Get all beats uploaded by a specific user
export async function getBeatsUploadedByUser(
  supabaseServerComponent: SupabaseClient<Database, "public">,
  userId: string
): Promise<BeatData[]> {
  const { data, error } = await supabaseServerComponent
    .from("beats")
    .select("*, users (user_name)")
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
