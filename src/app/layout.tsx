import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { PlayerContextProvider } from "@/contexts/PlayerContext";
import BottomPlayer from "@/components/beat/BottomPlayer";

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
      <body className="relative overflow-x-hidden">
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
