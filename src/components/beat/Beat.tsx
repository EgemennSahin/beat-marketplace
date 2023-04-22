import { BeatData } from "@/interfaces/BeatData";
import Image from "next/image";
import Link from "next/link";
import PlayBeatButton from "./PlayBeatButton";
import { getBeatUrl, getUserUrl } from "@/helpers/getRoutings";

export function Beat({ beatData }: { beatData: BeatData }) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-md transition-colors hover:bg-base-200 group">
      <div className="h-36 w-36 lg:h-64 lg:w-64 relative rounded-md overflow-clip hover:cursor-pointer">
        <PlayBeatButton beatData={beatData} />
        <Image
          src={beatData.image}
          alt="Beat 1"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-base-300 to-transparent to-50%"></div>
        <span className="absolute bottom-2 right-3 text-md md:text-xl text-primary-content truncate">
          {beatData.price} TL
        </span>
      </div>
      <Link
        className="text-primary-content w-36 lg:w-64 text-sm md:text-xl hover:underline truncate block"
        href={getBeatUrl(beatData)}
      >
        {beatData.name}
      </Link>

      <div className="flex flex-col">
        <Link
          href={getUserUrl(beatData.userId)}
          className="text-base-content text-xs md:text-lg hover:underline"
        >
          {beatData.userName}
        </Link>
      </div>
    </div>
  );
}
