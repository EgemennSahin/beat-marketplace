// AddToCartButton.tsx
import { BeatData } from "@/interfaces/BeatData";
import { CartProvider } from "@/providers/CartProvider";

import RemoveFromCartButtonBase from "./base/RemoveFromCartButtonBase";

export default function AddToCartButton({ beatData }: { beatData: BeatData }) {
  return (
    <CartProvider>
      <RemoveFromCartButtonBase beatId={beatData.id} />
    </CartProvider>
  );
}
