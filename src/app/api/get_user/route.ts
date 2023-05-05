// GET /api/get_user?id=...
// Get a single user from the database

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  // Get user's profile picture from storage
  const { data: profilePicture } = supabase.storage
    .from("users")
    .getPublicUrl(`${data.id}/profile`);

  if (!profilePicture) {
    return NextResponse.error();
  }

  return NextResponse.json({
    id: data.id,
    user_name: data.user_name,
    role: data.role,
    image_url: profilePicture.publicUrl,
  });
}
