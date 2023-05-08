import { getSupabaseServerClient } from "@/helpers/supabase";
import { UserData, BeatData } from "@/interfaces/BeatData";
import Link from "next/link";
import { callApi } from "../api/helpers";
import Image from "next/image";
import { Beat } from "@/components/beat/Beat";

export const revalidate = 0;

export default async function DashboardPage() {
  // Get user data from table
  const userId = (await getSupabaseServerClient().auth.getUser()).data.user?.id;

  const userData = await callApi(`get_user?id=${userId}`).then(
    (res) => res.json() as Promise<UserData>
  );

  const beats = await callApi(`list_user_beats?id=${userId}`).then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <div className="flex flex-col items-center gap-2">
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
      <Link className="btn btn-primary w-fit" href="/dashboard/upload">
        Beat Yükle
      </Link>
      <div className="grid grid-cols-5 items-center min-w-96">
        {beats.map((beat, index) => (
          <Beat key={index} beatData={beat} />
        ))}
      </div>
    </div>
  );
}
