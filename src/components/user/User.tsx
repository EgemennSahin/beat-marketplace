import { getUserUrl } from "@/helpers/routing";
import { UserData } from "@/interfaces/BeatData";
import Image from "next/image";
import Link from "next/link";

export default function User({ userData }: { userData: UserData }) {
  return (
    <Link
      href={`/user/${userData.id}`}
      className="flex flex-col gap-1 p-2 rounded-full transition-color hover:bg-base-200 group drop-shadow-lg"
    >
      <div className="h-36 w-36 lg:h-56 lg:w-56 relative rounded-full overflow-clip hover:cursor-pointer">
        <Image
          src={userData.image_url}
          alt="User Image"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-base-300 to-transparent to-50%"></div>
      </div>
      <Link
        className="text-primary-content w-36 lg:w-56 text-sm md:text-xl hover:underline truncate block text-center"
        href={getUserUrl(userData.id)}
      >
        {userData.user_name}
      </Link>
    </Link>
  );
}
