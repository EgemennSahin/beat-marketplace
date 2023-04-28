// GET /api/search?q=...
// Search the beats database for the given query string.
// Based on beat name, or producer name.
// Returns a JSON array of results.

import { supabase } from "@/config/supabaseClient";
import { NextResponse } from "next/server";
import { convertResponseToBeatData } from "../helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  // Fetch beats filtered by name
  let { data: dataByName, error: errorByName } = await supabase
    .from("beats")
    .select("*, users(user_name)")
    .ilike("name", `%${q}%`);

  // Fetch beats filtered by user_name
  let { data: dataByUserName, error: errorByUserName } = await supabase
    .from("beats")
    .select("*, users!inner(user_name)")
    .ilike("users.user_name", `%${q}%`);

  const error = errorByName || errorByUserName;

  if (error) {
    throw error;
  }

  // Merge the two results into one array
  // Handle the case where one of the results is null or only one item instead of an array
  let data: any[] = [];

  if (dataByName) {
    data = data.concat(dataByName);
  }

  if (dataByUserName) {
    data = data.concat(dataByUserName);
  }

  // Remove duplicates
  data = data.filter((beat, index, self) => {
    return (
      index ===
      self.findIndex((t) => t.id === beat.id && t.user_name === beat.user_name)
    );
  });

  if (!data) {
    data = [];
  }

  const beats = data.map((beat) => convertResponseToBeatData(beat, supabase));

  return NextResponse.json(beats);
}
