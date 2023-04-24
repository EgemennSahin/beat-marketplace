"use client";

import { addTransactionToTable } from "@/helpers/database";
import { useSupabase } from "@/providers/SupabaseProvider";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
export default function CheckoutButton() {
  const [user, setUser] = useState<User>();
  const supabase = useSupabase();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
        return;
      }

      if (!data) {
        return;
      }

      setUser(data.user);
    };

    getUser();
  }, []);

  return (
    <button
      onClick={() => {
        // TODO: Implement payment
        // If payment is successful:
        // clear cart
        // dispatch(clearCart());
        // add transaction to table

        if (!user) {
          return;
        }
        addTransactionToTable(supabase, user, 8);
        // redirect to library
      }}
      className="btn btn-primary"
    >
      Satın al
    </button>
  );
}
