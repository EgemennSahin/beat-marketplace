// GET /api/get_beat?id=...
// Get a single beat from the database
// Returns a BeatData object

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { data, error } = await supabase
    .from("beats")
    .select("*, users (user_name)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
