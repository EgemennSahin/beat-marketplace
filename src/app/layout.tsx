import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import { CartProvider } from "@/providers/CartProvider";
import BottomPlayer from "@/components/player/BottomPlayer";
import { Karla } from "next/font/google";
import { PlayerContextProvider } from "@/providers/BottomPlayerProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";

const karla = Karla({
  subsets: ["latin"],
});

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
    <html className={karla.className} lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <body className="relative overflow-x-hidden flex flex-col h-screen items-center justify-between">
        <SupabaseProvider>
          <PlayerContextProvider>
            <CartProvider>
              {/* @ts-expect-error Server Component */}
              <Navbar />
              <div className="flex-grow pt-16">{children}</div>
              <BottomPlayer />
            </CartProvider>
          </PlayerContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
