import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function getBeatData(beatId: string) {
  // Get beat data from firebase
  return {
    name: "The Villain Beat",
    src: "https://firebasestorage.googleapis.com/v0/b/beat-marketplace.appspot.com/o/11_30_22%20130%20BPM%20Fm.mp3?alt=media&token=bc8e2ea3-df58-43c9-ac31-e2e526934881",
    price: 3500,
    image: "/beat.jpg",
    user: "Kullanici",
  };
}

export default function Page({ params }: { params: { beat: string } }) {
  const { beat } = params;

  const beatData = getBeatData(beat);

  return (
    <div className="mx-auto mt-16 flex w-fit p-12 gap-8 rounded-md bg-base-300">
      <div className="flex flex-col gap-4 items-center">
        <img className="w-48 h-48 rounded-md" src="/beat.jpg" alt="Beat 1" />
        <Link
          href="/user/id"
          className="flex gap-2 items-start hover:underline text-lg tracking-wider text-base-content"
        >
          {beatData.user}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium">{beatData.name}</h2>
        <audio controls>
          <source src={beatData.src} type="audio/mpeg" />
        </audio>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">3500 TL</h3>
          <button className="btn btn-primary btn-sm">
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}
