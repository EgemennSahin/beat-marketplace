import { callApi } from "@/app/api/helpers";
import { Beat } from "@/components/beat/Beat";
import { BeatData, UserData } from "@/interfaces/BeatData";
import Image from "next/image";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = params;

  const userData = await callApi(`get_user?id=${user}`).then(
    (res) => res.json() as Promise<UserData>
  );

  const beats = await callApi(`list_user_beats?id=${user}`).then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <main className="bg-base-100 flex-col items-center flex gap-8">
      <div className="flex gap-3">
        <div className="avatar">
          <div className="w-24 rounded-full relative overflow-clip">
            <Image
              src={userData?.image_url}
              alt="Profile Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{userData?.user_name}</h1>
          <h2>{beats.length} beat</h2>
        </div>
      </div>

      <div className="grid grid-cols-5 items-center min-w-96">
        {beats.map((beat, index) => (
          <Beat key={index} beatData={beat} />
        ))}
      </div>
    </main>
  );
}
