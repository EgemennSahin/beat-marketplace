import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import { CartProvider } from "@/providers/CartProvider";
import BottomPlayer from "@/components/beat/BottomPlayer";
import { Karla } from "next/font/google";
import { PlayerContextProvider } from "@/providers/BottomPlayerProvider";

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
      <body className="relative overflow-x-hidden h-screen flex flex-col">
        <PlayerContextProvider>
          <CartProvider>
            <Navbar />
            {children}
            <BottomPlayer />
          </CartProvider>
        </PlayerContextProvider>
      </body>
    </html>
  );
}
