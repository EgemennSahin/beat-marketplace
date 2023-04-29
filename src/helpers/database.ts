import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function addTransactionToTable(
  supabase: SupabaseClient,
  beatId: number
) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData || !userData.user?.id) {
    throw new Error("User not found");
  }

  const user = userData.user;

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
