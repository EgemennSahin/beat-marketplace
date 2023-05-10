import { getSupabaseServerClient } from "@/helpers/supabase";
import { UserData, BeatData } from "@/interfaces/BeatData";
import Link from "next/link";
import { callApi } from "../api/helpers";
import Image from "next/image";
import { Beat } from "@/components/beat/Beat";
import { PlusIcon } from "@heroicons/react/24/outline";

export const revalidate = 0;

export default async function DashboardPage() {
  // Get user data from table
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  const userId = data.session?.user.id;

  const userData = await callApi(`get_user?id=${userId}`).then(
    (res) => res.json() as Promise<UserData>
  );

  const beats = await callApi(`list_user_beats?id=${userId}`).then(
    (res) => res.json() as Promise<BeatData[]>
  );

  return (
    <div className="flex flex-col pt-12">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex items-center gap-6">
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

        <Link className="btn btn-secondary w-fit" href="/dashboard/upload">
          <PlusIcon className="h-5 w-5 mr-2" />
          Beat Yükle
        </Link>
      </div>

      <h1 className="text-2xl font-bold mt-12 mb-4">Yüklenen Beatler</h1>

      <div className="grid grid-cols-4 items-center min-w-96 gap-x-4 gap-y-8">
        {beats.map((beat, index) => (
          <Beat key={index} beatData={beat} />
        ))}
      </div>
    </div>
  );
}
