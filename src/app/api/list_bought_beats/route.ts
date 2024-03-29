// GET /api/list_bought_beats?id=...
// Get all beats bought by a specific user

import { Database } from "@/interfaces/supabase";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { convertResponseToBeatData } from "../helpers";

export const revalidate = 0;

// This function does not work currently because of supabase's lack of support for reading cookies in a get api call
// TODO: when supabase adds support for reading cookies in a get api call, use this function
export async function GET() {
  // Get the auth token from the request
  // It is in the cookie under supabase-auth-token
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  // Query into the transactions table to get all transactions for the user
  const { data: transactions, error: transactionsError } = await supabase
    .from("transactions")
    .select(
      `
      beats (
        *,
        users (user_name)
      )
    `
    );

  // If there is an error, return an error response
  if (transactionsError || !transactions) {
    return NextResponse.error();
  }

  // Convert the supabase response to beat responses
  const beats = transactions.map((transaction) =>
    convertResponseToBeatData(transaction.beats, supabase)
  );

  return NextResponse.json(beats);
}
