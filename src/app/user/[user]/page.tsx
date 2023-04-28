import { Beat } from "@/components/beat/Beat";
import { callApi } from "@/helpers/api";
import { BeatData, UserData } from "@/interfaces/BeatData";

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
    <main className="bg-base-100">
      <h1 className="text-4xl font-bold text-center">{userData?.user_name}</h1>

      <div className="flex flex-col items-center min-w-96">
        <h2 className="text-2xl font-bold text-center">Beats</h2>
        <div className="flex flex-col items-center min-w-96">
          {beats.map((beat, index) => (
            <Beat key={index} beatData={beat} />
          ))}
        </div>
      </div>
    </main>
  );
}
