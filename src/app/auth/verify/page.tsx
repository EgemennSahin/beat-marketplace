"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const supabase = useSupabase();
  const router = useRouter();
  const [emailVerified, setEmailVerified] = useState(false);

  const checkEmailVerification = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user?.email_confirmed_at) {
      setEmailVerified(true);
      router.push("/auth/setup"); // Redirect to the main page or any other page after successful login
    }
  };

  useEffect(() => {
    const sessionUnsubscribe = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "USER_UPDATED") {
          await checkEmailVerification();
        }
      }
    );

    checkEmailVerification();

    return () => {
      sessionUnsubscribe.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-12">
      <h1 className="text-3xl font-semibold mb-4">
        {emailVerified
          ? "Email adresi doğrulandı! Yönlendiriliyorsunuz..."
          : "Lütfen email adresinizi doğrulayın."}
      </h1>
      <button
        className="btn btn-primary"
        onClick={checkEmailVerification}
        disabled={emailVerified}
      >
        {emailVerified ? "Yönlendiriliyorsunuz..." : "Doğruladım"}
      </button>
    </div>
  );
}
