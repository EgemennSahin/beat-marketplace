"use client";

import RemoveFromCartButtonBase from "@/components/cart/base/RemoveFromCartButtonBase";
import { BeatData } from "@/interfaces/BeatData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BeatInCheckout({ beatId }: { beatId: number }) {
  const [beatData, setBeatData] = useState<BeatData | null>(null);

  // Fetch the beat data from the database.
  useEffect(() => {
    const fetchData = async () => {
      return (await fetch("/api/get_beat?id=" + beatId).then((res) =>
        res.json()
      )) as BeatData;
    };

    fetchData().then((beatData) => setBeatData(beatData));

    return () => {
      setBeatData(null);
    };
  }, [beatId]);

  if (!beatData) {
    return null;
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl image-full">
      <figure className="w-full relative">
        <Image src={beatData.imageSrc} alt={beatData.name} fill />
      </figure>
      <div className="card-body relative z-10 hyphens-auto">
        <Link href={`/beat/${beatData.id}`} className="card-title">
          {beatData.name}
        </Link>
        <Link href={`/user/${beatData.userId}`}>{beatData.userName}</Link>
        <div className="card-actions justify-end">
          <p className="text-xl font-bold">{beatData.price} TL</p>
          <RemoveFromCartButtonBase beatId={beatId} />
        </div>
      </div>
    </div>
  );
}
