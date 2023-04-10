import { BeatData } from "@/types/BeatData";
import Image from "next/image";
import Link from "next/link";

export function Beat({ beatData }: { beatData: BeatData }) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`/beat/${beatData.id}`}
        className="h-64 w-64 relative rounded-md overflow-clip"
      >
        <Image src={beatData.image} alt="Beat 1" fill />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        <span className="absolute bottom-2 right-3 text-2xl text-primary-content">
          {beatData.price} TL
        </span>
      </Link>
      <Link
        className="text-primary-content hover:underline"
        href={`/beat/${beatData.id}`}
      >
        {beatData.name}
      </Link>
      <div className="flex flex-col">
        <Link
          href={`/user/${beatData.userId}`}
          className="text-base-content hover:underline"
        >
          {beatData.userName}
        </Link>
      </div>
    </div>
  );
}
