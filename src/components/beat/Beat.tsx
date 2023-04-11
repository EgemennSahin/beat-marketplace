import { BeatData } from "@/types/BeatData";
import Image from "next/image";
import Link from "next/link";
import PlayBeatButton from "./PlayBeatButton";
import { getBeatUrl, getUserUrl } from "@/helpers/getRoutings";

export function Beat({ beatData }: { beatData: BeatData }) {
  const beatURL = getBeatUrl(beatData);
  const userURL = getUserUrl(beatData.userId);

  return (
    <div className="flex flex-col gap-1 p-2 rounded-md transition-colors hover:bg-base-200 group">
      <div className="h-64 w-64 relative rounded-md overflow-clip hover:cursor-pointer">
        <PlayBeatButton beatData={beatData} />
        <Image
          src={beatData.image}
          alt="Beat 1"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-base-300 to-transparent to-50%"></div>
        <span className="absolute bottom-2 right-3 text-2xl text-primary-content">
          {beatData.price} TL
        </span>
      </div>
      <Link
        className="text-primary-content text-xl hover:underline"
        href={beatURL}
      >
        {beatData.name}
      </Link>

      <div className="flex flex-col">
        <Link href={userURL} className="text-base-content hover:underline">
          {beatData.userName}
        </Link>
      </div>
    </div>
  );
}
