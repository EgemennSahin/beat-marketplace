import React from "react";
import CartReview from "./CartReview";
import CartItems from "./CartItems";

export const revalidate = 0;

export default function CheckoutPage() {
  return (
    <main className="flex flex-col bg-base-100 gap-8 py-8 px-4 lg:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Satın Al</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-base-200 p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Sipariş Detayları</h2>
            <CartItems />
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sepet Özeti</h2>
            <CartReview />
          </div>
        </div>
      </div>
    </main>
  );
}
