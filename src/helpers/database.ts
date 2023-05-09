import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

// TODO: Move this to the api once integrated with payment processor
export async function addTransactionToTable(
  supabase: SupabaseClient,
  beatId: number
) {
  const user = (await supabase.auth.getSession()).data.session?.user;

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  // Check if transaction already exists
  const { data: transactionData } = await supabase
    .from("transactions")
    .select("*")
    .eq("buyer_id", user.id)
    .eq("beat_id", beatId);

  if (transactionData && transactionData.length > 0) {
    return transactionData;
  }

  // Add transaction to table
  const { data, error } = await supabase
    .from("transactions")
    .upsert([{ buyer_id: user.id, beat_id: beatId }]);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data;
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
