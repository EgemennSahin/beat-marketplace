import { Beat } from "@/components/beat/Beat";
import AddToCartButton from "@/components/cart/base/AddToCartButtonBase";
import { callApi } from "@/helpers/api";
import { BeatData } from "@/interfaces/BeatData";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { user: string; beat: number };
}) {
  // The parameters are in the url
  const { user, beat } = params;

  const beatData = await callApi(`get_beat?id=${beat}`).then(
    (res) => res.json() as Promise<BeatData>
  );

  console.log(beatData);

  if (!beatData) return <div>Beat not found</div>;

  return (
    <main className="mx-auto mt-16 flex w-fit p-12 gap-8 rounded-md bg-base-300 flex-col">
      <Beat beatData={beatData} />
      <AddToCartButton beatData={beatData} />
    </main>
  );
}
