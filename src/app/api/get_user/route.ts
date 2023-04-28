// GET /api/get_user?id=...
// Get a single user from the database

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";

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

  return NextResponse.json(data);
}
