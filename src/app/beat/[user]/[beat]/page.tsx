import AddToCartButton from "@/components/cart/AddToCartButton";
import { getBeatData } from "@/helpers/getBeatData";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { user: string; beat: number };
}) {
  const { user, beat } = params;

  const beatData = getBeatData(beat);

  return (
    <div className="mx-auto mt-16 flex w-fit p-12 gap-8 rounded-md bg-base-300">
      <div className="flex flex-col gap-4 items-center">
        <img className="w-48 h-48 rounded-md" src="/beat.jpg" alt="Beat 1" />
        <Link
          href={`/user/${beatData.userId}`}
          className="flex gap-2 items-start hover:underline text-lg tracking-wider text-base-content"
        >
          {beatData.userName}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium">{beatData.name}</h2>
        <audio controls>
          <source src={beatData.src} type="audio/mpeg" />
        </audio>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{beatData.price} TL</h3>
          <AddToCartButton beatData={beatData} />
        </div>
      </div>
    </div>
  );
}
