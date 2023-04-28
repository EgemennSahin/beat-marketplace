import { BeatData } from "@/interfaces/BeatData";
import { SupabaseClient } from "@supabase/supabase-js";

// Convert the supabase response to a BeatData object
export function convertResponseToBeatData(response: any, supabase: SupabaseClient): BeatData {
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