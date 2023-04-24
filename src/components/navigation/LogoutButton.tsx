"use client";

import { handleLogout } from "@/helpers/auth";
import { useSupabase } from "@/providers/SupabaseProvider";
import React from "react";
export function LogoutButton() {
  const supabase = useSupabase();

  return (
    <button
      onClick={() => {
        supabase.auth.signOut();
      }}
    >
      Oturumu kapat
    </button>
  );
}
