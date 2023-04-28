// AddToCartButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { CartProvider } from "@/providers/CartProvider";

import AddToCartButtonBase from "./base/AddToCartButtonBase";

export default function AddToCartButton({ beatData }: { beatData: BeatData }) {
  return (
    <CartProvider>
      <AddToCartButtonBase beatData={beatData} />
    </CartProvider>
  );
}
