import { BeatData, UserData } from "@/interfaces/BeatData";
import { SupabaseClient } from "@supabase/supabase-js";

// Convert the supabase response to a BeatData object
export function convertResponseToBeatData(
  response: any,
  supabase: SupabaseClient
): BeatData {
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
    audioSrc: beat,
    price: response.price,
    imageSrc: image,
    userId: response.user_id,
    userName: response.users.user_name,
  };
}

export function convertResponseToUserData(
  response: any,
  supabase: SupabaseClient
): UserData {
  const image = supabase.storage
    .from("users")
    .getPublicUrl(`${response.id}/profile`).data.publicUrl;

  return {
    id: response.id,
    user_name: response.user_name,
    role: response.role,
    image_url: image,
  };
}

// Call the api with the correct url depending on the environment
export async function callApi(url: string, cacheTime: number = 60) {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },

    next: { revalidate: cacheTime },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
