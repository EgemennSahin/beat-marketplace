// GET /api/list_user_beats?id=...
// Get a list of beats from the database that were posted by a user

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { data, error } = await supabase
    .from("beats")
    .select("*, users (user_name)")
    .eq("user_id", id);

  if (error || !data) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
