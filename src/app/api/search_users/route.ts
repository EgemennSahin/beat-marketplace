// GET /api/search?q=...
// Search the beats database for the given query string.
// Based on beat name, or producer name.
// Returns a JSON array of results.

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";
import { convertResponseToUserData } from "../helpers";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  // Fetch beats filtered by user_name
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("user_name", `%${q}%`)
    .eq("role", "seller");

  if (error) {
    throw error;
  }

  if (!data) {
    data = [];
  }

  console.log("Data:", data);

  const users = data.map((user) => convertResponseToUserData(user, supabase));

  return NextResponse.json(users);
}
