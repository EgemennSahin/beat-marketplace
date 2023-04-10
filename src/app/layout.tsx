import Navbar from "@/components/Navbar";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

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
      <body className="relative">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
