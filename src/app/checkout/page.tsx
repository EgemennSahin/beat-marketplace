import React from "react";
import CartReview from "./CartReview";
import CartItems from "./CartItems";
import { getSupabaseServerClient } from "@/helpers/supabase";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  const user = data.session?.user;

  // If user is not logged in, redirect to login page
  if (!user?.id) {
    redirect("/auth");
  }

  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold mb-6">Satın Al</h1>
        <div className="space-y-8">
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sipariş Detayları</h2>
            <CartItems />
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md flex flex-col h-min">
            <h2 className="text-2xl font-bold mb-4">Sepet Özeti</h2>
            <CartReview />
          </div>
        </div>
      </div>
    </main>
  );
}
