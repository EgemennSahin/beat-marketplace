"use client";

import { addTransactionToTable } from "@/helpers/database";
import { BeatData } from "@/interfaces/BeatData";
import { useSupabase } from "@/providers/SupabaseProvider";
import { clearCart } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

export default function CheckoutButton({ beats }: { beats: BeatData[] }) {
  const router = useRouter();
  const supabase = useSupabase();
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        // TODO: Implement payment

        // If payment is successful:
        // clear cart
        dispatch(clearCart());
        // add transaction to table
        for (let beat in beats) {
          addTransactionToTable(supabase, beats[beat].id);
        }
        // redirect to library
        router.push("/library");
      }}
      className="btn btn-primary btn-block btn-sm"
    >
      Satın al
    </button>
  );
}
