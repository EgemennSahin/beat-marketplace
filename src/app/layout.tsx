import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import { CartProvider } from "@/providers/CartProvider";
import BottomPlayer from "@/components/player/BottomPlayer";
import { Karla } from "next/font/google";
import { PlayerContextProvider } from "@/providers/BottomPlayerProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/navigation/Footer";

export const metadata = {
  title: "Beat Marketplace",
  description: "A marketplace for beats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <body className="relative overflow-x-hidden flex flex-col h-screen items-center justify-between pb-40 pt-16">
        <SupabaseProvider>
          <PlayerContextProvider>
            <CartProvider>
              <Navbar />
              <div className="flex-grow pb-16">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
              <BottomPlayer />
              <Footer />
            </CartProvider>
          </PlayerContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
