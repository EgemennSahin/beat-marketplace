"use client";

import RemoveFromCartButtonBase from "@/components/cart/base/RemoveFromCartButtonBase";
import { BeatData } from "@/interfaces/BeatData";
import { updateCartItem } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BeatInCheckout({ beatData }: { beatData: BeatData }) {
  const [data, setData] = useState<BeatData | null>(beatData);
  const dispatch = useAppDispatch();

  // Fetch the beat data from the database.
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/get_beat?id=" + beatData.id).then(
        (res) => res.json() as Promise<BeatData>
      );

      setData(data);
    };

    fetchData();
  }, []);

  // Update the redux store with the new data.
  useEffect(() => {
    if (data) {
      dispatch(updateCartItem(data));
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="card w-full shadow-xl image-full">
      <figure className="w-full relative">
        <Image src={data.imageSrc} alt={data.name} fill />
      </figure>
      <div className="card-body relative z-10 hyphens-auto">
        <Link href={`/beat/${data.id}`} className="card-title">
          {data.name}
        </Link>
        <Link className="text-sm" href={`/user/${data.userId}`}>
          {data.userName}
        </Link>
        <div className="card-actions justify-end">
          <p className="text-xl font-bold">{data.price} TL</p>
          <RemoveFromCartButtonBase beatId={data.id} />
        </div>
      </div>
    </div>
  );
}
